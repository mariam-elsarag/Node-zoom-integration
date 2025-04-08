import mongoose from "mongoose";
import { emailPattern } from "../../utils/validation.js";

const isStartTimeInFuture = (value, type) => {
  if (value && type == 2) {
    const currentTime = new Date();
    const startTime = new Date(value);
    return startTime >= currentTime;
  } else if (type == 1) {
    return true;
  }
  return false;
};

const meetingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },

    start_time: {
      type: Date,
      validate: {
        validator(value) {
          return isStartTimeInFuture(value, this.type);
        },
        message: "Start time must be in the future",
      },
    },
    topic: {
      type: String,
      required: [true, "topic is required"],
      maxLength: [200, "Max length for topic is 200 characters"],
    },
    type: {
      type: Number,
      required: [true, "type is required"],
      enum: [1, 2, 3, 8, 10],
    },
    duration: {
      type: Number,
      validate: function (value) {
        if (this.type === 2) {
          if (!value) {
            return false;
          }
        }
        return true;
      },
      message: "Duration is required for scheduled meetings",
    },
    schedule_for: {
      type: String,
      match: [emailPattern, "Please enter a valid email address"],
    },
    agenda: {
      type: String,
      required: [true, "agenda is required"],
      maxLength: [2000, "Max length for agena is 2000 characters"],
    },
    zoom_url: {
      type: String,
    },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.meeting_id = ret._id;
        delete ret._id;
        delete ret.id;
        delete ret.__v;
      },
    },
  }
);
const Meeting = mongoose.model("Meet", meetingSchema);
export default Meeting;
// 1 - An instant meeting.
// 2 - A scheduled meeting.
// 3 - A recurring meeting with no fixed time.
// 8 - A recurring meeting with fixed time.
// 10 - A screen share only meeting.
