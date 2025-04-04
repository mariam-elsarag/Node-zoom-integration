import express from "express";
import multer from "multer";

// config
import {
  googleCallback,
  googleAuthorization,
  login,
  register,
} from "./auth.controller.js";

const router = express.Router();
const upload = multer();

router.get("/google", googleAuthorization);

router.get("/google/callback", googleCallback);
router.route("/login").post(upload.none(), login);
router.route("/register").post(upload.none(), register);
export default router;
