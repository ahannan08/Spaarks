// middleware/authMiddleware.js
import jwt from "jsonwebtoken"


const authMiddleware = (req, res, next) => {
  //gen token
  const token = req.header('Authorization').replace('Bearer ', '');

  //when token is not provided in auth header
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  //when token is provided in header, decode it
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default authMiddleware
