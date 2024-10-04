const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 5000; // You can choose any available port

app.use(cors());
app.use(bodyParser.json());

// Endpoint to handle signup
app.post('/signup', (req, res) => {
  const userData = req.body;

  // Read the existing users from users.json
  fs.readFile('users.json', (err, data) => {
    if (err) {
      console.error('Error reading users.json:', err);
      return res.status(500).send('Error reading user data');
    }

    let users = [];
    if (data.length > 0) {
      users = JSON.parse(data);
    }

    // Add the new user data
    users.push(userData);

    // Write the updated users back to users.json
    fs.writeFile('users.json', JSON.stringify(users, null, 2), (err) => {
      if (err) {
        console.error('Error writing to users.json:', err);
        return res.status(500).send('Error saving user data');
      }

      return res.status(200).send('User registered successfully');
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
