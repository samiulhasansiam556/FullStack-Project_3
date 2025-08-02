

import DBConnection from "@/lib/Db";
import Blog from "@/models/blogModel";
import User from "@/models/userModel";
import Like from "@/models/likeModel";
import Comment from "@/models/commentModel";
import Category from "@/models/categoryModel";
import { middleware } from "../middleware/protectedRoute";
import { NextResponse } from "next/server";
 


export async function POST(req) {
     
    const { title ,category, content } = await req.json();
    console.log(title,content,category);

    if(!title || !content || !category){
        return NextResponse.json({status:400,message:"All fields are required"});
    }

    await DBConnection();

    try{
        const decode = middleware(req);

        if(decode instanceof NextResponse){
            return decode;
        }
         const user = await User.findById(decode.id);
            if(!user){
                return NextResponse.json({status:400,message:"User does not exist"});
            }
            const existingCategory = await Category.findOne({ name: category });

            const categoryData = existingCategory || await Category.create({ name: category });

            console.log(categoryData);

            if (!categoryData) {
                return NextResponse.json({ status: 400, message: "Failed to create category" });
            }   
            // Create the blog post
            const categoryId = categoryData._id;        
            if (!categoryId) {
                return NextResponse.json({ status: 400, message: "Category ID is missing" });
            }

            // Create the blog post with the category

            console.log("Category ID:", categoryId);

            const blog = await Blog.create({
                title,
                content,
                user: decode.id,
                blogImage: '', // Assuming no image is uploaded
                Categories: categoryId // Add the category ID to the blog post
            });


            if (!blog) {
                return NextResponse.json({ status: 400, message: "Failed to create blog post" });
            }
            // Update the category with the new blog post ID
            await Category.updateOne(
                { _id: categoryId },
                { $push: { blogid: blog._id } }
            );


            console.log(blog);

            if(blog){
                await User.updateOne({_id:decode.id},{$push:{blogs:blog._id}})
            }
            return NextResponse.json({status:200,blog,message:"Success",blog});
    }
    catch(err){
        return NextResponse.json({status:400,message:err.message});
    }
}
export async function GET(req) {
    await DBConnection();
    try{
        const decode = middleware(req);
        if(decode instanceof NextResponse){
            return decode;
        }
        const blogs = await Blog.find()
        // console.log(blogs)
        return NextResponse.json({status:200,blogs,message:"Success",});
    }
    catch(err){
        return NextResponse.json({status:400,message:err.message});
    }
}
    

