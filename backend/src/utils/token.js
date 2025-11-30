const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/constants');

function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

module.exports = { generateToken };
