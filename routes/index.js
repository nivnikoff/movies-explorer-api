const router = require('express').Router();
const {
  signUp,
  signIn,
} = require('../controllers/users');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');

router.post('/signin', signIn);
router.post('/signup', signUp);

router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Страница по указанному маршруту не найдена'));
});

module.exports = router;