
import DBConnection from "@/lib/Db";
import { middleware } from "@/app/api/middleware/protectedRoute";
import User from "@/models/userModel";
import Blog from "@/models/blogModel";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest, { params }) {
    const { id } = await params;
   // console.log("id", id);
    await DBConnection();
    try{
        const decoded = middleware(req);
        if(decoded instanceof NextResponse){
            return decoded;
        }
        const blog = await Blog.findById(id);
        return NextResponse.json({status:200,blog});
    }catch(err){
        console.log(err);
        return NextResponse.json({status:500,message:"Internal server error"});
    }
}

export async function PUT(req: NextRequest, { params }) {
    const { id } = await params;
    await DBConnection();
    try {
        const decoded = middleware(req);
        if (decoded instanceof NextResponse) {
            return decoded;
        }
        const { title, content } = await req.json();
        if (!title || !content) {
            return NextResponse.json({ status: 400, message: "Title and content are required" });
        }
        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { title, content },
            { new: true }
        );
        if (!updatedBlog) {
            return NextResponse.json({ status: 404, message: "Blog not found" });
        }
        return NextResponse.json({ status: 200, blog: updatedBlog, message: "Blog updated successfully" });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ status: 500, message: "Internal server error" });
    }
}



