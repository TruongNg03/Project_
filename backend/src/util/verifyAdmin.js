const jwt = require('jsonwebtoken');

module.exports = function verifyAdmin(req, res, next) {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ message: 'You are not authenticated!' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token is invalid!' });
    }

    req.user = user;

    if (req.user.id === req.params.id && req.user.admin) {
      next();
    } else {
      return res.status(403).json({ message: 'You are not authorized!' });
    }
  });
};
