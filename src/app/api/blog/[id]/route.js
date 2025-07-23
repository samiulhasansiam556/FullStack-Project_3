
import mongoose from "mongoose";
import DBConnection from "@/lib/Db";
import Blog from "@/models/blogModel";
import User from "@/models/userModel";
import Like from "@/models/likeModel";
import Comment from "@/models/commentModel";
import { middleware } from "../../middleware/protectedRoute";
import { NextResponse } from "next/server";


export async function DELETE(req,{params}){

    const id = params.id;
    console.log(id);
    await DBConnection();

    try{
        const decode = middleware(req);

        if(decode instanceof NextResponse){
            return decode;
        }
        const blog = await Blog.findById(id);
        if(!blog){
            return NextResponse.json({status:400,message:"Blog does not exist"});
        }
        if(blog.user.toString() !== decode.id){
            return NextResponse.json({status:400,message:"You are not authorized to delete this blog"});
        }
        await Blog.deleteOne({_id:id});
        return NextResponse.json({status:200,message:"Blog deleted successfully"});
    }
    catch(err){
        return NextResponse.json({status:400,message:err.message});
    }


  
}


export async function GET(req,{params}){

    const {id } =await params;
    console.log(id);
    await DBConnection();

    try{
        const decode = middleware(req);

        if(decode instanceof NextResponse){
            return decode;
        }
        const blog = await Blog.findById(id).populate("user","name email profileImage");
        if(!blog){
            return NextResponse.json({status:400,message:"Blog does not exist"});
        }
        return NextResponse.json({status:200,blog,message:"Success"});
    }
    catch(err){
        return NextResponse.json({status:400,message:err.message});
    }

}