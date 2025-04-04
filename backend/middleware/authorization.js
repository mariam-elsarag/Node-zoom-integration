import jwt from "jsonwebtoken";

// module

import User from "../api/Account/user.model.js";

// utils
import appErrors from "../utils/appErrors.js";
import asyncWrapper from "../utils/asyncWrapper.js";

export const extractAuthorization = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

const verifyToken = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!decoded) {
    throw new appErrors("Unauthorized: Access is denied", 401);
  }

  const user = await User.findById(decoded.userId);
  if (!user) {
    throw new appErrors("User no longer exists", 404);
  }

  if (await user.checkChangePaswordAfterJwt(decoded.iat)) {
    throw new appErrors("User recently changed password", 401);
  }

  return user;
};

export const protect = (requireAuthentication = true) => {
  return asyncWrapper(async (req, res, next) => {
    const token = await extractAuthorization(req);

    if (requireAuthentication && !token) {
      return next(new appErrors("Unauthorized: Access is denied", 401));
    }

    if (token) {
      try {
        const user = await verifyToken(token);
        req.user = user;
        return next();
      } catch (err) {
        return next(err);
      }
    }

    next();
  });
};

export const authorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new appErrors(
          "Access denied: You do not have permission to perform this action",
          403
        )
      );
    }
    next();
  };
};
