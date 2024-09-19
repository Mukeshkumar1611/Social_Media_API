const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Register
router.post("/register", async (req, res) => {
    try {
        // Generate new Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create new user using Sequelize
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        // Return response with the created user
        res.status(200).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// LOGIN

router.post("/login", async (req, res) => {
    try {
        // Find user by email
        const user = await User.findOne({ where: { email: req.body.email } });
        
        // Check if user exists
        if (!user) {
            return res.status(404).json("User not found");
        }
        
        // Check if password is correct
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json("Wrong password");
        }
        
        // Return user data
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;