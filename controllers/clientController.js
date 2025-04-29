const Client = require("../models/Client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

/**
 * Create a new client
 * @route POST /api/clients
 */
const createClient = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      middleName,
      phoneNo,
      certification,
      courseDescription,
      courseHours,
      issuedOn,
      expiresOn,
      modules,
      blockChainId,
      status,
      lastUpdatedBy,
      marks,
      description,
      average,
    } = req.body;

    // Check required fields
    if (!firstName || !lastName || !middleName) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Create client object
    const clientObject = {
      firstName,
      lastName,
      middleName,
      certification,
      courseDescription,
      courseHours,
      issuedOn: issuedOn ? new Date(issuedOn) : undefined,
      expiresOn: expiresOn ? new Date(expiresOn) : "Does not expire",
      modules,
      blockChainId,
      status: status || "Active",
      lastUpdatedBy,
      graphData: {
        marks: marks,
        description: description,
        average: average,
      },
    };
    // Handle document uploads if present in request
    if (req.files) {
      // Certificate documents
      if (req.files.certImage || req.files.certPdf) {
        clientObject.clientDocs = {
          certImage: req.files.certImage
            ? `${process.env.API_DOMAIN}/${req.files.certImage[0].path}`
            : "",
          certPdf: req.files.certPdf
            ? `${process.env.API_DOMAIN}/${req.files.certPdf[0].path}`
            : "",
        };
      }
    }

    // Create new client
    const client = await Client.create(clientObject);

    res.status(201).json({
      success: true,
      message: "Client created successfully",
      clientId: client._id,
    });
  } catch (error) {
    console.error("Error creating client:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create client",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

const getAllClients = async (req, res) => {
  const page = parseInt(req?.query?.page) || 1;
  const perPage = parseInt(req?.query?.perPage) || 10;
  const skip = (page - 1) * perPage;

  const { userType, status } = req.query;

  const searchTerm = req.query.searchTerm || "";
  const isDeleted = req?.query?.isDeleted === "true";

  const filters = {
    isDeleted: isDeleted,
  };

  // Add search functionality
  if (searchTerm) {
    filters.$or = [
      { firstName: { $regex: searchTerm, $options: "i" } },
      { lastName: { $regex: searchTerm, $options: "i" } },
      { email: { $regex: searchTerm, $options: "i" } },
    ];
  }

  // Add status filter if provided
  if (status) {
    filters.status = status;
  }

  try {
    const [clients, count] = await Promise.all([
      Client.find(filters)
        .sort({ createdAt: -1 })
        .limit(perPage)
        .skip(skip)
        .select("-password -refreshToken -emailToken")
        .lean()
        .exec(),
      Client.countDocuments(filters),
    ]);

    const totalPages = Math.ceil(count / perPage);

    res.status(200).json({
      clients,
      count,
      pagination: {
        currentPage: page,
        totalPages,
        perPage,
        totalItems: count,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong!!" });
  }
};

const getClientById = async (req, res) => {
  const clientId = req?.params?.clientId;

  if (!clientId)
    return res.status(400).json({ message: "Client ID is required" });

  // Validate clientId
  if (!mongoose.Types.ObjectId.isValid(clientId)) {
    return res.status(400).json({ message: "Invalid client ID" });
  }

  try {
    const client = await Client.findById(clientId)
      .select("-password -refreshToken -emailToken")
      .lean()
      .exec();

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json({ client });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong!!" });
  }
};

const updateClient = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the client exists
    const existingClient = await Client.findById(id);
    if (!existingClient) {
      return res
        .status(404)
        .json({ success: false, message: "Client not found" });
    }

    // Extract data from request
    const {
      firstName,
      middleName,
      lastName,
      certification,
      courseHours,
      modules,
      blockChainId,
      courseDescription,
      issuedOn,
      expiresOn,
      lastUpdatedBy,
      status,
      marks,
      description,
      average,
    } = req.body;

    // Build update object
    const updateData = {
      firstName,
      middleName,
      lastName,
      certification,
      courseHours,
      modules,
      blockChainId,
      courseDescription,
      issuedOn,
      graphData: {
        marks: marks,
        description: description,
        average: average,
      },
      lastUpdatedBy,
      status: status || "Active",
      updatedAt: new Date(),
    };

    // Only add expiresOn if it exists
    if (expiresOn) {
      updateData.expiresOn = expiresOn;
    }

    // Handle file uploads
    if (req.files) {
      // Certificate documents
      if (req.files.certImage || req.files.certPdf) {
        existingClient.clientDocs = {
          certImage: req.files.certImage
            ? `${process.env.API_DOMAIN}/${req.files.certImage[0].path}`
            : "",
          certPdf: req.files.certPdf
            ? `${process.env.API_DOMAIN}/${req.files.certPdf[0].path}`
            : "",
        };
      }
    }
    await existingClient.save();

    // Update client in database
    const updatedClient = await Client.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: "Client updated successfully",
      client: updatedClient,
    });
  } catch (error) {
    console.error("Error updating client:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update client",
      error: error.message,
    });
  }
};

const deleteClient = async (req, res) => {
  const { deleteType, deletedBy, clientId } = req.params;

  if (!clientId || !deletedBy || !deleteType)
    return res.status(400).json({ message: "All fields are required" });

  // Validate IDs
  if (
    !mongoose.Types.ObjectId.isValid(clientId) ||
    !mongoose.Types.ObjectId.isValid(deletedBy)
  ) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const client = await Client.findById(clientId).exec();

    if (!client) return res.status(404).json({ message: "No client found" });

    if (deleteType === "permanent") {
      await Client.findByIdAndDelete(clientId).exec();
      return res.status(200).json({
        success: true,
        message: "Client permanently deleted",
      });
    }

    client.isDeleted = true;
    client.deletedById = deletedBy;

    await client.save();
    res.status(200).json({
      success: true,
      message: "Client marked as deleted",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};


const updateUserDocs = async (req, res) => {
  const { clientId } = req.body;

  if (!req.files || !clientId) {
    return res
      .status(400)
      .json({ message: "Client ID and files are required" });
  }

  try {
    // Validate clientId
    if (!mongoose.Types.ObjectId.isValid(clientId)) {
      return res.status(400).json({ message: "Invalid client ID" });
    }

    const client = await Client.findById(clientId).exec();
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    // Initialize clientDocs if it doesn't exist
    if (!client.clientDocs) {
      client.clientDocs = {};
    }

    // Handle certificate files
    if (req.files.certImage) {
      client.clientDocs.certImage = `${process.env.API_DOMAIN}/${req.files.certImage[0].path}`;
    }

    if (req.files.certPdf) {
      client.clientDocs.certPdf = `${process.env.API_DOMAIN}/${req.files.certPdf[0].path}`;
    }

    await client.save();

    res.status(200).json({
      success: true,
      message: "Documents updated successfully",
    });
  } catch (error) {
    console.error("Error updating documents:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update documents",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = {
  createClient,
  getAllClients,
  updateClient,
  deleteClient,
  getClientById,
  updateUserDocs,
};
