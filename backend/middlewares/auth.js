const jwt = require('jsonwebtoken');
const ErrorAuth = require('../errors/errorAuth');
const { JWT_SECRET, NODE_ENV } = require('../utils/constant');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    next(new ErrorAuth('Необходимо авторизоваться'));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret')
  } catch (err) {
    next(new ErrorAuth('Необходимо авторизоваться'));
    return;
  }
  req.user = payload;
  next();
}

module.exports = auth;