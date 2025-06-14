const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const loginLimiter = require("../middleware/loginLimiter");
const { upload } = require("../helpers/fileHelper");

router
  .post("/login", loginLimiter, authController.login)
  .get("/refresh/:userId", authController.refresh)
  .post("/logout/:userId", authController.logout)
  .post("/create-client", authController.createClientAccount)
  .patch(
    "/update-profile/:userType/:userId",
    upload.single("file"),
    authController.updateProfilePicture
  )
  .patch("/update-status", authController.updateUserStatus)
  .patch("/change-password", authController.changePassword)
  .patch("/end-usere-session/:userId", authController.endUserSession);

module.exports = router;
