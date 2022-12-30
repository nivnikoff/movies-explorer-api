const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  STATUS_CREATED,
  SALT_ROUND,
} = require('../utils/const');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ForbiddenError = require('../errors/ForbiddenError');
const errorMessage = require('../errors/errorMesages');

const { NODE_ENV, JWT_SECRET_KEY } = process.env;

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errorMessage.notFoundUser);
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(errorMessage.badRequestId));
      }
      return next(err);
    });
};

const updateUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errorMessage.notFoundUser);
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(errorMessage.badRequestUser));
      }
      return next(err);
    });
};

const signUp = (req, res, next) => {
  const { email, password, name } = req.body;
  if (!email || !password) throw new BadRequestError(errorMessage.badRequestSignup);
  return bcrypt.hash(password, SALT_ROUND)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => res.status(STATUS_CREATED).send({
      _id: user._id,
      email: user.email,
      name: user.name,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError(errorMessage.conflict));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(errorMessage.badRequestId));
      }
      return next(err);
    });
};

const signIn = (req, res, next) => {
  const { email, password } = req.body;
  return User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(errorMessage.unauthorizedSignup));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new ForbiddenError(errorMessage.forbiddenSignup));
          }
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET_KEY : 'very-protected-secret-key',
            { expiresIn: '7d' },
          );
          return res.send({ token });
        });
    })
    .catch(next);
};

module.exports = {
  getUser,
  updateUser,
  signUp,
  signIn,
};
