const express = require('express');
const authRouter = require('./routes/auth');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

// middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to proManage express api end point');
});

app.use('/auth', authRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Page Not Found' });
});

app.use((err, req, res) => {
  res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;
