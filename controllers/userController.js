const bcrypt = require("bcrypt");
const User = require("../models/User");
const { default: mongoose } = require("mongoose");

const registerUser = async (req, res) => {
  const { email, password, userName, permissions } = req.body;
  const roles = ["Admin"];

  if (!email || !password || !userName)
    return res.status(400).json({ message: `All fields are required` });

  try {
    const dupEmail = await User.findOne({
      email: { $regex: email.trim().toLowerCase(), $options: "i" },
      isDeleted: false,
    })
      .lean()
      .exec();

    if (dupEmail)
      return res.status(409).json({ message: `Email already exists!!` });

    const hashPassword = await bcrypt.hash(password.trim(), 10);

    const clientObject = {
      email: email.trim().toLowerCase(),
      password: hashPassword,
      userName,
      roles,
      permissions,
    };

    const user = await User.create(clientObject);

    if (!user)
      return res.status(400).json({ message: `Invalid user data received` });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!!" });
  }
};

const getUserById = async (req, res) => {
  const { userId } = req.params;

  if (!userId) return res.status(400).json({ message: "User id is required" });

  try {
    const [user] = await Promise.all([
      User.findById(userId).select("-password -refreshToken").lean().exec(),
    ]);

    if (!user) return res.status(404).json({ message: "No user found" });

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!!" });
  }
};

const editUser = async (req, res) => {
  const { email, userName, roles, userId, permissions } = req.body;

  if (!email || !userName || !roles?.length || !userId)
    return res.status(400).json({ message: `All fields are required` });

  try {
    const user = await User.findById(userId).exec();

    if (!user) return res.status(404).json({ message: "No user found" });

    user.userName = userName;
    user.email = email;
    user.roles = roles;
    user.permissions = permissions;
    await user.save();

    res.status(200).json({ message: "Profile updated" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong!!", userName: userName });
  }
};

const getAllUsers = async (req, res) => {
  const page = req?.query?.page || 1;
  const perPage = req?.query?.perPage || 300;
  const skip = (page - 1) * parseInt(perPage);

  const searchTerm = req.query.searchTerm || "";
  const role = req.query.role;

  const filters = {
    $or: [
      { email: { $regex: searchTerm, $options: "i" } },
      { userName: { $regex: searchTerm, $options: "i" } },
    ],
    isDeleted: false,
  };

  role && (filters.roles = { $in: [role] });

  try {
    // if (!isPaginated) {
    //   const users = await User.find(filters).lean().exec();
    //   return res.status(200).json({ users });
    // }

    const [users, count] = await Promise.all([
      User.find(filters)
        .sort({ createdAt: -1 })
        .select("-password -refreshToken")
        .limit(parseInt(perPage))
        .skip(skip)
        .lean()
        .exec(),
      User.countDocuments(filters),
    ]);

    if (!users?.length) {
      return res.status(200).json({ message: "No users found" });
    }

    res.json({ users, count });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!!" });
  }
};

const deleteUser = async (req, res) => {
  const { deleteType, deletedBy, userId } = req.params;

  if (!userId || !deleteType || !deletedBy)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const user = await User.findById(userId).exec();
    if (!user) return res.status(404).json({ message: "No user found" });

    if (deleteType === "permanent") {
      await User.findByIdAndDelete(userId);
      return res.status(200).json({ message: "User deleted successfully" });
    }

    user.isDeleted = true;
    user.deletedById = deletedBy;
    await user.save();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!!" });
  }
};

const updateUserStatus = async (req, res) => {
  const { status, userId } = req.body;

  if (!userId || !status)
    return res.status(400).json({ message: "User id is required" });

  try {
    const user = await User.findById(userId).exec();

    if (!user) return res.status(400).json({ message: "No user found" });

    user.status = status;
    await user.save();
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const resetUserPassword = async (req, res) => {
  const { userId } = req.params;

  if (!userId) return res.status(400).json({ message: "User id is required" });

  try {
    const [user] = await Promise.all([User.findById(userId).exec()]);

    if (!user) return res.status(404).json({ message: "No user found" });

    const hashPassword = await bcrypt.hash(user.phoneNo.trim(), 10);
    user.password = hashPassword;

    await user.save();

    res
      .status(200)
      .json({ message: "Password has been reset to phone number" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!!" });
  }
};

const getLoggedInUsers = async (req, res) => {
  try {
    const now = new Date();
    const activeUsers = await User.find({
      "activeSessions.expiresAt": { $gte: now },
    }).select("email userName roles activeSessions");

    res.json({ activeUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  registerUser,
  getUserById,
  editUser,
  getAllUsers,
  deleteUser,
  updateUserStatus,
  resetUserPassword,
  getLoggedInUsers,
};
