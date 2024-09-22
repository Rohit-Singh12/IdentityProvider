const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();

const PORT = process.env.REACT_APP_PORT
app.use(cors({
  origin: process.env.REACT_APP_CLIENT_APP_URL, // Your frontend's origin
  credentials: true,               // Allow credentials (cookies)
}));
require("./firebase-admin");

const routes = require("./registration");



// Middleware to parse incoming JSON requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/auth', routes);

// Test route to make sure the server is running
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
