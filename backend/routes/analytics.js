const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');
const { verifyToken } = require('../middleware/auth');

// Get velocity (mocked aggregation for now)
router.get('/velocity', verifyToken, async (req, res) => {
  try {
    // In a real scenario, this would group goals by completion date (e.g. month)
    // using MongoDB aggregations. We return static format that matches frontend
    const data = [
      { name: 'Jan', completed: 4, target: 5 },
      { name: 'Feb', completed: 7, target: 8 },
      { name: 'Mar', completed: 12, target: 12 },
      { name: 'Apr', completed: 15, target: 16 },
      { name: 'May', completed: 22, target: 20 },
      { name: 'Jun', completed: 28, target: 25 },
    ];
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
