import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { middleware } from '../../middleware/protectedRoute';
import Like from '@/models/likeModel';
import User from '@/models/userModel';
import Blog from '@/models/blogModel';


import DBConnection from '@/lib/Db';



export async function POST(req,{params}) {

      const {id }= await params;
      //console.log(id);

     await DBConnection();

     try{
           const decode = middleware(req);
     
           if(decode instanceof NextResponse){
                return decode;
           }
          
           if(!mongoose.Types.ObjectId.isValid(id)){
                return NextResponse.json({status:400,message:"Invalid id"});
               }

           const blog = await Blog.findById(id);
           if(!blog){
                return NextResponse.json({status:400,message:"Blog does not exist"});
           }
           const user = await User.findById(decode.id);
           if(!user){
                return NextResponse.json({status:400,message:"User does not exist"});
           }
           const like = await Like.findOne({user:decode.id,blog:id});
           if(like){
               
                await Like.deleteOne({_id:like._id});
                await Blog.updateOne({_id:id},{$pull : {likes: like._id}})
                return NextResponse.json({status:400,message:"Delete Like"});
           }
           const newLike = await Like.create({
                user:decode.id,
                blog:id
           })
           if(newLike){
                await Blog.updateOne({_id:id},{$push:{likes:newLike._id}});
           }
           return NextResponse.json({status:200,newLike,message:"Success"});
      }
          catch(err){
               return NextResponse.json({status:400,message:err.message});
          }
}
      



export async function GET(req,{params}) {
  console.log("I am like route");
  const blogId = params.id
  const decode = middleware(req);

  if (decode instanceof NextResponse) {
    return decode; // This will return the 401 Unauthorized response from middleware
  }

  try{
     await DBConnection();

     if(!mongoose.Types.ObjectId.isValid(blogId)){
          return NextResponse.json({status:400,message:"invalid"});
     }
      
     const blog = await Blog.findById(blogId)
  .populate({
    path: 'likes',
    populate: {
      path: 'user',  // Populate user inside each like
      select: 'name email profileImage'  // Optional: select specific fields
    }
  });
   
     // const blog = await Blog.findById(blogId).populate("likes").populate;
     // console.log(blog);
     // console.log(blog.likes);
     if(!blog){
          return NextResponse.json({status:400,message:"Blog does not exist"});
     }  

     return NextResponse.json({ status: 200, message: "Success", likes: blog.likes });
      

  }catch(err){

     return NextResponse.json({ status: 200, message: "Success" });


  }

}
