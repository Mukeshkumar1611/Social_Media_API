const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Update user
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }

        try {
            const [updated] = await User.update(req.body, {
                where: { id: req.params.id }
            });


            if (updated) {
                res.status(200).json("Account Updated");
            } else {
                res.status(404).json("User not found");
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can update only your account.");
    }
});

// Delete user
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const deleted = await User.destroy({
                where: { id: req.params.id }
            });

            if (deleted) {
                res.status(200).json("Deleted Account");
            } else {
                res.status(404).json("User not found");
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can delete only your account.");
    }
});

// Get a user
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (user) {
            const { password, updatedAt, ...other } = user.dataValues;
            res.status(200).json(other);
        } else {
            res.status(404).json("User not found");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Follow a user
router.put("/:id/follow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findByPk(req.params.id);
            const currUser = await User.findByPk(req.body.userId);

            if (!user.followers.includes(req.body.userId)) {
                await user.update({
                    followers: [...user.followers, req.body.userId]
                });
                await currUser.update({
                    followings: [...currUser.followings, req.params.id]
                });
                res.status(200).json("User has been followed");
            } else {
                res.status(403).json("You already follow this user");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can't follow yourself");
    }
});

// Unfollow a user
router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findByPk(req.params.id);
            const currUser = await User.findByPk(req.body.userId);

            if (user.followers.includes(req.body.userId)) {
                await user.update({
                    followers: user.followers.filter(id => id !== req.body.userId)
                });
                await currUser.update({
                    followings: currUser.followings.filter(id => id !== req.params.id)
                });
                res.status(200).json("User has been unfollowed");
            } else {
                res.status(403).json("You are not following this user");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can't unfollow yourself");
    }
});

module.exports = router;