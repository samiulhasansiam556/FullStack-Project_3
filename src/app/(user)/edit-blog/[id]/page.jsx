"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function EditBlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fetch blog data when id changes
  useEffect(() => {
    if (!id) return;
    axios.get(`/api/edit-blog/${id}`).then((res) => {
      const data = res.data;
      setBlog(data);
      setTitle(data.blog.title);
      setContent(data.blog.content);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/edit-blog/${id}`, { title, content }, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Blog updated!");
    } catch (error) {
      alert("Failed to update blog.");
      console.error(error);
    }
  };

  if (!blog) return <div className="text-center py-10 text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
          Edit Blog
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Title</label>
            <input
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Content</label>
            <textarea
              className="w-full border border-gray-300 rounded px-4 py-2 h-40 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
