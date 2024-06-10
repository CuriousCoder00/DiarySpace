import mongoose from 'mongoose';

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    category: {
        type: Array,
        required: false   
    },
    createdDate: {
        type: Date
    }
});


const Post = mongoose.model('post', PostSchema);

export default Post;