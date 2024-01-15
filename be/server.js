const pixelmatch = require('pixelmatch');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;
const uri ="mongodb+srv://pao0318:Nitrkl%402019@cluster0.5ejsm1x.mongodb.net/?retryWrites=true&w=majority";


const fs = require('fs');
const path = require('path');
const Jimp = require('jimp');

// Increase payload size limit to 50MB (adjust as needed)
app.use(bodyParser.json({ limit: '50mb' }));

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

app.use(express.json({ limit: '50mb' }));
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


app.post('/api/save-screenshot', async(req, res) => {
  try{
    const { dataUrl } = req.body;
    const base64Data = dataUrl.split(',')[1];
    const binaryData = Buffer.from(base64Data, 'base64');
    const fileName = `screenshot_${Date.now()}.png`;

    const filePath = path.join(__dirname, '..', 'fe', 'public', 'screenshots', 'Login', fileName);
    fs.writeFileSync(filePath, binaryData);
    console.log('Screenshot saved:', filePath);
    res.status(200).json({ message: 'Screenshot saved on the server.' });

  }catch (error) {
    console.error('Error saving screenshot:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/compare-images', async (req, res) => {
  try {
    const { img1, img2 } = req.body;

    const image1 = await Jimp.read(Buffer.from(img1, 'base64'));
    const image2 = await Jimp.read(Buffer.from(img2, 'base64'));

    // Ensure images have the same dimensions
    if (image1.bitmap.width !== image2.bitmap.width || image1.bitmap.height !== image2.bitmap.height) {
      return res.status(400).json({ error: 'Images must have the same dimensions for comparison.' });
    }

    const width = image1.bitmap.width;
    const height = image1.bitmap.height;

    const diffPixels = new Uint8Array(width * height);
    pixelmatch(image1.bitmap.data, image2.bitmap.data, diffPixels, width, height, { threshold: 0.1 });

    const totalPixels = width * height;
    const percentageDifference = (diffPixels.reduce((acc, pixel) => acc + pixel, 0) / totalPixels) * 100;

    res.status(200).json({ similarity: 100 - percentageDifference });
  } catch (error) {
    console.error('Error comparing images:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
