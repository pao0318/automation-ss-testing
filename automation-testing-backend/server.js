const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;
const uri ="mongodb+srv://pao0318:Nitrkl%402019@cluster0.5ejsm1x.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(result => console.log("database connected"))
.catch(err => console.log(err));

// MongoDB User Schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.json());
app.use(cors());
// Routes
app.post('/api/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);

    // Simple validation (add more as needed)
    if (!username || !password) {
      return res.status(400).json({ error: 'Please enter a valid username and password.' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists. Choose a different username.' });
    }

    // Create a new user
    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update this route in your Express backend
app.post('/api/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Validate username and password (you may use bcrypt for password hashing)
      // For simplicity, let's assume you have a User model with a findOne method
      const existingUser = await User.findOne({ username, password });
  
      if (existingUser) {
        res.status(200).json({ message: 'Login successful!' });
      } else {
        res.status(401).json({ error: 'Invalid username or password.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
