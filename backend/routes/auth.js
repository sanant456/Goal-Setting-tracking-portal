const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { verifyToken } = require('../middleware/auth');

// Sync Firebase User with MongoDB
// This route is called immediately after a user signs in or signs up via Firebase on the frontend.
// The frontend passes the Firebase JWT in the Authorization header.
router.post('/sync', verifyToken, async (req, res) => {
  try {
    const { name, email, uid, role, department } = req.body;
    
    // verifyToken middleware already decoded the token. 
    // We check if a MongoDB user exists with this uid or email.
    let user = await User.findOne({ $or: [{ uid }, { email: email || req.user.email }] });

    if (!user) {
      // Create new user in MongoDB
      user = new User({
        name: name || req.user.name || req.user.email.split('@')[0],
        email: email || req.user.email,
        uid: uid || req.user.uid,
        role: role || 'employee',
        department: department || 'General'
      });
      await user.save();
    } else if (!user.uid && (uid || req.user.uid)) {
      // If the user existed before we added Firebase (e.g. legacy JWT users), attach their Firebase UID
      user.uid = uid || req.user.uid;
      await user.save();
    }

    res.json({ 
      user: { 
        id: user._id, 
        name: user.name, 
        role: user.role, 
        email: user.email,
        department: user.department 
      } 
    });
  } catch (err) {
    console.error('User sync error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
