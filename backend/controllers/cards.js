const Card = require('../models/card');
const ValidationError = require('../errors/validation-err');
const DefaultError = require('../errors/default-err');
const NotFoundError = require('../errors/not-found-err');
const CastError = require('../errors/cast-err');
const ForbiddenError = require('../errors/forbidden-err');

const createCard = async (req, res, next) => {
  const { name, link } = req.body;
  try {
    const card = await Card.create({ name, link, owner: req.user._id });
    return res.send({ data: card });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new ValidationError('Переданы некорректные данные при создании карточки.'));
    }
    return next(new DefaultError('Ошибка по умолчанию.'));
  }
};

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => next(new DefaultError('Ошибка по умолчанию.')));
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then(async (card) => {
      if (!card) {
        return next(new NotFoundError('Карточка с указанным _id не найдена.'));
      }
      if (String(card.owner) === String(req.user._id)) {
        await card.remove();
        return res.send({ data: card });
      }
      return next(new ForbiddenError('Нельзя удалить карточку, созданную другим пользователем.'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new CastError('Переданы некорректные данные для удаления карточки.'));
      }
      return next(new DefaultError('Ошибка по умолчанию.'));
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Передан несуществующий _id карточки.'));
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new CastError('Переданы некорректные данные для постановки/снятии лайка.'));
      }
      return next(new DefaultError('Ошибка по умолчанию.'));
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Передан несуществующий _id карточки.'));
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new CastError('Переданы некорректные данные для постановки/снятии лайка.'));
      }
      return next(new DefaultError('Ошибка по умолчанию.'));
    });
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
};
