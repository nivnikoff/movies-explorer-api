const errorMessage = {
  badRequestMovie: 'Некорректные данные фильма',
  badRequestId: 'Некорректный id',
  badRequestUser: 'Некорректные данные пользователя',
  badRequestSignup: 'Необходимо указать email и пароль',
  conflict: 'Пользователь с таким email уже существует',
  forbiddenMovie: 'Нельзя удалять чужой фильм',
  forbiddenSignup: 'Неверные почта или пароль',
  notFoundMovie: 'Фильм не найден',
  notFoundUser: 'Пользователь не найден',
  notFoundEndpoint: 'Страница по указанному маршруту не найдена',
  unauthorizedSignup: 'Неверные почта или пароль',
  unauthorizedNoToken: 'Ошибка авторизации',
  unauthorizedWrongToken: 'Необходима авторизация',
};

module.exports = errorMessage;
