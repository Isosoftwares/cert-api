const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Client = require("../models/Client");
const { generateTempEmail } = require("../utils/util");

const userMap = {
  user: User,
  client: Client,
};

const getClientIp = (req) => {
  return (
    req.headers["x-forwarded-for"] || req?.socket?.remoteAddress || "Unknown"
  );
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const trimmedEmail = email.trim().toLowerCase();
    let foundUser = await User.findOne({
      $or: [{ email: trimmedEmail }],
    });

    if (!foundUser) {
      return res.status(401).json({ message: "Unauthorized, No user found" });
    }

    if (foundUser.status !== "Active") {
      return res
        .status(401)
        .json({ message: "Your account has been suspended" });
    }


    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
      return res
        .status(401)
        .json({ message: "Unauthorized, Incorrect credentials" });
    }

    // Enforce re-login after 2 hours
    const now = new Date();

    foundUser.lastLogin = now;
    await foundUser.save();

    // Generate JWT tokens
    const accessToken = jwt.sign(
      { UserInfo: { username: foundUser.email, roles: foundUser.roles } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "120m" }
    );

    const refreshToken = jwt.sign(
      { username: foundUser.email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "120m",
      }
    );

    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      accessToken,
      roles: foundUser.roles,
      user_Id: foundUser._id,
      email: foundUser.email,
      userName: foundUser.name,
      permissions: foundUser.permissions,
      isActivated: foundUser.isActivated || false,
      isDocsVerified: foundUser.isDocsVerified || false,
      isProfileComplete: foundUser.isProfileComplete || false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = async (req, res) => {
  const { userId, userType } = req.params;

  function isValidObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id);
  }

  if (!userId || !isValidObjectId(userId))
    return res.status(401).json({ message: "Unauthorized" });

  try {
    let foundUser = await User.findById(userId).exec();

    if (!foundUser || foundUser?.status !== "Active") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const refreshToken = foundUser.refreshToken;

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) {
          console.log({ err, decoded });
          return res.status(403).json({ message: "Forbidden" });
        }

        const email = decoded.username;

        if (foundUser.email === email) {
          const accessToken = jwt.sign(
            {
              UserInfo: {
                username: foundUser.email,
                roles: foundUser.roles,
              },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
          );

          const roles = foundUser.roles;
          const email = foundUser.email;
          const user_Id = foundUser._id;
          const imgUrl = foundUser.imgUrl;
          const userName = foundUser.name;
          const permissions = foundUser.permissions || [];

          res.json({
            accessToken,
            roles,
            email,
            user_Id,
            imgUrl,
            userName,
            permissions,
            isActivated: foundUser.isActivated || false,
            isDocsVerified: foundUser.isDocsVerified || false,
            isProfileComplete: foundUser.isProfileComplete || false,
          });
        } else return res.status(403).json({ message: "Unauthorized" });
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = async (req, res) => {
  const cookies = req.cookies;
  const userId = req.params.userId;
  // if (!cookies?.jwt) return res.status(204).json({ message: "No content" }); // No JWT, already logged out

  const refreshToken = cookies.jwt;

  try {
    const foundUser = await User.findById(userId).exec();

    if (foundUser) {
      foundUser.refreshToken = ""; // Clear the refresh token from the database
      foundUser.activeSessions = [];
      await foundUser.save();
    }

    // Clear the cookie
    res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "None" });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const updateProfilePicture = async (req, res) => {
  const { userType, userId } = req.params;

  if (!userType || !userId)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const user = await userMap[userType].findById(userId).exec();

    if (!user) return res.status(404).json({ message: "No user found" });

    user.imgUrl = `${process.env.API_DOMAIN}/${req.file.path}` || "";

    await user.save();
    res.status(200).json({ message: "Profile picture updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!!" });
  }
};

const updateUserStatus = async (req, res) => {
  const { userType, userId, status } = req.body;

  if (!userType || !userMap[userType] || !userId || !status)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const user = await userMap[userType].findById(userId).exec();
    if (!user) return res.status(404).json({ message: "No user found" });

    user.status = status;

    await user.save();

    res.status(200).json({ message: "User updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!!" });
  }
};

const changePassword = async (req, res) => {
  const { password, userType, userId } = req.body;

  if (!userId || !userType || !userMap[userType])
    return res.status(400).json({ message: "user id is required" });

  try {
    // Does the user exist to update?
    const user = await userMap[userType].findById(userId).exec();

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    user.password = await bcrypt.hash(password, 10); // salt rounds
    await user.save();

    res.json({ message: `Your password has been updated` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const endUserSession = async (req, res) => {
  const { userId } = req.params;

  if (!userId) return res.status(400).json({ message: "User Id is required" });
  try {
    const [foundUser, userSession] = await Promise.all([
      User.findById(userId).exec(),
    ]);

    foundUser.refreshToken = "";
    userSession.active = false;
    await Promise.all([foundUser.save(), userSession.save()]);

    res.status(200).json({ message: "User session deactivated successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: error.message, message: "Something went wrong" });
  }
};

const createClientAccount = async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const dupEmail = await Client.findOne({
      email: { $regex: email.trim(), $options: "i" },
      isDeleted: false,
    })
      .lean()
      .exec();

    const dupUsername = await Client.findOne({
      name: name.trim(),
      isDeleted: false,
    })
      .lean()
      .exec();

    if (dupEmail)
      return res.status(409).json({ message: `Email already exists!!` });

    if (dupUsername)
      return res.status(409).json({ message: `Username already exists!!` });

    const hashedPassword = await bcrypt.hash(password, 10); // salt rounds
    const tempEmail = await generateTempEmail();

    const client = await Client.create({
      email: email.trim().toLowerCase(),
      name: name.trim(),
      password: hashedPassword,
      roles: ["Client"],
      systemEmail: tempEmail.email,
      emailPass: tempEmail.password,
      emailToken: tempEmail.token,
    });

    if (!client) return res.status(400).json({ message: "Invalid data" });

    res.status(200).json({ message: "Account created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  login,
  refresh,
  logout,
  updateProfilePicture,
  updateUserStatus,
  changePassword,
  endUserSession,
  createClientAccount,
};
