import mongoose from "mongoose";
import bcrypt from "bcrypt";
import {
  emailPattern,
  namePattern,
  passwordPattern,
} from "../../utils/validation.js";

const userSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: [true, "Full name is required"],
      maxlength: [100, "Full name can't be more than 100 characters long"],
      match: [
        namePattern,
        "Full name must be at least 2 characters long and contain only letters.",
      ],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [emailPattern, "Please enter a valid email"],
    },
    avatar: String,
    token: { type: String },
    zoom_access_token: { type: String },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    googleId: { type: String },
    password: {
      type: String,
      required: [
        function () {
          return !this.googleId;
        },
        "Password is required",
      ],
      match: [
        passwordPattern,
        "Weak password. Password must be at least 8 characters long and include lowercase letters, uppercase letters, and a special character.",
      ],
    },
    password_change_at: {
      type: Date,
    },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.user_id = ret._id;
        delete ret._id;
        delete ret.id;
        delete ret.__password;
      },
    },
  }
);
userSchema.pre("save", function (next) {
  if (this.email) {
    this.email = this.email.toLowerCase();
  }
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword,
  password
) {
  return await bcrypt.compare(candidatePassword, password);
};

userSchema.methods.checkChangePaswordAfterJwt = async function (jwtTimestamp) {
  if (!this.password_change_at) {
    return false;
  }
  const passwordChangedTime = Math.floor(
    this.password_changed_at.getTime() / 1000
  );
  return passwordChangedTime > jwtTimestamp;
};
const User = mongoose.model("User", userSchema);

export default User;
