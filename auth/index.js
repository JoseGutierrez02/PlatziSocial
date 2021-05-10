const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');
const secret = config.jwt.secret;

const sign = (data) => {
  return jwt.sign(data, secret);
};

const verify = (token) => {
  try {
    return jwt.verify(token, secret)
  } catch (error) {
    throw error(error.message, 500);
  }
};

const getToken = (auth) => {
  if (!auth) {
    throw error('There is no token', 500);
  }

  if(auth.indexOf('Bearer ') === -1) {
    throw error('Invalid format', 500);
  }

  let token = auth.replace('Bearer ', '');
  return token;
};

const decodeHeader = (req) => {
  const authorization = req.headers.authorization || '';
  const token = getToken(authorization);
  const decoded = verify(token);
  
  req.user = decoded;
  return decoded;
};

const check = {
  own: (req, ownerId) => {
    const decoded = decodeHeader(req);
    console.log(decoded);

    if(decoded.id !== ownerId) {
      throw error('You do not have enough permissions for this action', 401);
    }
  },
};

module.exports = {
  sign,
  check,
};
