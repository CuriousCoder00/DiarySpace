import Post from "../model/post.js";

export const createPost = async (req, res) => {
    try {
        const newPost = await new Post(req.body);
        newPost.save();

        res.status(200).json('Post Saved Successfully.');

    } catch (error) {
        res.status(500).json(error);
    }
}
  
export const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post) res.status(404).json({msg: 'post not found'});

        await Post.findByIdAndupdate(req.params.id, { $set: req.body});

        res.status(200).json('Post Updated Successfully.');
    } catch (error) {
        res.status(500).json(error);
    }
}

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post) res.status(404).json({msg: 'post not found'});

        await post.delete();

        res.status(200).json('Post Deleted Successfully.');
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getPost = async (req, res) => {
    try {
        const post = await Post.find();

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getAllPosts = async (req, res) => {
    let username = res.query.username;
    let category = res.query.category;
    let posts;
    try {
        if(username) 
            posts = await Post.find({ username: username });
        else if (category) 
            posts = await Post.find({ categories: category });
        else 
            posts = await Post.find({});
            
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error)
    }
}

export const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post) res.status(404).json({msg: 'post not found'});

        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push: {likes: req.body.userId}});
            res.status(200).json('Post Liked Successfully.');
        }else{
            await post.updateOne({$pull: {likes: req.body.userId}});
            res.status(200).json('Post Unliked Successfully.');
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getTimelinePosts = async (req, res) => {
    try {
        const currentUser = await User.findById(req.body.userId);
        const userPosts = await Post.find({userId: currentUser._id});
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({userId: friendId});
            })
        );
        res.status(200).json(userPosts.concat(...friendPosts));
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const posts = await Post.find({userId: user._id});
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getPostsByCategory = async (req, res) => {
    try {
        const posts = await Post.find({categories: {$in: [req.params.name]}});
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getPostsByTag = async (req, res) => {
    try {
        const posts = await Post.find({tags: {$in: [req.params.name]}});
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getPostsBySearch = async (req, res) => {
    try {
        const posts = await Post.find({$text: {$search: req.query.q}});
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getPostsByDate = async (req, res) => {
    try {
        const posts = await Post.find({
            createdAt: {
                $gte: new Date(req.query.start),
                $lte: new Date(req.query.end)
            }
        });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getPostsByMonth = async (req, res) => {
    try {
        const posts = await Post.find({
            createdAt: {
                $gte: new Date(req.query.start),
                $lte: new Date(req.query.end)
            }
        });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getPostsByYear = async (req, res) => {
    try {
        const posts = await Post.find({
            createdAt: {
                $gte: new Date(req.query.start),
                $lte: new Date(req.query.end)
            }
        });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
}