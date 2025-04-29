const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyJWT = require("../middleware/verifyJWT");
// router.use(verifyJWT);

router
  .post("/", userController.registerUser)
  .get("/", userController.getAllUsers)
  .get("/one/:userId", userController.getUserById)
  .patch("/reset-password/:userId", userController.resetUserPassword)
  .patch("/edit", userController.editUser)
  .patch("/update/status", userController.updateUserStatus)
  .delete("/delete/:deleteType/:deletedBy/:userId", userController.deleteUser)

module.exports = router;
