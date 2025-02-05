const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');
const UserModel = require('./model/User');
const Contact = require('./model/Contact');
const nodemailer = require('nodemailer'); // For sending emails

// .env config
dotenv.config();

// Express setup
const app = express();

// Security Middleware with updated Cross-Origin-Resource-Policy
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// CORS - allow your frontend (adjust as needed)
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));

// Limit request body size
app.use(express.json({ limit: '10kb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Serve uploaded files using absolute path
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database connection
mongoose
  .connect(process.env.MONGI_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection failed:', err));

// Image schema and model
const imageSchema = new mongoose.Schema({
  filename: String,
  filepath: String,
  name: String,
  description: String,
  uploadedAt: { type: Date, default: Date.now },
});
const Image = mongoose.model('Image', imageSchema);

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only JPEG, PNG, and GIF images are allowed'));
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service (e.g., Gmail, Outlook)
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

// Routes

// Signup Route
app.post(
  '/Signup',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password } = req.body;
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({ name, email, password: hashedPassword });
      await newUser.save();

      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error in /Signup route:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

// Login Route
app.post(
  '/Login',
  [
    body('email').isEmail().normalizeEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Error in /Login route:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

// Logout Route
app.post('/Logout', (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
});

// Image upload route
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { name, description } = req.body;
    const image = new Image({
      filename: req.file.filename,
      filepath: `/uploads/${req.file.filename}`,
      name,
      description,
    });
    await image.save();
    res.status(200).json({ message: 'Image uploaded successfully', image });
  } catch (error) {
    console.error('Error uploading image:', error.message);
    res.status(500).json({ error: 'Image upload failed' });
  }
});

// Fetch all images
app.get('/images', async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json(images);
  } catch (error) {
    console.error('Error retrieving images:', error.message);
    res.status(500).json({ error: 'Failed to retrieve images' });
  }
});

// Delete an image
app.delete('/image/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Image.findByIdAndDelete(id);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    const filePath = path.join(__dirname, image.filepath);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error.message);
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

// Update an image
app.put('/image/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const updateData = { name, description };
    if (req.file) {
      updateData.filename = req.file.filename;
      updateData.filepath = `/uploads/${req.file.filename}`;
    }

    const updatedImage = await Image.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedImage) {
      return res.status(404).json({ error: 'Image not found' });
    }

    res.status(200).json({ message: 'Image updated successfully', image: updatedImage });
  } catch (error) {
    console.error('Error updating image:', error.message);
    res.status(500).json({ error: 'Failed to update image' });
  }
});

// Fetch a single image by ID
app.get('/image/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    res.status(200).json(image);
  } catch (error) {
    console.error('Error retrieving image:', error.message);
    res.status(500).json({ error: 'Failed to retrieve image' });
  }
});

// Contact form submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, contactNumber, email, message } = req.body;

    // Validate required fields
    if (!name || !contactNumber || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Save the contact form data to the database
    const newContact = new Contact({ name, contactNumber, email, message });
    await newContact.save();

    // Send an email notification
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender email (your email)
      to: 'thamalidilrukshi232@gmail.com', // Recipient email (your email)
      subject: 'New Customer Message', // Email subject
      text: `You have received a new message from a customer:\n\n
             Name: ${name}\n
             Contact Number: ${contactNumber}\n
             Email: ${email}\n
             Message: ${message}\n\n
             Please respond promptly.`, // Email body
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    // Respond to the client
    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Error submitting contact form:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch all contacts
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error.message);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});