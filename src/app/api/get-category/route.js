import Category from "@/models/categoryModel";
import { middleware } from "../../middleware/protectedRoute";
import { NextResponse } from "next/server";
import DBConnection from "@/lib/Db";
import Blog from "@/models/blogModel";

export async function GET(req, res) {
  await DBConnection(); // Ensure the database connection is established
  try {
    // console.log(req)
    const decode = middleware(req); // Middleware to check authentication

    if (decode instanceof NextResponse) {
      return decode; // If middleware returns a response, return it
    }

    const categories = await Category.find().populate("blogid"); // Populate blogid field
   // console.log("ccc", categories);
    if (!categories || categories.length === 0) {
      return NextResponse.json({ status: 404, message: "No categories found" });
    }

    return NextResponse.json({ status: 200, categories, message: "Success" });
  } catch (err) {
    return NextResponse.json({ status: 400, message: err.message });
  }
}
