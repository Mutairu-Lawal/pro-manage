const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pro-Manage API',
      version: '1.0.0',
      description:
        'A comprehensive project management REST API for team collaboration',
      contact: {
        name: 'Pro-Manage Support',
        email: 'support@pro-manage.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development Server',
      },
      {
        url: 'https://api.pro-manage.com',
        description: 'Production Server',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT Authorization header using the Bearer scheme',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'User ID',
            },
            name: {
              type: 'string',
              description: 'User name',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email',
            },
            role: {
              type: 'string',
              enum: ['member', 'manager', 'admin'],
              description: 'User role',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'User creation timestamp',
            },
          },
        },
        Team: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Team ID',
            },
            name: {
              type: 'string',
              description: 'Team name',
            },
            owner: {
              type: 'integer',
              description: 'Team owner user ID',
            },
            members: {
              type: 'array',
              description: 'Team members',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Team creation timestamp',
            },
          },
        },
        Project: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Project ID',
            },
            name: {
              type: 'string',
              description: 'Project name',
            },
            teamId: {
              type: 'integer',
              description: 'Team ID this project belongs to',
            },
            createdBy: {
              type: 'string',
              description: 'User ID who created the project',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Project creation timestamp',
            },
          },
        },
        Task: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Task ID',
            },
            title: {
              type: 'string',
              description: 'Task title',
            },
            description: {
              type: 'string',
              description: 'Task description',
            },
            status: {
              type: 'string',
              enum: ['pending', 'in-progress', 'completed'],
              description: 'Task status',
            },
            priority: {
              type: 'string',
              enum: ['low', 'medium', 'high'],
              description: 'Task priority',
            },
            projectId: {
              type: 'integer',
              description: 'Project ID',
            },
            assignedTo: {
              type: 'integer',
              description: 'User ID assigned to this task',
            },
            attachments: {
              type: 'array',
              description: 'Task attachments',
            },
            createdBy: {
              type: 'string',
              description: 'User ID who created the task',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Task creation timestamp',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Error message',
            },
          },
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: [
    './routes/auth.js',
    './routes/teams.js',
    './routes/projects.js',
    './routes/tasks.js',
  ],
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
