const jwt = require('jsonwebtoken');
const config = require('../config');

const authenticateMiddleware = async (req, res, next) => {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
  
      if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
      }
  
      // Verify and decode the token
      const decoded = jwt.verify(token, config.jwtSecret);
  
      // Set the decoded user ID to the request object
      req.user = { id: decoded.userId };
  
      next();
    } catch (error) {
      console.error('Error in authenticateMiddleware:', error);
      res.status(401).json({ success: false, message: 'Invalid token' });
    }
  };
  

module.exports = authenticateMiddleware;
