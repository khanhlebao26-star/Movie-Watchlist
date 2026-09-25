import "dotenv/config";
import jwt from "jsonwebtoken";

const TOKEN_TTL_SECONDS = 7 * 24 * 60 * 60;

export const authCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  path: "/",
};

export const generateToken = (user, res) => {
  // Check JWT_SECRET exists
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing in environment variables");
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: TOKEN_TTL_SECONDS,
    },
  );

  res.cookie("jwt", token, {
    ...authCookieOptions,
    maxAge: TOKEN_TTL_SECONDS * 1000,
  });
};
