"use client";

import { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "@/hooks/userAuth";

export default function ProfileEditForm() {
  const { user } = useAuth();
  console.log(user)
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    phone: "",
    address: {
      street: "",
      city: "",
      postalCode: "",
      district: "",
      country: "",
    },
    profileImage: "",
  });
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem("user")) || {};
      setFormData({
        name: storedUser?.name || "",
        username: storedUser?.username || "",
        phone: storedUser?.phone || "",
        address: {
          street: storedUser?.address?.street || "",
          city: storedUser?.address?.city || "",
          postalCode: storedUser?.address?.postalCode || "",
          district: storedUser?.address?.district || "",
          country: storedUser?.address?.country || "",
        },
        profileImage: storedUser?.profileImage || "",
      });
    }
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = axios.put("/api/profile-update", formData,)
      .then((response) => {
        console.log(response.data);
        if (response.data.status === 200) {
          localStorage.setItem("user", JSON.stringify(response.data));
          alert("Profile updated successfully");
          router.push("/profile-edit");
        }else {
          alert(response.data.message || "Failed to update profile");
        }
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        alert("Failed to update profile");
      });
    } catch (error) {
      alert("Error updating profile");
    }
    if (!user) {
      return <div>Loading...</div>;
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Profile</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT SIDE */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

             <div>
              <label className="block text-gray-700 mb-1">User name</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Street</label>
              <input
                type="text"
                name="address.street"
                value={formData.address.street}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">City</label>
              <input
                type="text"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Postal Code</label>
              <input
                type="text"
                name="address.postalCode"
                value={formData.address.postalCode}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">District</label>
              <input
                type="text"
                name="address.district"
                value={formData.address.district}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Country</label>
              <input
                type="text"
                name="address.country"
                value={formData.address.country}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>


            {formData.profileImage && (
                  <img
                    src={formData.profileImage}
                    alt="Profile"
                    className="w-24 h-24 mx-auto rounded-full object-cover border border-gray-300"
                  />
                )}

            <div className="flex flex-col gap-3">
              <CldUploadWidget
                signatureEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/cloudinary-sign`}
                onSuccess={(result) => {
                  setFormData((prev) => ({
                    ...prev,
                    profileImage: result.info.secure_url,
                  }));
                }}
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={() => open()}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Upload Profile Image
                  </button>
                )}
              </CldUploadWidget>

              
            </div>
          </div>

          {/* FULL WIDTH SAVE BUTTON */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-green-600 text-white px-4 py-3 rounded hover:bg-green-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
