import DBConnection from "@/lib/Db";
import User from "@/models/userModel";
import {middleware} from '@/app/api/middleware/protectedRoute';
import { NextResponse } from "next/server";

export async function PUT(req, res) {
  
  const decoded =  middleware(req);

  if (!decoded) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  await DBConnection();

  const { name, phone, address, profileImage } = await req.json(); // Fixed body parsing
 
  // console.log(name, phone, address, profileImage);

 //  console.log(decoded.id)

  try {
    const updatedUser = await User.findByIdAndUpdate(
      decoded.id,
      {
        name,
        phone,
        address,
        profileImage,
      },
      { new: true }
    );

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update profile" });
  }
}
