const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
 returnUsers, returnUserID, updateUserProfile, updateUserAvatar, getCurrentUser,
} = require('../controllers/users');

router.get('/', returnUsers);
router.get('/me', getCurrentUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
    about: Joi.string().min(2).max(30).default('Исследователь'),
  }),
}), updateUserProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
  }),
}), updateUserAvatar);

router.get('/:id', returnUserID);

module.exports = router;
