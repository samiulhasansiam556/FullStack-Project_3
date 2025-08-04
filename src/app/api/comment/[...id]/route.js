import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { middleware } from "../../../middleware/protectedRoute";
import Blog from "@/models/blogModel";
import Comment from "@/models/commentModel";

import DBConnection from "@/lib/Db";

export async function GET(req, { params }) {
  //console.log("I am comment get route");
  const { id } = await params;
  const blogId = id[0];
  const decode = middleware(req);

  if (decode instanceof NextResponse) {
    return decode; // This will return the 401 Unauthorized response from middleware
  }

  try {
    await DBConnection();

    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return NextResponse.json({ status: 400, message: "invalid" });
    }

    const blog = await Blog.findById(blogId).populate({
      path: "comments",
      populate: {
        path: "user", // Populate user inside each like
        select: "name email profileImage", // Optional: select specific fields
      },
    });

    // console.log(blog);
    // console.log(blog.likes);
    if (!blog) {
      return NextResponse.json({ status: 400, message: "Blog does not exist" });
    }

    return NextResponse.json({
      status: 200,
      message: "Success",
      comments: blog.comments,
    });
  } catch (err) {
    return NextResponse.json({ status: 200, message: "Success" });
  }
}

export async function POST(req, { params }) {
  console.log(params);
  const blogId = params.id[0];
  console.log(blogId);

  const { comment } = await req.json();
  console.log(comment);

  await DBConnection();

  try {
    const decode = middleware(req);

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

    const newComment = await Comment.create({
      user: decode._id,
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

export async function DELETE(req, { params }) {
  const commentId = params.id[0];
  const blogId = params.id[1];
  console.log(commentId, blogId);
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
