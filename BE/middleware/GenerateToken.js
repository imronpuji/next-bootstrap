const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function generateAccessToken(profile) {
  return jwt.sign(profile, process.env.TOKEN_SECRET, { expiresIn: '356d' });
}

module.exports = generateAccessToken


