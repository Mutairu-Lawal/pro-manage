const express = require('express');
const authRouter = require('./routes/auth');
const cors = require('cors');
const helmet = require('helmet');
const NotFoundPage = require('./middlewares/notFoundPage');
const ErrorHandler = require('./middlewares/errorhandler');
const errorHandler = require('./middlewares/errorhandler');

const app = express();

// middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to proManage express api end point');
});

app.use('/auth', authRouter);

app.use(NotFoundPage);

app.use(errorHandler);

module.exports = app;
