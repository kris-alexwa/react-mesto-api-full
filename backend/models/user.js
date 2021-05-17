const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Минимальная длина 2 символа'],
    maxlength: [30, 'Максимальная длина 30 символов'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        return validator.isURL(v, { require_protocol: true });
      },
      message: (props) => `${props.value} не валидная ссылка`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, { versionKey: false });

// eslint-disable-next-line func-names
// Проверка почты и пароля пользователя
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password') // this - модель User
  .then((user) => {
    if (!user) {
      return Promise.reject(new Error('Неправильные почта или пароль'));
    }
    // Сравниваем переданный пароль и хеш из базы, если пользователь нашелся.
    // Метод bcrypt.compare посчитает хеш и сравнит его с тем хешем,
    // который мы передали вторым аргументом.
    return bcrypt.compare(password, user.password)
      // Если хеши совпали, в then придёт true, иначе — false
      .then((matched) => {
        if (!matched) {
          return Promise.reject(new Error('Неправильные почта или пароль'));
        }
        return user;
      });
  });
};

module.exports = mongoose.model('user', userSchema);
