const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const router = express.Router();
router.use(multer().any());
// user controllers
const fileStatusCon = require("../controllers/fileStatus.js");
router.get("/", fileStatusCon.getFileStatus);
router.post("/addEFile", fileStatusCon.addEFile);
router.patch("/editFileStatus/:efileId", fileStatusCon.editFileStatus);
router.patch("/uploadNewFile/:efileId", fileStatusCon.uploadNewFile);
router.patch("/markAsDone/:efileId", fileStatusCon.markAsDone);
module.exports = router;
