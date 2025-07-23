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

      // Fetch posts by user ID
      axios
        .get(`${api}/blog/user/${user._id}`)
        .then((response) => {
          
         // console.log("Fetched posts:", response.data);
          setPosts(response.data.user.blogs); // Assuming response contains an array of posts
          setFetchLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching posts:", err);
          setError("Failed to fetch posts");
          setFetchLoading(false);
        });
    }
  }, [user]); // Run when `user` changes

  if (loading || fetchLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <NavIn />

      <div className="flex flex-col items-center justify-center h-[90vh]">
        <h1 className="text-2xl font-bold mb-4">Your Blog Posts</h1>
        <div className="w-full max-w-2xl">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} className="border p-4 mb-2 rounded-lg shadow">
                <h2 className="text-lg font-semibold">{post.title}</h2>
                <p className="text-gray-600">
                  {post.content.substring(0, 100)}...
                </p>
                <Link href={`/blog-details/${post._id}`} className="text-blue-500">
                  Read more
                </Link>
              </div>
            ))
          ) : (
            <p>No posts found</p>
          )}
        </div>
      </div>

      <div className="absolute bottom-10 right-5 md:bottom-20 md:right-10">
         <button className="bg-blue-500 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-600 transition">
          <Link href="/create-blog">Create Blog </Link>
        </button>
      </div>
    </div>
  );
}
