// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../model/User');
const speakeasy = require('speakeasy');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Send OTP for 2FA
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate a secret for TOTP
    const secret = speakeasy.generateSecret({ length: 20 });
    user.twoFactorSecret = secret.base32;
    await user.save();

    // Generate OTP
    const otp = speakeasy.totp({
      secret: user.twoFactorSecret,
      encoding: 'base32',
    });

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP for 2FA',
      text: `Your OTP is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ error: 'Failed to send OTP' });
      }
      res.status(200).json({ message: 'OTP sent successfully' });
    });
  } catch (error) {
    console.error('Error in /send-otp:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify OTP
    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token: otp,
      window: 2, // Allow 2-step window for OTP validation
    });

    if (verified) {
      // Generate JWT token
      const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      res.status(200).json({ message: 'OTP verified successfully', token });
    } else {
      res.status(400).json({ error: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Error in /verify-otp:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;