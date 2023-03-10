const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const errorMessage = require('../errors/errorMesages');

const { NODE_ENV, JWT_SECRET_KEY } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(errorMessage.unauthorizedNoToken);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET_KEY : 'very-protected-secret-key');
  } catch (err) {
    next(new UnauthorizedError(errorMessage.unauthorizedWrongToken));
  }

  req.user = payload;

  return next();
};

module.exports = auth;
