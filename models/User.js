const { DataTypes } = require("sequelize");
const sq = require("../config/dbconnection");


const User = sq.define("User", {
    username: {
        type: DataTypes.STRING(20), // Set maximum length of 20 characters
        allowNull: false, // Ensure it's not null
        unique: true, // Ensure it's unique
        validate: {
            len: [2, 20] // Minimum length of 2 and maximum length of 20 characters
        }
    },
    email: {
        type: DataTypes.STRING(50), // Set maximum length of 50 characters
        allowNull: false, // Ensure it's not null
        unique: true, // Ensure it's unique
        validate: {
            isEmail: true // Ensure it is a valid email format
        }
    },
    password: {
        type: DataTypes.STRING, // Password length is not limited here
        allowNull: false, // Ensure it's not null
        validate: {
            len: [6] // Minimum length of 6 characters
        }
    },
    profilePicture: {
        type: DataTypes.STRING,
        defaultValue: "" // Default value of an empty string
    },
    coverPicture: {
        type: DataTypes.STRING,
        defaultValue: "" // Default value of an empty string
    },
    followers: {
        type: DataTypes.ARRAY(DataTypes.STRING), // Array of strings
        defaultValue: [] // Default value of an empty array
    },
    followings: {
        type: DataTypes.ARRAY(DataTypes.STRING), // Array of strings
        defaultValue: [] // Default value of an empty array
    },
    isAdmin: {
        type: DataTypes.BOOLEAN, // Boolean type for isAdmin
        defaultValue: false // Default value of false
    },
    desc: {
        type: DataTypes.STRING(50), // Set maximum length of 50 characters
    },
    city: {
        type: DataTypes.STRING(50), // Set maximum length of 50 characters
    },
    from: {
        type: DataTypes.STRING(50), // Set maximum length of 50 characters
    },
    relationship: {
        type: DataTypes.INTEGER, // Integer type for relationship
        validate: {
            isIn: [[1, 2, 3]] // Enum-like validation for specific values
        }
    }
}, {
    timestamps: true // Add createdAt and updatedAt timestamps
});

User.sync().then(() => {
    console.log("User model synced");
});

module.exports = User;