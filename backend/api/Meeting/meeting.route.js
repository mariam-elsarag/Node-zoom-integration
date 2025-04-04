import express from "express";
import multer from "multer";
import { createMeeting } from "./meeting.controller.js";

const router = express.Router();
const upload = multer();

router.route("/meet").post(upload.none(), createMeeting);

export default router;
