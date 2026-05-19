const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User');

// Helper function to generate token and redirect
const handleOAuthCallback = (req, res) => {
  const token = jwt.sign(
    { id: req.user._id, role: req.user.role, department: req.user.department },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
  
  const userData = encodeURIComponent(JSON.stringify({ 
    id: req.user._id, 
    name: req.user.name, 
    role: req.user.role, 
    email: req.user.email 
  }));

  const isProd = process.env.NODE_ENV === 'production';
  const frontendUrl = isProd ? 'https://goal-setting-and-tracking-portal-rho.vercel.app' : 'http://localhost:5173';
  
  res.redirect(`${frontendUrl}/oauth-callback?token=${token}&user=${userData}`);
};

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, department } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'Email already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name, email, password: hashedPassword, role, department
    });
    const savedUser = await newUser.save();
    
    res.status(201).json({ message: 'User registered successfully', userId: savedUser._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'Invalid email or password' });

    const token = jwt.sign(
      { id: user._id, role: user.role, department: user.department },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({ 
      token, 
      user: { id: user._id, name: user.name, role: user.role, email: user.email } 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Google OAuth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login?error=true' }),
  handleOAuthCallback
);

// GitHub OAuth Routes
router.get('/github', passport.authenticate('github', { scope: ['user:email'], session: false }));

router.get(
  '/github/callback',
  passport.authenticate('github', { session: false, failureRedirect: '/login?error=true' }),
  handleOAuthCallback
);

module.exports = router;
