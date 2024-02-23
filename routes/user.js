const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

// Update user

router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }
            catch (err) {
                return res.status(500).json(err);
            }
        }
    }
    else {
        res.status(403).json("You can update only your account.");
    }
});


// Delete user

router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Deleted Account");
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
    else {
        res.status(403).json("You can delete only your account.");
    }
});


// Get a user

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, updatedAt, ...other } = user._doc
        res.status(200).json(other);
    }
    catch (err) {
        res.status(500).json(err);
    }
});


// Follow a user

router.put("/:id/follow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currUser.updateOne({ $push: { followings: req.params.id } });
                res.status(200).json("User has been followed");
            }
            else {
                res.status(403).json("You already follow this user");
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(403).json("You cant follow yourself");
    }
})


// Unfollow a user

router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currUser.updateOne({ $pull: { followings: req.params.id } });
                res.status(200).json("User has been unfollowed");
            }
            else {
                res.status(403).json("You already unfollow this user");
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(403).json("You cant unfollow yourself");
    }
})


module.exports = router;