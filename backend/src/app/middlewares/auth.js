const jwt = require('jsonwebtoken');

module.exports = function checkToken(req, res, next) {
  // bypass login, register
  if (req.url.toLowerCase().trim() === '/auth/login' || req.url.toLowerCase().trim() === '/auth/register') {
    next();
    return;
  }

  // get and validate token
  const token = req.headers?.authorization?.split(' ')[1];
  try {
    const jwtObject = jwt.verify(token, process.env.JWT_SECRET);
    const isExpired = Date.now() >= jwtObject.exp * 1000;
    if (isExpired) {
      res.status(200).json({ message: 'Token is expired' });
      res.end();
    } else {
      next();
    }
  } catch (e) {
    res.status(400).json({ message: 'Error auth' });
    next();
  }

  next();
};
