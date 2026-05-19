const admin = require('../config/firebase-admin');

const verifyToken = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const idToken = token.replace('Bearer ', '');
    // Verify the Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    // Attach the verified user payload to the request
    // Note: To enforce roles from our MongoDB database, we should fetch the DB user here, 
    // or rely on the fact that /api/auth/sync returns the full user.
    // For now, we fetch the MongoDB user so `req.user.role` is always accurate.
    const User = require('../models/User');
    const dbUser = await User.findOne({ uid: decodedToken.uid }) || await User.findOne({ email: decodedToken.email });
    
    req.user = dbUser ? dbUser : decodedToken;
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);
    res.status(400).json({ error: 'Invalid token' });
  }
};

const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
};

module.exports = { verifyToken, requireRole };
