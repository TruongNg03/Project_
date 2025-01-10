const jwt = require('jsonwebtoken');
const { secretKey } = require('../../config/jwtConfig');

function generateToken(user) {
  const payload = {
    _id: user._id,
    username: user.username,
  };
  return jwt.sign(payload, secretKey, { expiresIn: '12h' });
}

module.exports = { generateToken };
