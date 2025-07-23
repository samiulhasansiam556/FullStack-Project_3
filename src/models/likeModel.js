
import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    blog:{type:mongoose.Schema.Types.ObjectId, ref:'Blog'}
    
},
{
    timestamps:true
}

);

const Like = mongoose.models.Like || mongoose.model('Like', likeSchema);

export default Like;