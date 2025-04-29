const express = require('express');
const multer = require('multer');

// Define the storage configuration for naming files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  }
});

const generateFields = (req, res, next) => {
  const fields = [{ name: 'thumbnail', maxCount: 1 }];
  console.log("req.body", req.body.questions)
  if (req.body.questions) {
    const questions = JSON.parse(req.body.questions);
    questions.forEach((_, index) => {
      fields.push({ name: `questionImage_${index}`, maxCount: 1 });
    });
  }
  req.uploadFields = fields;
  next();
};

const dynamicUpload = (req, res, next) => {
  generateFields(req, res, () => {
    const upload = multer({ storage: storage }).fields(req.uploadFields);
    upload(req, res, (err) => {
      if (err) {
        console.error(err);
        return res.status(400).json({ message: err.message });
      }
      next();
    });
  });
};

module.exports = { dynamicUpload };
