const moviesRouter = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { validateMovie, validateMovieId } = require('../middlewares/validation');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', validateMovie, createMovie);
moviesRouter.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = moviesRouter;
