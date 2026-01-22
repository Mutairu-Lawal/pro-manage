const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// Custom Middlewares
const NotFoundPage = require('./middlewares/notFoundPage');
const ErrorHandler = require('./middlewares/errorhandler');

// Routes
const authRouter = require('./routes/auth');
const teamsRouter = require('./routes/teams');
const projectsRouter = require('./routes/projects');
const tasksRouter = require('./routes/tasks');

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(limiter);
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to proManage express api end point');
});

// Routes Configuration
app.use('/auth', authRouter);
app.use('/teams', teamsRouter);
app.use('/projects', projectsRouter);
app.use('/tasks', tasksRouter);

// Error Handling Middlewares
app.use(NotFoundPage);
app.use(ErrorHandler);

module.exports = app;
