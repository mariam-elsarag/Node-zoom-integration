import express from "express";
import cors from "cors";
// for security
import helmet from "helmet";
import xss from "xss-clean";
import hpp from "hpp";
import mongoSanitize from "express-mongo-sanitize";

// routes
import authRoute from "./api/Auth/auth.route.js";

import meetingRoute from "./api/Meeting/meeting.route.js";
import globalErrors from "./middleware/globalErrors.js";

const app = express();

// cors
app.use(cors());

app.use(express.json());
// For security
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(mongoSanitize());

// routes
app.use("/api/auth", authRoute);
app.use("/api/zoom", meetingRoute);

// handle wrong routes
app.all("*", (req, res, next) => {
  next(new appErrors(`Can't find ${req.originalUrl} on this server`, 400));
});
// Error handling middleware
app.use(globalErrors);
export default app;
