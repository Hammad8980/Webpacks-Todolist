# Todo Backend API

## Overview
This is a ** Express + TypeScript backend** for the Todo app.

- ✅ Basic Express server with CORS
- ✅ MongoDB connection via Mongoose
- ✅ Simple CRUD endpoints for todos
- ✅ Basic error handling (try/catch with simple error responses)
- ✅ Simple 404 handler
- ✅ Webpack build process

## API Endpoints
All endpoints return simple JSON responses:

```
GET    /api/tasks           - Get all tasks
POST   /api/tasks           - Create task
PUT    /api/tasks/:id       - Update task
PATCH  /api/tasks/:id/toggle - Toggle task completion
DELETE /api/tasks/:id       - Delete task
```

## File Structure
```
backend/src/
├── index.ts              # Main server file (simple)
├── middleware/
│   ├── index.ts          # Exports errorHandler, notFound
│   └── errorHandler.ts   # Basic error handling only
├── controllers/
│   └── TaskController.ts # Simple async/await with try/catch
├── routes/
│   └── Api.ts           # Basic routes (no validation middleware)
├── models/
│   └── Tasks.ts         # Mongoose model
├── types/
│   └── index.ts         # Basic TypeScript interfaces
└── config/
    └── Db.ts           # MongoDB connection
```

## Error Handling
- **Simple try/catch** in each controller
- **Basic error responses**: `{ message: "error description" }`
- **HTTP status codes**: 400, 404, 500

## Build & Run
```bash
npm run build    # Webpack builds to dist/server.js
npm start        # Runs node dist/server.js
```
