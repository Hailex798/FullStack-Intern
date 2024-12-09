const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');


const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4001;


// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Connect to MongoDB
connectDB();

//Routes
app.use('/user', userRoutes);

// Sample API route for frontend
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});


// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
