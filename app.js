const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// custom middlewares
const NotFoundPage = require('./middlewares/notFoundPage');
const ErrorHandler = require('./middlewares/errorhandler');

// routers
const authRouter = require('./routes/auth');
const teamsRouter = require('./routes/teams');
const projectsRouter = require('./routes/projects');

const app = express();

// middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to proManage express api end point');
});

// auth routes
app.use('/auth', authRouter);
// teams route
app.use('/teams', teamsRouter);
// projects route
app.use('/projects', projectsRouter);

app.use(NotFoundPage);

app.use(ErrorHandler);

module.exports = app;
