
const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const User = require('../models/user')

const ErrorAuth = require('../errors/errorAuth');
const ErrorConflict = require('../errors/errorConflict');
const ErrorValidation = require('../errors/errorValidation');
const ErrorNotFound = require('../errors/errorNotFound');
const { JWT_SECRET, NODE_ENV } = require('../utils/constant');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getUserBuId = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new ErrorNotFound(`Пользователь не найден`);
      } else {
        next(res.send(user));
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new ErrorValidation(`Переданные данные некорректны`));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hashedPassword) => User.create({ name, about, avatar, email, password: hashedPassword }))
    .then((user) => res.send(user.toJSON()))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new ErrorValidation(`Переданные данные некорректны`));
      } else if (err.code === 11000) {
        next(new ErrorConflict(`Такой e-mail уже зарегистрирован`));
      } else {
        next(err);
      }
    });
}

const updateProfileUser = (req, res, next) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new ErrorValidation(`Переданные данные некорректны`));
      } else {
        next(err);
      }
    })
};

const updateAvatarUser = (req, res, next) => {
  const { avatar } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new ErrorValidation(`Переданные данные некорректны`));
      } else {
        next(err);
      }
    })
}

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .orFail(() => new ErrorAuth('Пользователь не найден'))
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((isValidUser) => {
          if (isValidUser) {
            const jwt = jsonWebToken.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
            res.status(200).send({ token: jwt });
          } else {
            throw new ErrorAuth('Неправильный пароль');
          }
        })
        .catch(next);
    })
    .catch(next);
}

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new ErrorNotFound('Нет пользователя с указанным id'))
    .then((user) => res.send(user))
    .catch((err) => next(err));
}

module.exports = {
  createUser,
  getUserBuId,
  getUsers,
  updateProfileUser,
  updateAvatarUser,
  login,
  getUserInfo,
};