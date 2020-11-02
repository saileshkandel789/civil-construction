const express = require("express");
const router = express.Router();

const videoController = require("../../controller/Video");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    // cb(null, new Date().toISOString() + file.originalname);
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.post("/", videoController.addVideo);
router.post("/thumbnail" ,videoController.addThumbnail);
router.post("/uploadVideo", videoController.saveVideo);
router.get("/getVideo" , videoController.getVideo);

// router.get("/", teamController.getTeams);

// router.get("/:teamId", teamController.getTeam);

// router.delete("/:teamId", teamController.deleteTeam);

module.exports = router;
