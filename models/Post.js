const { DataTypes } = require("sequelize");
const sq = require("../config/dbconnection");

const Post = sq.define("POST", {
    id: {
        type: DataTypes.INTEGER, // Use DataTypes.INTEGER for integer fields
        autoIncrement: true,
        primaryKey: true, // Make it the primary key
        allowNull: false, // Ensure it's not null
    },

    userId: {
        type: DataTypes.STRING,
        allowNull: false, // Ensure it's not null
    },

    desc: {
        type: DataTypes.STRING(500), // Set maximum length of 500 characters
    },

    img: {
        type: DataTypes.STRING,
    },

    likes: {
        type: DataTypes.ARRAY(DataTypes.STRING), // Use DataTypes.ARRAY for arrays of strings
        defaultValue: [], // Set default value as an empty array
    }
}, {
    timestamps: true // Add createdAt and updatedAt timestamps
});

Post.sync().then(() => {
    console.log("Post model synced");
});

module.exports = Post;