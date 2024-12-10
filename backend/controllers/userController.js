const User = require('../models/user');
const bcrypt = require('bcrypt');

// Signup Controller
async function signup(req, res) {
    const { name, email, password, userType } = req.body;
    console.log(req.body);

    if (!name || !email || !password || !userType) { // Check for userType
        return res.status(400).json({ success: false, message: 'All fields are required!' });
    }

    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists!' });
        }

        // Encrypt password
        const encryptedPassword = await bcrypt.hash(password, 10);
        console.log(encryptedPassword);

        // Create and save the user in the database
        const newUser = new User({
            name,
            email,
            password: encryptedPassword,
            userType,
        });

        await newUser.save();

        return res.status(201).json({ success: true, message: 'User created successfully!' });
    } catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json({ success: false, message: 'An error occurred during signup. Please try again later.' });
    }
}

// Login Controller
async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required!' });
    }

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid email or password!' });
        }

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid email or password!' });
        }

        // Successfully authenticated
        // Sending back user details along with the message
        return res.status(200).json({
            success: true,
            message: 'Login successful!',
            user: {
                id: user._id,
                name: user.name, // Ensure this is included
                email: user.email,
                userType: user.userType
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ success: false, message: 'An error occurred during login. Please try again later.' });
    }
}


module.exports = { 
    signup, 
    login
};
