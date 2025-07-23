

import DBConnection from "@/lib/Db";
import Blog from "@/models/blogModel";
import User from "@/models/userModel";
import Like from "@/models/likeModel";
import Comment from "@/models/commentModel";
import { middleware } from "../middleware/protectedRoute";
import { NextResponse } from "next/server";
 


export async function POST(req) {
     
    const { title , content } = await req.json();
    console.log(title,content);

    if(!title || !content){
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
            const blog = await Blog.create({
                title,
                content,
                user:decode.id
            })

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
        console.log(blogs)
        return NextResponse.json({status:200,blogs,message:"Success",});
    }
    catch(err){
        return NextResponse.json({status:400,message:err.message});
    }
}
    

