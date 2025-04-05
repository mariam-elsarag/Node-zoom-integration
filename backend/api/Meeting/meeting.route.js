import express from "express";
import multer from "multer";
import { createMeeting, meetingList } from "./meeting.controller.js";
import { authorized, protect } from "../../middleware/authorization.js";

const router = express.Router();
const upload = multer();

router.use(protect(), authorized("user"));
router.route("/zoom").post(upload.none(), createMeeting);
router.route("/").get(meetingList);

export default router;
