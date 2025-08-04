import DBConnection from "@/lib/Db";
import { middleware } from "@/app/middleware/protectedRoute";
import User from "@/models/userModel";
import Blog from "@/models/blogModel";
import { NextRequest, NextResponse } from "next/server";
import Category from "@/models/categoryModel";

export async function DELETE(req, { params }) {
  const { categoryid } = await params;
  await DBConnection();
  try {
    const decode = middleware(req);
    if (decode instanceof NextResponse) {
      return decode; // If middleware returns a response, return it
    }
    // Find the category by ID
    const category = await Category.findById(categoryid);
    if (!category) {
      return NextResponse.json({ status: 404, message: "Category not found" });
    }
    // Delete the category
    await Category.findByIdAndDelete(categoryid);
    // Optionally, you can also delete associated blogs if needed
    await Blog.deleteMany({ Categories: categoryid });

    return NextResponse.json({
      status: 200,
      message: "Category deleted successfully",
    });
  } catch (err) {
    return NextResponse.json({ status: 400, message: err.message });
  }
}
