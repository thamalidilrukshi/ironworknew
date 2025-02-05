const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Admin dashboard route
router.get('/dashboard', (req, res) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }

    res.status(200).json({ message: 'Welcome to the admin dashboard!' });
  });
});

module.exports = router;
