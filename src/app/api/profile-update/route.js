import DBConnection from "@/lib/Db";
import User from "@/models/userModel";
import { middleware } from "@/app/middleware/protectedRoute";
import { NextResponse } from "next/server";

export async function PUT(req, res) {
  const decoded = middleware(req);
  if (!decoded) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { name, username, phone, address, profileImage } = await req.json();

  // const { name,username, phone, address, profileImage } = await req.json(); // Fixed body parsing

  // Ensure the database connection is established
  await DBConnection();

  if (!address || typeof address !== "object") {
    return NextResponse.json({
      status: 400,
      message: "Address must be an object",
    });
  }

  if (!name || !username) {
    return NextResponse.json({
      status: 400,
      message: "Name And username must be required",
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
  try {
    const u_nameExists = await User.findOne({
      username,
      _id: { $ne: decoded.id },
    });
    if (u_nameExists) {
      return NextResponse.json({
        status: 400,
        message: "Username already exists",
      });
    }
    const updatedUser = await User.findByIdAndUpdate(
      decoded.id,
      {
        name,
        username,
        phone,
        address,
        profileImage,
      },
      { new: true }
    );

    return NextResponse.json({
      status: 200,
      updatedUser,
      message: "Profile updated successfully",
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update profile" });
  }
}
