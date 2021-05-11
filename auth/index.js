const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');
const secret = config.jwt.secret;

const sign = (data) => {
  const signedToken = JSON.parse(JSON.stringify(data));
  return jwt.sign(signedToken, secret);
};

const verify = (token) => {
  return jwt.verify(token, secret);
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

    if (typeof(decoded.id) === 'number') {
      decoded.id = String(decoded.id);
    }

    if(decoded.id !== ownerId) {
      throw error('You do not have enough permissions for this action', 401);
    }
  },

  logged: (req) => {
    const decoded = decodeHeader(req);
  }
};

module.exports = {
  sign,
  check,
};
