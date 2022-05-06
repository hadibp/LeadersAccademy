const multer = require("multer");

// define storage for the profileimages
const profileimagestorage = multer.diskStorage({
  // destination for file
  destination: function (req, file, callback) {
    callback(null, "./public/images/profileimages");
  },
  // add backthe extenstion
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});
// upload profile parameter
const profileupload = multer({
  storage: profileimagestorage,
  limits: {
    limits: {
      fieldSize: 1024 * 1024 * 8,
    },
  },
});

// define storage for the eventimages
const eventimagestorage = multer.diskStorage({
  // destination for file
  destination: function (req, file, callback) {
    callback(null, "./public/images/eventimages");
  },
  // add backthe extenstion
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});
// upload event parameter
const eventupload = multer({
  storage: eventimagestorage,
  limits: {
    limits: {
      fieldSize: 1024 * 1024 * 8,
    },
  },
});

// define storage for the libraryimages
const libraryimagestorage = multer.diskStorage({
  // destination for file
  destination: function (req, file, callback) {
    callback(null, "./public/images/libraryimages");
  },
  // add backthe extenstion
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});
// upload library parameter
const libraryupload = multer({
  storage: libraryimagestorage,
  limits: {
    limits: {
      fieldSize: 1024 * 1024 * 8,
    },
  },
});

module.exports = {
  profileimagestorage,
  profileupload,
  eventimagestorage,
  eventupload,
  libraryimagestorage,
  libraryupload,
};
