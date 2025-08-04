import DBConnection from "@/lib/Db.js";
import User from "@/models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const { NextResponse } = require("next/server");

export async function POST(req) {
  await DBConnection();
  // console.log(req.url);
  const { searchParams } = new URL(req.url);
  // console.log(searchParams)
  try {
    if (searchParams.get("signup")) {
      const { name, username, email, password } = await req.json();
      //console.log(name,username,password,email);
      if (!name || !username || !email || !password) {
        return NextResponse.json({
          status: 400,
          message: "All fields are required",
        });
      }
      if (username !== username.toLowerCase()) {
        return NextResponse.json({
          status: 400,
          message: "Username must be lowercase",
        });
      }
      if (username.includes(" ")) {
        return NextResponse.json({
          status: 400,
          message: "Username must not contain spaces",
        });
      }

      const user = await User.findOne({ email });
      const userByUsername = await User.findOne({ username });

      if (userByUsername) {
        return NextResponse.json({
          status: 400,
          message: "Username already exists",
        });
      }

      if (user) {
        return NextResponse.json({
          status: 400,
          message: "User already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const userCreate = await User.create({
        name,
        username,
        email,
        password: hashedPassword,
      });

      return NextResponse.json({ status: 200, userCreate, message: "Success" });
    }

    if (searchParams.get("login")) {
      const { email, password } = await req.json();
      if (!email || !password) {
        return NextResponse.json({
          status: 400,
          message: "All fields are required",
        });
      }
      const user = await User.findOne({ email });

      if (!user) {
        return NextResponse.json({
          status: 400,
          message: "User does not exist",
        });
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return NextResponse.json({
          status: 400,
          message: "Invalid credentials",
        });
      }

      const token = jwt.sign(
        { id: user._id },
        process.env.NEXT_PUBLIC_JWT_SECRET,
        { expiresIn: "1d" }
      );

      return NextResponse.json({
        status: 200,
        token,
        user,
        message: "Success",
      });
    }

    return NextResponse.json({ status: 400, message: "Invalid api request" });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ status: 500, message: "Internal server error" });
  }
}
