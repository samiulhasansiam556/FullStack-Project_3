"use client";
import { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";

export default function ProfileEditForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
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
    // console.log("Form Data:", formData); // Debugging log
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile-update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      alert("Error updating profile");
    }
  };

  return (
    <form className="space-y-4">
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Street:</label>
        <input
          type="text"
          name="address.street"
          value={formData.address.street}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>City:</label>
        <input
          type="text"
          name="address.city"
          value={formData.address.city}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Postal Code:</label>
        <input
          type="text"
          name="address.postalCode"
          value={formData.address.postalCode}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>District:</label>
        <input
          type="text"
          name="address.district"
          value={formData.address.district}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Country:</label>
        <input
          type="text"
          name="address.country"
          value={formData.address.country}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <CldUploadWidget
        //uploadPreset="profile_picture_signed"
        signatureEndpoint={`${process.env.NEXT_PUBLIC_API_URL}/cloudinary-sign`}       
        onSuccess={(result) => {
         //console.log(211,option);
          setFormData((prev) => ({
            ...prev,
            profileImage: result.info.secure_url, // Save the secure URL of the uploaded image
          }));
        }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Upload an Image
          </button>
        )}
      </CldUploadWidget>
      <button onClick={handleSubmit} className="bg-blue-500 text-white p-2">
        Save Changes
      </button>
    </form>
  );
}