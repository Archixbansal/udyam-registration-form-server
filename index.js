// server/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse incoming JSON data

// Test route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Placeholder for form submission
app.post('/api/submit-form', (req, res) => {
  const formData = req.body;
  console.log('Received form data:', formData);
  // Here you will add your database logic later
  res.status(200).json({ message: 'Data received successfully!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});