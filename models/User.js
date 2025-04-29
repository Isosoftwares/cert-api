const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: false,
    },
    roles: [
      {
        type: String,
        default: "Admin",
      },
    ],
    permissions: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      default: "Active",
    },
    isEmailVerified: {
      type: Boolean,
      default: true,
    },
    lastLogin: { type: Date }, // Track last login time
    activeSessions: [
      {
        ip: String,
        loginTime: Date,
        expiresAt: Date,
      },
    ],
    isDeleted: { type: Boolean, default: false },
    deletedById: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },

    refreshToken: String,
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
