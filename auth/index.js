const jwt = require('jsonwebtoken');
const config = require('../config');
const secret = config.jwt.secret;

const sign = (data) => {
  return jwt.sign(data, secret);
};

const verify = (token) => {
  try {
    return jwt.verify(token, secret)
  } catch (error) {
    throw new Error(error.message)
  }
};

const getToken = (auth) => {
  if (!auth) {
    throw new Error('There is no token');
  }

  if(auth.indexOf('Bearer ') === -1) {
    throw new Error('Invalid format');
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
      throw new Error('You do not have enough permissions for this action');
    }
  },
};

module.exports = {
  sign,
  check,
};
