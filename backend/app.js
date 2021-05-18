const express = require('express');
// const cors = require('cors');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const { createUser } = require('./controllers/users');
const login = require('./controllers/login');
const auth = require('./middlewares/auth');
const User = require('./models/user');
const { ErrorWithStatusCode, NotFoundError } = require('./errors/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { cors } = require('./middlewares/cors');

const { PORT = 5000 } = process.env;
const app = express();

app.use(express.json());

app.options('*', cors);
app.use(cors);

// app.use(cors({
//   allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept', 'X-Requested-With'],

// }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(requestLogger);

User.syncIndexes();

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
  }),
}), createUser);

app.use('/users', auth, routerUsers);
app.use('/cards', auth, routerCards);

app.use(errorLogger);

app.use(errors());

app.use((req, res, next) => {
  if (!req.route) {
    return next(new NotFoundError('Страница не найдена'));
  }
  return next();
});

app.use((err, req, res, next) => {
  if (err instanceof ErrorWithStatusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }
  if (err.name === 'SyntaxError') {
    return res.status(400).send({ message: `Переданы некорректные данные ${err.message}` });
  }
  console.log(err);
  return res.status(500).send({ message: 'На сервере произошла ошибка' });
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
