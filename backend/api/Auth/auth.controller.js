import User from "../Account/user.model.js";

// configuration
import passport from "./../../Config/passport.js";
// utils
import appErrors from "../../utils/appErrors.js";
import generateToken from "../../utils/generateToken.js";
import asyncWrapper from "./../../utils/asyncWrapper.js";
import serializeBody from "./../../utils/serializeBody.js";
import {
  emailPattern,
  namePattern,
  passwordPattern,
} from "../../utils/validation.js";

export const googleAuthorization = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const googleCallback = (req, res, next) => {
  passport.authenticate("google", async (err, user) => {
    if (err || !user) {
      return res.redirect(process.env.FRONT_SERVER_URL.trim() + "/login");
    }
    try {
      res.cookie("token", user.token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
      });
      res.cookie("full_name", user.full_name, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
      });
      res.cookie("avatar", user.avatar, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
      });
      res.redirect(`${process.env.FRONT_SERVER_URL}/home`);
      // res.redirect(
      //   `${process.env.FRONT_SERVER_URL}/home/?token=${user?.token}`
      // );
    } catch (error) {
      return res.redirect(`${process.env.FRONT_SERVER_URL}/login`);
    }
  })(req, res, next);
};

// login
export const login = asyncWrapper(async (req, res, next) => {
  const requiredFields = ["email", "password"];
  const filterData = serializeBody(req.body, next, requiredFields);
  if (!filterData) return;
  // validate email

  if (!emailPattern.test(filterData.email)) {
    return next(new appErrors("Invalid email", 400));
  }
  // get user
  const user = await User.findOne({ email: filterData.email });
  if (!user) {
    return next(new appErrors("User not found", 404));
  }
  //check theres a password
  if (!user.password) {
    return next(new appErrors("Wrong credentials", 401));
  }
  // check if password is correct
  if (
    user &&
    !(await user.comparePassword(filterData.password, user.password))
  ) {
    return next(new appErrors("Wrong credentials", 401));
  }
  // generate token
  const newToken = await generateToken(user);
  res.cookie("token", newToken, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
  });
  res.cookie("full_name", user.full_name, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
  });
  res.cookie("avatar", user.avatar, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    token: newToken,
    full_name: user.full_name,
    avatar: user.avatar,
    role: user.role,
    userId: user._id,
  });
});

// register user
export const register = asyncWrapper(async (req, res, next) => {
  const requiredFields = ["email", "password", "full_name"];
  const filterData = serializeBody(req.body, next, requiredFields);
  if (!filterData) return;
  //validation fields
  if (!emailPattern.test(filterData.email)) {
    return next(new appErrors("Please enter a valid email", 400));
  }

  if (!passwordPattern.test(filterData.password)) {
    return next(
      new appErrors(
        "Weak password. Password must be at least 8 characters long and include lowercase letters, uppercase letters, and a special character.",
        400
      )
    );
  }
  if (!namePattern.test(filterData.full_name)) {
    return next(
      new appErrors(
        "Full name must be at least 2 characters long and contain only letters.",
        400
      )
    );
  }
  // check if user already exists
  const user = await User.findOne({ email: filterData.email });
  if (user) {
    return next(new appErrors("Email already exists", 409));
  }
  // create new user
  const newUser = await User.create({
    email: filterData.email,
    password: filterData.password,
    full_name: filterData.full_name,
    avatar: `https://avatar.iran.liara.run/username?username=${filterData?.full_name}&background=1c1f2e&color=c5d0e6&length=1`,
  });

  res.status(201).json({
    email: filterData.email,
    full_name: filterData.full_name,
    avatar: `https://avatar.iran.liara.run/username?username=${filterData?.full_name}&background=1c1f2e&color=c5d0e6&length=1`,
    userId: newUser._id,
  });
});
