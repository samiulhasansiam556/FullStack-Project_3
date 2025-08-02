
import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title:{type:String, required:true},
    content:{type:String, required:true},
    blogImage:{type:String},
    user:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    likes:[{type:mongoose.Schema.Types.ObjectId, ref:'Like'}],
    Categories:{type:mongoose.Schema.Types.ObjectId, ref:'Category'},
    comments:[{type:mongoose.Schema.Types.ObjectId, ref:'Comment'}]
}   
,
{
    timestamps:true
}
);

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default Blog;
