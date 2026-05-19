const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');
const { verifyToken, requireRole } = require('../middleware/auth');

// Get all goals (Employees see their own, Managers see their department's, Admins see all)
router.get('/', verifyToken, async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'employee') {
      query.assignee = req.user.id;
    }
    // Simplification: Mangers see all right now, but could be filtered by department
    const goals = await Goal.find(query).populate('assignee', 'name email').populate('createdBy', 'name');
    res.json(goals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new goal
router.post('/', verifyToken, async (req, res) => {
  try {
    const newGoal = new Goal({
      ...req.body,
      createdBy: req.user.id
    });
    const savedGoal = await newGoal.save();
    res.status(201).json(savedGoal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a goal
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updatedGoal = await Goal.findByIdAndUpdate(
      req.params.id, 
      { $set: req.body }, 
      { new: true }
    );
    res.json(updatedGoal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
