'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NavIn() {
  const router = useRouter();
  const [searchId, setSearchId] = React.useState('');

  const handleLogout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/SignIn');
  };

  const handleSearch = () => {
    if (searchId.trim()) {
      router.push(`/find-user/${searchId}`);
    }
  };

  return (
    <nav className="w-full bg-blue-600 text-white shadow-md font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        {/* Left - Logo */}
        <div className="text-2xl font-bold">MyBlog</div>

        {/* Right - Search & Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full md:w-auto">
          {/* Search Field */}
          <div className="flex w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search User ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="p-2 rounded-l-md w-full sm:w-60 bg-amber-50 text-black outline-none"
            />
            <button
              onClick={handleSearch}
              className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-r-md transition duration-200"
            >
              Search
            </button>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleLogout}
              className="bg-black hover:bg-gray-800 px-4 py-2 rounded-md transition duration-200"
            >
              Logout
            </button>
            <Link
              href="/profile-edit"
              className="bg-black hover:bg-gray-800 px-4 py-2 rounded-md transition duration-200 text-center"
            >
              Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
