
import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    blog:{type:mongoose.Schema.Types.ObjectId, ref:'Blog'},
    comment:{type:String, required:true}
},
{
    timestamps:true
}

);  

const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);

export default Comment;
