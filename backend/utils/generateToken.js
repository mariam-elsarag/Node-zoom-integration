import jwt from "jsonwebtoken";
const generateToken = async (user) => {
  try {
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRE_IN,
      }
    );

    return token;
  } catch (error) {
    throw new Error("Failed to generate JWT token");
  }
};
export default generateToken;
