import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import cookie from "cookie";

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

export const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "1d" });
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

export function middleware(req) {
  const cookies = cookie.parse(req.headers.get("cookie") || "");
  const token = cookies.token;
 // console.log(token)

  if (!token) {
    return NextResponse.redirect(new URL("/SignIn", req.url));
  }

  try {
    return verifyToken(token); // Token is valid, return the decoded payload
  } catch (error) {
    console.error("Token verification failed:", error);
    return NextResponse.json(
      { status: 401, message: "Invalid or expired token" }
    );
  }
}
