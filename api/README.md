Here's the cleaned up markdown code:

# Project Setup and Usage

## Prerequisites
- Node.js (>= 22.x)
- pnpm (>= 10.x)
- SQL database (e.g., PostgreSQL)

## Install Dependencies
```sh
pnpm install
```

## Configure the Database
1. Create a `.env` file in the root directory
2. Add your configuration to the `.env` file:

```env
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5430/taskly
NODE_ENV=development
PORT=8000
```

## Run Database with Docker
```sh
pnpm run dc:up
```

## Run Database Creation Script
```sh
pnpm run db:init
```

## Run Database Migrations
```sh
pnpm run db:migrate
```

## Seed the Database
```sh
pnpm run seed
```

## Usage

### Start the Dev Server
```sh
pnpm run dev
```

### Run Tests
```sh
pnpm run test
```

### Build for Production
```sh
pnpm run build
```
### Start the Production Server
```sh
pnpm run start
```

## API Endpoints
### Users
- **GET** `/api/users`  
  Returns a list of users.

### Statuses
- **GET** `/api/statuses`  
  Returns a list of statuses.

### Tasks
- **GET** `/api/tasks`  
  Returns a list of tasks.

- **GET** `/api/tasks/${id}`  
  Returns a task by id.

- **POST** `/api/tasks`  
  Creates a new task.  
  Request body:
  ```json
  {
    "title": "New Task",
    "description": "Task description",
    "statusId": 1,
    "userId": 1
  }
  ```

- **PUT** `/api/tasks/:id`  
  Updates an existing task.  
  Request body:
  ```json
  {
    "title": "Updated Task",
    "description": "Updated description",
    "statusId": 1,
    "userId": 1
  }
  ```

- **DELETE** `/api/tasks/:id`  
  Deletes an existing task.

## Validation
The project uses `express-validator` for request validation. The following validation functions are available:
- `validateTaskTitle`
- `validateTaskDescription`
- `validateTaskUserId`
- `validateTaskStatusId`
- `validateIdParam`

## License
This project is licensed under the MIT License.
