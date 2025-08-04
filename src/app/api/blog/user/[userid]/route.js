import DBConnection from "@/lib/Db";
import { middleware } from "@/app/middleware/protectedRoute";
import User from "@/models/userModel";
import Blog from "@/models/blogModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { userid } = await params; // Extracting userId from the request parameters
  //console.log("User ID:", userid); // Logging the userId for debugging

  await DBConnection(); // Ensure the database connection is established

  try {
    const decoded = middleware(req); // Middleware to check authentication

    if (decoded instanceof NextResponse) {
      return decoded; // If middleware returns a response, return it
    }

    const user = await User.findById(userid).select("-password").populate({
      path: "blogs",
      model: "Blog", // Explicitly declare model
    });
    // console.log("zdfguse",user.blogs);
    if (!user) {
      return NextResponse.json({ status: 400, message: "User does not exist" });
    }

    return NextResponse.json({ status: 200, user, message: "Success" });
  } catch (err) {
    return NextResponse.json({ status: 400, message: err.message });
  }
}
