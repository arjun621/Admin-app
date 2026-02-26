const multer = require("multer");
const path = require("path");

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

// Multer upload with 10 MB limit
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // <-- 10 MB
  fileFilter: function (req, file, cb) {
    const allowed = /jpg|jpeg|png/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);

    if (ext && mime) {
      cb(null, true);
    } else {
      cb(new Error("Only images allowed (jpg, jpeg, png)"));
    }
  },
});

module.exports = upload;