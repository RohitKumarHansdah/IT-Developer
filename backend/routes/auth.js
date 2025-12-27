const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');  // ADD THIS LINE
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();


console.log('Auth routes loaded');
console.log('Auth middleware type:', typeof auth);

// ============================================
// REGISTER ENDPOINT - POST /api/auth/register
// ============================================
// ============================================
// REGISTER ENDPOINT - POST /api/auth/register
// ============================================
router.post('/register', async (req, res) => {
  console.log('Register endpoint called');
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ 
        message: 'Please provide username, email, and password' 
      });
    }

    console.log('Checking if user exists...');
    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        message: 'User already exists with this email or username' 
      });
    }

    console.log('Hashing password...');
    // Hash password BEFORE creating user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log('Creating new user...');
    // Create new user with hashed password
    const user = new User({ 
      username, 
      email, 
      password: hashedPassword  // Use hashed password
    });
    await user.save();

    console.log('Generating JWT token...');
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    console.log('User registered successfully');
    // Send response
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: error.message });
  }
});


// ============================================
// LOGIN ENDPOINT - POST /api/auth/login
// ============================================
router.post('/login', async (req, res) => {
  console.log('Login endpoint called');
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Please provide email and password' 
      });
    }

    console.log('Finding user by email...');
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('Comparing passwords...');
    // Check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('Generating JWT token...');
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    console.log('Login successful');
    // Send response
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message });
  }
});

// ============================================
// GET CURRENT USER - GET /api/auth/me
// ============================================
router.get('/me', auth, async (req, res) => {
  console.log('Get user endpoint called');
  console.log('req.user:', req.user);
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: error.message });
  }
});

console.log('Auth routes exported');

module.exports = router;
