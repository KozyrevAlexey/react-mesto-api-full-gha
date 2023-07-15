const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const router = require('./routes');

const errorsHandler = require('./middlewares/errorsHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, MONGO_DB } = require('./utils/constant');

// const { PORT = 3000 } = process.env

const app = express();
app.use(express.json());
app.use(requestLogger);
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'https://kamesto.nomoreparties.sbs', 'http://kamesto.nomoreparties.sbs'],
  credentials: true,
}));

mongoose.connect(MONGO_DB);

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`Слушаю порт ${PORT}`)
});