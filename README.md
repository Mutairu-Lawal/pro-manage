# Pro-Manage API

A comprehensive project management REST API built with Node.js and Express. Pro-Manage allows teams to organize projects, manage tasks, and collaborate efficiently.

## Features

- **User Authentication**: Secure user registration and login with JWT tokens
- **Team Management**: Create and manage teams with role-based access control
- **Project Management**: Create and organize projects within teams
- **Task Management**: Create, update, and delete tasks with status tracking and priority levels
- **User Invitations**: Invite users to teams for collaboration
- **Input Validation**: Comprehensive validation using express-validator
- **Security**: Helmet middleware for security headers and CORS support
- **Password Security**: Bcrypt hashing for secure password storage

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js v5.2.1
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: Bcrypt
- **Security**: Helmet, CORS
- **Validation**: express-validator
- **Rate Limiting**: express-rate-limit
- **Environment**: dotenv

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd pro-manage
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
JWT_SECRET_TOKEN=your_secret_token_here
PORT=5000
```

4. Ensure `db.json` exists in the root directory for data persistence

## Project Structure

```
pro-manage/
├── controllers/          # Request handlers and business logic
│   ├── auth.controller.js
│   ├── tasks.controller.js
│   └── teams.controller.js
├── routes/              # API route definitions
│   ├── auth.js
│   ├── projects.js
│   ├── tasks.js
│   └── teams.js
├── middlewares/         # Custom middleware functions
│   ├── authHandler.js
│   ├── errorhandler.js
│   └── notFoundPage.js
├── utils/               # Utility functions
│   ├── db.js
│   └── teams.js
├── app.js              # Express app configuration
├── server.js           # Server entry point
├── db.json             # JSON database file
└── package.json        # Project dependencies
```

## API Endpoints

### Authentication Routes (`/auth`)

- **POST /auth/register** - Register a new user
  - Body: `{ email, name, password, role }`
  - Password requirements: min 8 chars, uppercase, lowercase, numeric, special characters

- **POST /auth/login** - Login user
  - Body: `{ email, password }`
  - Returns: JWT token

- **GET /auth/profile** - Get user profile (requires authentication)

### Teams Routes (`/teams`) - _Requires Authentication_

- **GET /teams** - Get all user teams

- **POST /teams** - Create a new team
  - Body: `{ name }`

- **POST /teams/:id/invite** - Invite user to team
  - Params: `{ id }`

### Projects Routes (`/projects`)

- **GET /projects** - Get projects for a team
  - Query: `{ teamId }`

- **POST /projects** - Create a new project
  - Body: `{ name, teamId }`

### Tasks Routes (`/tasks`)

- **GET /tasks** - Get tasks for a project
  - Query: `{ projectId, status }`
  - Status values: `pending`, `completed`, `in-progress`

- **POST /tasks** - Create a new task
  - Body: `{ title, description, status, projectId, assignedTo, priority, attachments }`
  - Priority values: `low`, `medium`, `high`

- **PUT /tasks/:id** - Update a task
  - Params: `{ id }`
  - Body: Same as POST

- **DELETE /tasks/:id** - Delete a task
  - Params: `{ id }`

## Running the Project

### Development Mode

Run the server with automatic restart on file changes:

```bash
npm run dev
```

The server will start and watch for changes in the codebase.

### Default Port

The API server runs on `http://localhost:5000` by default.

## Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Database

The project uses a JSON-based database system (`db.json`). The database structure includes:

- Users database (`usersDB`)
- Teams database (`teamsDB`)
- Projects and Tasks are stored in related structures

## Error Handling

The API includes comprehensive error handling with:

- Validation error responses
- Unauthorized access responses (401)
- Not found responses (404)
- Server error responses (500)

## Role-Based Access Control

Supported roles:

- `member` - Team member with basic permissions
- `manager` - Team manager with elevated permissions
- `admin` - Administrator with full permissions

## Contributing

Please follow the code formatting standards applied in this project when contributing.

## License

ISC
