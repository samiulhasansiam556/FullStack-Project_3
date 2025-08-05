

import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({

    name: { type: String, required: true, unique: true },  
    blogid: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog',required: true }], // Reference to Blog model
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Reference to User model
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

export default Category;