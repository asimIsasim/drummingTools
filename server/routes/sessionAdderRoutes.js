const express = require("express");
const routes = express.Router();
const SessionAdder = require("../controller/PracticeSessionController");
const upload = require("../middleware/sessionUploads");
const sessionGetter = require("../controller/getSession");

const uploadMiddleware = upload.single("file");

routes.post(
  "/add-session/:routineId",
  uploadMiddleware,
  SessionAdder.addSession
);

routes.get("/getSessions/:routineId", sessionGetter.getSesions);

module.exports = routes;
