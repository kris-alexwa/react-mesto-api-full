const bcrypt = require('bcryptjs');
const User = require('../models/user');

const SOLT_ROUNDS = 10;
const {
  NotFoundError, ValidationError, ConflictError, UnauthorizedError,
} = require('../errors/errors');

function returnUsers(req, res, next) {
  User.find({})
    .then((allUsers) => res.send(allUsers))
    .catch((err) => next(err));
}

function returnUserID(req, res, next) {
  User.findById(req.params.id)
    .then((someUser) => {
      if (!someUser) {
        throw new NotFoundError(`Пользователь с указанным id ${req.params.id} не найден`);
      }
      res.send(someUser);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidationError(`Перадан некорректный id ${req.params.id}`);
      }
      throw err;
    })
    .catch((err) => next(err));
}

function createUser(req, res, next) {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, SOLT_ROUNDS)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((newUser) => res.send({
      _id: newUser._id,
      name: newUser.name,
      about: newUser.about,
      avatar: newUser.avatar,
      email: newUser.email,
    }))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        throw new ConflictError('Пользователь с таким email уже существует');
      }
      if (err.name === 'ValidationError') {
        throw new ValidationError(`Переданы некорректные данные ${err.message}`);
      }
      throw err;
    })
    .catch((err) => next(err));
}

function updateUserProfile(req, res, next) {
  User.findByIdAndUpdate(
    req.user._id, { name: req.body.name, about: req.body.about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(`Пользователь с id ${req.user._id} не найден`);
      }
      res.send(user);
    })
    .catch((err) => {
      console.log('ОШИБКА');
      console.log(err);
      if (err.name === 'ValidationError') {
        throw new ValidationError(`Переданы некорректные данные ${err.message}`);
      }
      throw err;
    })
    .catch((err) => next(err));
}

function updateUserAvatar(req, res, next) {
  User.findByIdAndUpdate(
    req.user._id, { avatar: req.body.avatar }, { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(`Пользователь с id ${req.user._id} не найден`);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError(`Переданы некорректные данные ${err.message}`);
      }
      throw err;
    })
    .catch((err) => next(err));
}

function getCurrentUser(req, res, next) {
  const myId = req.user?._id;
  if (!myId) {
    throw new UnauthorizedError('Пользователь не залогинен');
  }
  User.findById(myId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(`Пользователь с указанным id ${myId} не найден`);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidationError(`Передан некорректный id ${myId}`);
      }
      throw err;
    })
    .catch((err) => next(err));
}

module.exports = {
  returnUsers,
  returnUserID,
  createUser,
  updateUserProfile,
  updateUserAvatar,
  getCurrentUser,
};
