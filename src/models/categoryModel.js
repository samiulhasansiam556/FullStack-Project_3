

import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({

    name: { type: String, required: true, unique: true },  
    blogid: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }] // Reference to Blog model

});

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

export default Category;