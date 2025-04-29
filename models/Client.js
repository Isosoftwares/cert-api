const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: false,
    },
    certification: {
      type: String,
      required: false,
    },
    courseDescription: {
      type: String,
      required: false,
    },
    courseHours: {
      type: String,
      required: false,
    },
    issuedOn: {
      type: Date,
      required: false,
    },
    expiresOn: {
      type: String,
      required: false,
    },
    modules: {
      type: String,
      required: false,
    },
    blockChainId: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      default: "Active",
    },
    firstName: {
      type: String,
      required: false,
    },
    middleName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },

    phoneNo: {
      type: String,
      required: false,
    },
    isProfileComplete: {
      type: Boolean,
      default: false,
    },
    clientDocs: {
      certImage: {
        type: String,
        required: false,
      },
      certPdf: {
        type: String,
        required: false,
      },
    },
    graphData: {
      marks: {
        type: Number,
        required: false,
      },
      description: {
        type: String,
        required: false,
      },
      average: {
        type: Number,
        required: false,
      },
    },
    refreshToken: {
      type: String,
      required: false,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    lastUpdatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Client", userSchema);
