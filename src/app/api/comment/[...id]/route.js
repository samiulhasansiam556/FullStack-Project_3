import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { middleware } from "@/app/middleware/protectedRoute";
import Blog from "@/models/blogModel";
import Comment from "@/models/commentModel";
import DBConnection from "@/lib/Db";



export async function POST(req, { params }) {
  
  const {id} =  await params;
 // console.log(id);
  
  const blogId = id[0];

  const { comment } = await req.json();
  //console.log(comment);

  await DBConnection();

  try {
    const decode = middleware(req);
    //console.log(decode)

    if (decode instanceof NextResponse) {
      return decode;
    }

    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return NextResponse.json({ status: 400, message: "blogid is invalid" });
    }
    if (!comment) {
      return NextResponse.json({
        status: 400,
        message: "All field are required",
      });
    }

  //  console.log("decode",decode.id);

    const newComment = await Comment.create({
      user: decode.id,
      blog: blogId,
      comment,
    });

    if (newComment) {
      await Blog.updateOne(
        { _id: blogId },
        { $push: { comments: newComment._id } }
      );
    }
    return NextResponse.json({
      status: 400,
      message: "comment is created succesfully",
      comment: newComment,
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ status: 500, message: "Internal server error" });
  }
}


export async function GET(req, { params }) {
  
  const { id } = await params;
  //console.log("id", id);
  const blogId = id[0];

  if (!blogId) {
    return NextResponse.json({ status: 400, message: "Blog ID is required" });
  }

  const decode = middleware(req);

  if (decode instanceof NextResponse) {
    return decode; // This will return the 401 Unauthorized response from middleware
  }

  try {
    await DBConnection();

    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return NextResponse.json({ status: 400, message: "invalid" });
    }

       const comments = await Comment.find({ blog: blogId })
      .populate("user", "username profileImage") // Populate user field with username and profileImage
      .sort({ createdAt: -1 }); // Sort comments by creation date in descending order

       
     if (!comments || comments.length === 0) {
      return NextResponse.json({ status: 400, message: "Blog does not exist" });
    }

    return NextResponse.json({
      status: 200,
      message: "Success",
      comments: comments,
    });
  } catch (err) {
    return NextResponse.json({ status: 200, message: "Success" });
  }
}



export async function DELETE(req, { params }) {
   
  const {id} = await params;
  const commentId = id[0];
  const blogId = id[1];

  //console.log("commentId", commentId);
  //console.log("blogId", blogId);

  if (!commentId || !blogId) {
    return NextResponse.json({
      status: 400,
      message: "Comment ID and Blog ID are required",
    });
  }
  // Ensure the database connection is established
  // console.log("commentId", commentId);
  // console.log("blogId", blogId);

  await DBConnection();

  try {
    const decode = middleware(req);

    if (decode instanceof NextResponse) {
      return decode;
    }

    if (
      !mongoose.Types.ObjectId.isValid(commentId) ||
      !mongoose.Types.ObjectId.isValid(blogId)
    ) {
      return NextResponse.json({ status: 400, message: "id is invalid" });
    }
    const comment = await Comment.findById(commentId);
    //  console.log("comment", comment);
    // console.log(decode.id)

     if( comment.user.toString() !== decode.id.toString()) {
      return NextResponse.json({
        status: 403,
        message: "You are not authorized to delete this comment",
      });
    }   
    if (!comment) {
      return NextResponse.json({
        status: 404,
        message: "Comment not found",
      });

     }

    // Delete the comment and remove it from the blog's comments array

    const deleteComment = await Comment.findByIdAndDelete(commentId);

    if (deleteComment) {
      await Blog.updateOne(
        { _id: blogId },
        { $pull: { comments: deleteComment._id } }
      );
    }

    return NextResponse.json({
      status: 200,
      message: "Comment delete succesfully",
    });
  } catch (err) {
    console.log(err.message);
    return NextResponse.json({ status: 500, message: err.message });
  }
}

export async function PUT(req, { params }) {
  const commentId = params.id[0];
  const { comment } = await req.json();
  console.log(comment);

  await DBConnection();

  try {
    const decode = middleware(req);

    if (decode instanceof NextResponse) {
      return decode;
    }

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return NextResponse.json({ status: 400, message: "invalid id" });
    }

    if (!comment) {
      return NextResponse.json({ status: 400, message: "comment is required" });
    }
    await Comment.findByIdAndUpdate(commentId, { comment }, { new: true });

    return NextResponse.json({
      status: 200,
      message: "Comment update succesfully",
    });
  } catch (err) {
    console.log(err.message);
    return NextResponse.json({ status: 500, message: err.message });
  }
}
