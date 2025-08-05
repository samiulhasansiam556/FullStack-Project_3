"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/hooks/userAuth";
import axios from "axios";

export default function BlogDetails() {
  const { user, loading } = useAuth();
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showLikes, setShowLikes] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLiking, setIsLiking] = useState(false);
  const [liked, setLiked] = useState(false);

  const api = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/api/blog/${id}`);
        setBlog(response.data.blog);
      } catch (err) {
        setError("Failed to fetch blog");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const fetchLikes = async () => {
    try {
      const response = await axios.get(`/api/like/${id}`);
      setLikes(response.data.likes);
      if (blog && blog.user) {
        const liked = response.data.likes.some(
          (like) => like.user && like.user._id === user._id
        );
        setLiked(liked);
      } else {
        setLiked(false);
      }
    } catch (err) {
      console.error("Failed to fetch likes", err);
    }
  };

  useEffect(() => {
    if (blog && blog.user) {
      fetchLikes();
    }
  }, [id, blog]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/api/comment/${id}`);
      setComments(response.data.comments);
    } catch (err) {
      console.error("Failed to fetch comments", err);
    }
  };

  const handleLike = async () => {
    setIsLiking(true);
    try {
      await axios.post(`/api/like/${id}`);
      const response = await axios.get(`/api/blog/${id}`);
      setBlog(response.data.blog);
      await fetchLikes();
    } catch (err) {
      console.error("Failed to like blog", err);
    } finally {
      setIsLiking(false);
    }
  };

  const handleComment = () => {
    setShowCommentModal(true); // Open modal on button click
  };

  const submitComment = async () => {
    if (!newComment.trim()) return alert("Comment cannot be empty!");
    try {
      await axios.post(`/api/comment/${id}`, {
        comment: newComment,
      });
      setNewComment("");
      setShowCommentModal(false);
      await fetchComments();
    } catch (err) {
      console.error("Failed to post comment", err);
      alert("Failed to post comment");
    }
  };

  const openLikesModal = async () => {
    await fetchLikes();
    setShowLikes(true);
  };

  const openCommentsModal = async () => {
    await fetchComments();
    setShowComments(true);
  };

  if (loading) return <div>Please sign in to create a blog post.</div>;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-500 text-xl">Blog not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Author Info */}
      {/* (KEEP YOUR EXISTING UI HERE - SKIPPED FOR BREVITY) */}

      {/* Author Section */}
      <div className="flex items-center mb-8 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-4 shadow">
        <img
          src={blog.user?.profileImage || "/default-profile.png"}
          alt={blog.user?.name}
          className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg mr-6"
        />
        <div>
          <p className="text-gray-500 text-xs mb-1">Blog created by</p>
          <h2 className="text-xl font-bold text-blue-700">{blog.user?.name}</h2>
          <p className="text-gray-400 text-sm">{blog.user?.email}</p>
        </div>
      </div>

      {/* Blog Content */}
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900">{blog.title}</h1>
      <div className="prose max-w-none mb-8 bg-white rounded-lg p-6 shadow">
        <p className="whitespace-pre-line text-lg text-gray-800">{blog.content}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-between items-center border-t pt-6 mt-6">
        <button
          onClick={handleLike}
          disabled={isLiking}
          className={`flex items-center space-x-2 px-5 py-2 rounded-full shadow transition ${
            isLiking
              ? "bg-blue-300"
              : liked
              ? "bg-pink-500 hover:bg-pink-600"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white font-semibold`}
        >
          <span>{liked ? "Unlike" : "Like"}</span>
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={openLikesModal}
            className="text-blue-600 hover:text-blue-800 underline font-medium"
          >
            View Likes
          </button>
          <span className="font-semibold text-gray-700">{likes?.length}</span>
        </div>

        <button
          onClick={handleComment}
          className="flex items-center space-x-2 px-5 py-2 rounded-full shadow transition bg-green-500 hover:bg-green-600 text-white font-semibold"
        >
          <span>Comment</span>
        </button>

        <button
          onClick={openCommentsModal}
          className="text-green-600 hover:text-green-800 underline font-medium"
        >
          View Comments ({comments?.length || blog.comments?.length})
        </button>
      </div>

      {/* Comment Input Modal */}
      {showCommentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Write a Comment</h2>
              <button
                onClick={() => setShowCommentModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Type your comment..."
              rows={4}
              className="w-full border rounded p-2 mb-4"
            />
            <button
              onClick={submitComment}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full"
            >
              Submit Comment
            </button>
          </div>
        </div>
      )}

      {/* Likes Modal */}
      {showLikes && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Likes</h2>
              <button
                onClick={() => setShowLikes(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>
            {likes.length === 0 ? (
              <p className="text-gray-500 text-center">No likes yet</p>
            ) : (
              <ul className="space-y-3">
                {likes.map((like) => (
                  <li key={like._id} className="flex items-center space-x-3 p-2">
                    <img
                      src={like.user?.profileImage || "/default-profile.png"}
                      alt={like.user?.name || "User"}
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                    <div>
                      <p className="font-semibold">{like.user?.name}</p>
                      <p className="text-xs text-gray-500">{like.user?.email}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Comments Modal (Already Present - Keep As Is) */}
      {showComments && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Comments</h2>
              <button
                onClick={() => setShowComments(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>
            {comments.length === 0 ? (
              <p className="text-gray-500 text-center">No comments yet</p>
            ) : (
              <ul className="space-y-4">
                {comments.map((comment) => (
                  <li key={comment._id} className="border-b pb-3 last:border-b-0">
                    <div className="flex items-center mb-2">
                      <img
                        src={comment.user?.profileImage || "/default-profile.png"}
                        alt="User"
                        className="w-8 h-8 rounded-full object-cover border mr-2"
                      />
                      <span className="font-semibold text-gray-700">
                        {comment.user?.username || "Anonymous"}
                      </span>
                      <span className="ml-2 text-xs text-gray-400">
                        {new Date(comment.createdAt).toLocaleString()}
                      </span>
                      {user && comment.user && comment.user._id === user._id && (
                        <button
                          onClick={async () => {
                            try {
                              await axios.delete(`/api/comment/${comment._id}/${blog._id}`);
                              await fetchComments();
                            } catch (err) {
                              alert("Failed to delete comment");
                            }
                          }}
                          className="ml-3 px-2 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded transition"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                    <p className="whitespace-pre-line text-gray-800">{comment.comment}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
