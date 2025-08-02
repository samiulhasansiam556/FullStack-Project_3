
import mongoose from 'mongoose';
import Blog from '@/models/blogModel';
import { middleware } from '@/app/api/middleware/protectedRoute';
import DBConnection from '@/lib/Db';
import { NextResponse } from 'next/server';
import Category from '@/models/categoryModel';


export async function GET(req, { params }) {
    const { id } = await params;
   // console.log("id",id)
    await DBConnection(); // Ensure the database connection is established
    try {
        const decode = middleware(req); // Middleware to check authentication
        if (decode instanceof NextResponse) {
            return decode; // If middleware returns a response, return it
        }
            //console.log(decode)
        // Find blogs by category ID
        const blogs = await Category.find({ _id: id})
            .populate('blogid', '-password') // Populate user details without password
           

        //console.log("Blogs found:", blogs); // Debugging log to check fetched blogs
        if (!blogs || blogs.length === 0) {
            return NextResponse.json({ status: 404, message: "No blogs found for this category" });
        }

        return NextResponse.json({ status: 200, blogs, message: "Success" });
    } catch (err) {
        return NextResponse.json({ status: 400, message: err.message });
    }


}

