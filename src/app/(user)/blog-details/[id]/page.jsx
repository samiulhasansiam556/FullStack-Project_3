"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/hooks/userAuth";
import axios from "axios";

export default function BlogDetails() {
 
  const { user,loading} = useAuth();

  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showLikes, setShowLikes] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLiking, setIsLiking] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [liked, setLiked] = useState(false);

  const api = process.env.NEXT_PUBLIC_API_URL;


  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${api}/blog/${id}`);
        // console.log(response);
        // console.log(response.data);
        setBlog(response.data.blog);
      } catch (err) {
        setError("Failed to fetch blog");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  //console.log("blog", blog);

  const fetchLikes = async () => {
    try {
      const response = await axios.get(`${api}/like/${id}`);
      setLikes(response.data.likes);
      if (blog && blog.user) {
        const liked = response.data.likes.some(
    (like) => like.user && like.user._id === user._id
  );
        if (liked) {
          setLiked(true);
        } else {
          setLiked(false);
        }
         
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
      const response = await axios.get(`${api}/comment/${id}`);
      setComments(response.data.comments);
    } catch (err) {
      console.error("Failed to fetch comments", err);
    }
  };

  const handleLike = async () => {
    setIsLiking(true);
    try {
      await axios.post(`/api/like/${id}`);
      const response = await axios.get(`${api}/blog/${id}`);
      setBlog(response.data.blog);
  
      // Refresh likes after liking/unliking
      await fetchLikes();
  
    } catch (err) {
      console.error("Failed to like blog", err);
    } finally {
      setIsLiking(false);
    }
  };

  console.log(liked)

  const openLikesModal = async () => {
    await fetchLikes();
    setShowLikes(true);
  };

  const openCommentsModal = async () => {
    await fetchComments();
    setShowComments(true);
  };

   if (loading) {
    return <div>Please sign in to create a blog post.</div>;
  }

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
      {/* Author Section */}
      <div className="flex items-center mb-6">
        <img
          src={blog.user?.profileImage || "/default-profile.png"}
          alt={blog.user?.name}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <p className="text-gray-600 text-sm">Blog created by</p>
          <h2 className="text-lg font-semibold">{blog.user?.name}</h2>
        </div>
      </div>

      {/* Blog Content */}
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <div className="prose max-w-none mb-8">
        <p className="whitespace-pre-line">{blog.content}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center border-t pt-4">
        <button
          onClick={handleLike}
          disabled={isLiking}
          className={`flex items-center space-x-1 px-4 py-2 rounded-lg ${
            isLiking ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
        >
          <span>{liked ? "Unlike" : "Like"}</span>

          {isLiking && (
            <svg
              className="animate-spin h-4 w-4 ml-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
        </button>
        <div className="flex items-center space-x-2">
          <button
            onClick={openLikesModal}
            className="text-blue-500 hover:text-blue-700 underline"
          >
            View Likes
          </button>

          <span className="">{`(${likes?.length})`}</span>
        </div>

        <button
          onClick={openCommentsModal}
          className="text-blue-500 hover:text-blue-700 underline"
        >
          View Comments ({blog.comments?.length})
        </button>
      </div>

      {/* Likes Modal */}
      {showLikes && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Likes</h2>
              <button
                onClick={() => setShowLikes(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
                aria-label="Close Likes Modal"
              >
                &times;
              </button>
            </div>
            {likes.length === 0 ? (
              <p className="text-gray-500 text-center">No likes yet</p>
            ) : (
              <ul className="space-y-3">
                {likes.map((like) => (
                  <li
                    key={like._id}
                    className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded transition"
                  >
                    <img
                      src={like.user?.profileImage || "/default-profile.png"}
                      alt={like.user?.name || like.user?.email || "User"}
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                    <div>
                      <div className="font-semibold text-gray-800">
                        {like.user?.name || "Unknown User"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {like.user?.email}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
      {showComments && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
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
              <p>No comments yet</p>
            ) : (
              <ul className="space-y-4">
                {comments.map((comment) => (
                  <li
                    key={comment._id}
                    className="border-b pb-3 last:border-b-0"
                  >
                    <p className="whitespace-pre-line">{comment.comment}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
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
