const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { verifyToken, requireRole } = require('../middleware/auth');

// Get all users (for team view) - Restricted to managers and admins
router.get('/', verifyToken, requireRole(['manager', 'admin']), async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'manager') {
      query.department = req.user.department; // Manager only sees their department
    }
    const users = await User.find(query).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
