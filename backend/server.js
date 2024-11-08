const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');  // Import Mongoose

const courseRoutes = require('./Routes/courseRoutes');

// Initialize the express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hopingmindsDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));

// Use the course routes
app.use('/api', courseRoutes);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
