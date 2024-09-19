const router = require("express").Router();
const Post = require("../models/Post");
const User = require('../models/User');


// Create a post
router.post("/", async (req, res) => {
    try {
        const newPost = await Post.create(req.body);
        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update a post
router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);

        if (!post) {
            return res.status(404).json("Post not found");
        }

        if (post.userId === req.body.userId) {
            await post.update(req.body);
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
        const post = await Post.findByPk(req.params.id);

        if (!post) {
            return res.status(404).json("Post not found");
        }

        if (post.userId === req.body.userId) {
            await post.destroy();
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
        const post = await Post.findByPk(req.params.id);

        if (!post) {
            return res.status(404).json("Post not found");
        }

        const likes = post.likes || [];

        if (!likes.includes(req.body.userId)) {
            await post.update({ likes: [...likes, req.body.userId] });
            res.status(200).json("The post has been liked");
        } else {
            await post.update({ likes: likes.filter(id => id !== req.body.userId) });
            res.status(200).json("The post has been disliked");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


// Get a post
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json("Post not found");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get timeline posts
router.get('/timeline/:userId', async (req, res) => {
    try {
        const currentUser = await User.findByPk(req.params.userId);

        if (!currentUser) {
            return res.status(404).json("User not found");
        }

        const userPosts = await Post.findAll({ where: { userId: currentUser.id } });

        const friendsPosts = await Promise.all(
            currentUser.followings.map(async (friendId) => {
                try {
                    return await Post.findAll({ where: { userId: friendId } });
                } catch (error) {
                    console.error(error);
                    throw error; // Rethrow the error to be caught by the outer catch block
                }
            })
        );

        res.json(userPosts.concat(...friendsPosts));
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// Get user's all posts
router.get('/profile/:username', async (req, res) => {
    try {
        const currentUser = await User.findOne({ where: { username: req.params.username } });

        if (!currentUser) {
            return res.status(404).json("User not found");
        }

        const userPosts = await Post.findAll({ where: { userId: currentUser.id } });

        res.status(200).json(userPosts);
    } catch (error) {
        console.log(error);
        res.status(500).json("Error in getting user posts: " + error);
    }
});

module.exports = router;