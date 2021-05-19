const Card = require('../models/card');
const { NotFoundError, ValidationError, ForbiddenError } = require('../errors/errors');

function returnCards(req, res, next) {
  Card.find({})
    .then((allCards) => {
      res.send(allCards);
    })
    .catch((err) => next(err));
}

function createCard(req, res, next) {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((newCard) => res.send(newCard))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError(`Переданы некорректные данные ${err.message}`);
      }
      throw err;
    })
    .catch((err) => next(err));
}

function deleteCard(req, res, next) {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(`Карточка с указанным id ${req.params.cardId} не найдена`);
      }
      if (req.user._id !== card.owner.toString()) {
        throw new ForbiddenError('Нельзя удалить чужую карточку');
      }
    })
    .then(() => Card.findByIdAndRemove(req.params.cardId))
    .then(() => res.send({ message: 'Карточка удалена' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidationError(`Перадан некорректный id ${req.params.cardId}`);
      }
      throw err;
    })
    .catch((err) => next(err));
}

function likeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(`Карточка с указанным id ${req.params.cardId}} не найдена`);
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidationError(`Передан некорректный id ${req.params.cardId}`);
      }
      throw err;
    })
    .catch((err) => next(err));
}

function dislikeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(`Карточка с указанным id ${req.params.cardId} не найдена`);
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidationError(`Передан некорректный id ${req.params.cardId}`);
      }
      throw err;
    })
    .catch((err) => next(err));
}

module.exports = {
  returnCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
