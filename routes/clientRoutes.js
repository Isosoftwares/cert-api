const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");
const { upload } = require("../helpers/fileHelper");
const verifyJWT = require("../middleware/verifyJWT");

// Protect all routes with JWT authentication
// router.use(verifyJWT);

// Client CRUD operations
router
  .route("/")
  .get(clientController.getAllClients)
  .post(
    upload.fields([
      { name: "certImage", maxCount: 1 },
      { name: "certPdf", maxCount: 1 },
    ]),
    clientController.createClient
  );

// Get client by ID
router.route("/one/:clientId").get(clientController.getClientById);

// Edit client
router.route("/edit/:id").patch(
  upload.fields([
    { name: "certImage", maxCount: 1 },
    { name: "certPdf", maxCount: 1 },
  ]),
  clientController.updateClient
);

// Delete client
router
  .route("/delete/:deleteType/:deletedBy/:clientId")
  .delete(clientController.deleteClient);

// Upload documents
router.route("/upload/documents").post(
  upload.fields([
    { name: "certImage", maxCount: 1 },
    { name: "certPdf", maxCount: 1 },
  ]),
  clientController.updateUserDocs
);

module.exports = router;
