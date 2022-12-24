const usersRouter = require('express').Router();
const {
  getUser,
  updateUser,
} = require('../controllers/users');
const { validateEditProfile } = require('../middlewares/validation');

usersRouter.get('/me', getUser);
usersRouter.patch('/me', validateEditProfile, updateUser);

module.exports = usersRouter;
