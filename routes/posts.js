const router = require("express").Router();
const Post = require("../models/Post");
const User = require('../models/User');

// Create a post

router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }
    catch (err) {
        res.status(500).json(err);
    }
});


// Update a post 

router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json("Post not found");
        }

        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("Post has been updated");
        } else {
            res.status(403).json("You can only update your posts");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});


// Delete a post

router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json("Post not found");
        }

        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("Post has been deleted");
        } else {
            res.status(403).json("You can only delete your posts");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// Like / Dislike a post

router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("The post has been liked");
        }
        else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("The post has been disliked");
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});


// Get a post

router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json("Post not found");
        }
        res.status(200).json(post);
    }
    catch (err) {
        res.status(500).json(err);
    }
});


// Get timeline posts

router.get('/timeline/:userId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);

        const userPosts = await Post.find({ userId: currentUser._id });

        const friendsPosts = await Promise.all(
            currentUser.followings.map(async (friendId) => {
                try {
                    return await Post.find({ userId: friendId });
                } catch (error) {
                    console.error(error);
                    throw error; // Rethrow the error to be caught by the outer catch block
                }
            })
        );

        res.json(userPosts.concat(...friendsPosts))
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// Get user's all post
router.get('/profile/:username', async (req, res) => {
    try {
        const currentUser = await User.findOne({ username: req.params.username });

        const userPosts = await Post.findAll(currentUser._id);

        res.status(200).json(userPosts);
    } catch (error) {
        console.log(error);
        res.status(500).json("error in getting user posts" + error);
    }
})

module.exports = router;