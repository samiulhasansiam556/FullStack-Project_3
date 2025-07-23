"use client";

import NavIn from "@/components/nav/NavIn";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/hooks/userAuth";
import Link from "next/link";

export default function Page() {
  const { user, loading } = useAuth();
  const [posts, setPosts] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState(null);

  const api = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (user && user._id) {
      localStorage.setItem("user", JSON.stringify(user));

      axios
        .get(`${api}/blog/user/${user._id}`)
        .then((response) => {
          setPosts(response.data.user.blogs);
          setFetchLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching posts:", err);
          setError("Failed to fetch posts");
          setFetchLoading(false);
        });
    }
  }, [user]);

  const handleDelete = (id) => {
    axios
      .delete(`${api}/blog/${id}`)
      .then(() => {
        setPosts(posts.filter((post) => post._id !== id));
      })
      .catch((err) => {
        console.error("Error deleting post:", err);
      });
  };

  if (loading || fetchLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100">
      <NavIn />

      <main className="max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Your Blog Posts</h1>

        {posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white border border-gray-200 p-6 rounded-lg shadow hover:shadow-md transition"
              >
                <h2 className="text-xl font-semibold mb-2 text-gray-800">{post.title}</h2>
                <p className="text-gray-600 mb-4">
                  {post.content.substring(0, 100)}...
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href={`/blog-details/${post._id}`}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Read more
                  </Link>
                  <Link
                    href={`/edit-blog/${post._id}`}
                    className="text-green-600 font-medium hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="text-red-600 font-medium hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">You don&apos;t have any posts yet.</p>
        )}
      </main>

      <div className="fixed bottom-6 right-6">
        <Link href="/create-blog">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg transition">
            + Create Blog
          </button>
        </Link>
      </div>
    </div>
  );
}
