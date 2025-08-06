import Category from "@/models/categoryModel";
import User from "@/models/userModel";
import { middleware } from "../../../middleware/protectedRoute";
import { NextResponse } from "next/server";
import DBConnection from "@/lib/Db";

export async function GET(req,{ params }) {
  const { id } = await params;
  console.log("idddd",id)
  if (!id) {
    return NextResponse.json({
      status: 400,
      message: "Category ID is required",
    });
  }

  await DBConnection(); // Ensure the database connection is established
  try {
    const decode = middleware(req); // Middleware to check authentication
    
    if (decode instanceof NextResponse) {
        return decode; // If middleware returns a response, return it
    }


    const user = await User.findOne({username: id});

    if (!user) {
      return NextResponse.json({
        status: 404,
        message: "User not found",
      });
    }

    const userid = user._id;
    //console.log("User ID:", userid);

    const categories = await Category.find({ userid: userid }).populate(
      "blogid"
    ); // Populate blogid field and check userid
    //console.log("ccc", categories);
    if (!categories || categories.length === 0) {
      return NextResponse.json({ status: 404, message: "No categories found" });
    }

    return NextResponse.json({ status: 200, categories, message: "Success" });
  } catch (err) {
    return NextResponse.json({ status: 400, message: err.message });
  }
}
