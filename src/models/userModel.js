
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true,unique:true },
    password: { type: String, required: true },
    phone: { type: String },
    address: { 
      street: { type: String },
      city: { type: String },
      postalCode: { type: String},
      district: { type: String},
      country: { type: String  },
    },
    profileImage: { type: String },
    blogs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Blog'}],
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;