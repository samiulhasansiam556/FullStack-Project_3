"use client";

import NavIn from "@/components/nav/NavIn";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Page() {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [error, setError] = useState(null);

  const api = process.env.NEXT_PUBLIC_API_URL;

  // Fetch categories on load
  useEffect(() => {
    axios
      .get(`${api}/get-category`)
      .then((res) => {
        console.log(res.data.categories); // ✅ CORRECT
        if (!res.data.categories || res.data.categories.length === 0) {
          setError("No categories found");
        } else {
          setError(null);
        }
        setCategories(res.data.categories); // ✅ CORRECT

        if (res.data.categories.length > 0) {
          setSelectedCategoryId(res.data.categories[0]._id);
        }

        setLoadingCategories(false);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setError("Failed to fetch categories");
        setLoadingCategories(false);
      });
  }, []);

  // Fetch blogs when category changes
  useEffect(() => {
    if (!selectedCategoryId) {
      setPosts([]);
      setLoadingPosts(false);
      return;
    }

    setLoadingPosts(true);
    axios
      .get(`${api}/get-blog-by-categories/${selectedCategoryId}`)
      .then((res) => {
        setPosts(res.data.blogs[0].blogid || []);
        console.log(posts);
        setLoadingPosts(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setError("Failed to fetch posts");
        setLoadingPosts(false);
      });
  }, [selectedCategoryId]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

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

  const handleCategoryDelete = (cat) => {
    axios
      .delete(`${api}/delete-category/${cat._id}`)
      .then(() => {
        setCategories(categories.filter((c) => c._id !== cat._id));
        if (selectedCategoryId === cat._id) {
          setSelectedCategoryId(
            categories.length > 1
              ? categories.find((c) => c._id !== cat._id)?._id || null
              : null
          );
        }
      })
      .catch((err) => {
        console.error("Error deleting category:", err);
      });
  };

  // Loading State
  if (loadingCategories || loadingPosts) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <NavIn />
      <div className="max-w-7xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <aside className="md:col-span-1 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          {categories.length > 0 ? (
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li className="flex items-center justify-between" key={cat._id}>
                  <button
                    onClick={() => handleCategoryClick(cat._id)}
                    className={`w-full text-left px-3 py-2 rounded ${
                      selectedCategoryId === cat._id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {cat.name}
                  </button>
                  <button onClick={() => handleCategoryDelete(cat)}
                    className="ml-2 text-white hover:underline text-sm bg-red-600 rounded px-2 py-1"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No categories available.</p>
          )}
        </aside>

        {/* Blog Posts Section */}
        <main className="md:col-span-3 space-y-6">
          <h1 className="text-2xl font-bold mb-4 text-center md:text-left">
            Blogs
          </h1>

          {selectedCategoryId ? (
            loadingPosts ? (
              <p className="text-center text-gray-500">Loading posts...</p>
            ) : posts.length > 0 ? (
              posts.map((post) => (
                <div
                  key={post._id}
                  className="bg-white border border-gray-200 p-6 rounded-lg shadow hover:shadow-md transition"
                >
                  <h2 className="text-xl font-semibold mb-2 text-gray-800">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {post.content?.substring(0, 100)}...
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
              ))
            ) : (
              <p className="text-gray-500 text-center">
                No blogs available for this category.
              </p>
            )
          ) : (
            <p className="text-gray-500 text-center">
              Please add a category to get started.
            </p>
          )}
        </main>
      </div>

      {/* Create Blog Button */}
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
