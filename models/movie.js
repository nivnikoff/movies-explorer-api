const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: (img) => isUrl(img),
        message: 'Неверный формат ссылки на картинку',
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator: (trailer) => isUrl(trailer),
        message: 'Неверный формат ссылки на трейлер',
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator: (thumb) => isUrl(thumb),
        message: 'Неверный формат ссылки на миниатюру',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
  },
);

module.exports = mongoose.model('movie', movieSchema);
