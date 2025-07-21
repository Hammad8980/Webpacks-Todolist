# 📝 Todo List - Full Stack Application

A modern, responsive Todo List application built with **React + TypeScript** frontend and **Express + TypeScript** backend, featuring real-time data persistence with MongoDB.

![Todo App Demo](https://img.shields.io/badge/Status-Complete-brightgreen)
![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20TypeScript-blue)
![Backend](https://img.shields.io/badge/Backend-Express%20%2B%20TypeScript-green)
![Database](https://img.shields.io/badge/Database-MongoDB-darkgreen)
*For detailed tutorial of the project visit ![Webpack Todolist Documentation](https://code2tutorial.com/tutorial/f74a037e-f874-4c04-a180-fa218abede55/index.md)*

## 🌟 Features

### ✨ **Frontend Features**

- **Modern React UI** with TypeScript for type safety
- **Responsive Design** using Tailwind CSS
- **Real-time Updates** with backend API integration
- **Error Handling** with user-friendly error messages
- **Loading States** for better user experience
- **CRUD Operations** - Create, Read, Update, Delete todos
- **Toggle Completion** - Mark tasks as complete/incomplete
- **Priority Levels** - p1 (High), p2 (Medium), p3 (Low)
- **Clean Architecture** with organized component structure

### 🚀 **Backend Features**

- **RESTful API** with Express.js and TypeScript
- **MongoDB Integration** for data persistence
- **Simple Error Handling** with meaningful responses
- **CORS Enabled** for cross-origin requests
- **Clean Build Process** using Webpack
- **Environment Configuration** with dotenv

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Frontend Details](#-frontend-details)
- [Backend Details](#-backend-details)
- [API Endpoints](#-api-endpoints)
- [Development](#-development)
- [Build & Deploy](#-build--deploy)

## 🛠 Tech Stack

### **Frontend**

- **React** 18.3.1 - UI Library
- **TypeScript** 5.8.3 - Type Safety
- **Tailwind CSS** 3.4.17 - Styling
- **Axios** - HTTP Client for API calls
- **Webpack** 5.99.9 - Module Bundler
- **ESLint + Prettier** - Code Quality

### **Backend**

- **Express.js** - Web Framework
- **TypeScript** - Type Safety
- **MongoDB** - Database
- **Mongoose** - ODM
- **Webpack** - Build Tool
- **CORS** - Cross-Origin Resource Sharing

## 📁 Project Structure

```
Webpacks-Todolist/
├── 📁 frontend/                 # React TypeScript Frontend
│   ├── 📁 src/
│   │   ├── 📁 components/       # Reusable UI Components
│   │   │   ├── 📁 layout/       # Layout Components
│   │   │   │   ├── Header.tsx
│   │   │   │   └── MainLayout.tsx
│   │   │   ├── 📁 todo/         # Todo-specific Components
│   │   │   │   ├── TodoInput.tsx
│   │   │   │   ├── TodoItem.tsx
│   │   │   │   └── TodoList.tsx
│   │   │   └── 📁 ui/           # Generic UI Components
│   │   │       └── Button.tsx
│   │   ├── 📁 features/         # Feature-based Organization
│   │   │   └── 📁 todos/
│   │   │       ├── 📁 hooks/
│   │   │       │   └── useTodos.ts      # Main Todo Logic
│   │   │       ├── TodoReducer.ts       # State Management
│   │   │       ├── TodosSection.tsx     # Main Todo Container
│   │   │       └── TodoTaskTypes.ts     # TypeScript Types
│   │   ├── 📁 services/         # API Integration
│   │   │   └── Api.ts           # Backend API Calls
│   │   ├── 📁 utils/           # Utility Functions
│   │   │   └── Storage.ts       # (Legacy - replaced by API)
│   │   ├── App.tsx             # Main App Component
│   │   ├── index.tsx           # App Entry Point
│   │   └── index.css           # Global Styles
│   ├── 📁 public/              # Static Assets
│   │   └── index.html
│   ├── package.json
│   ├── webpack.common.js       # Common Webpack Config
│   ├── webpack.dev.js          # Development Config
│   ├── webpack.prod.js         # Production Config
│   ├── tailwind.config.js      # Tailwind Configuration
│   └── tsconfig.json           # TypeScript Configuration
│
├── 📁 backend/                  # Express TypeScript Backend
│   ├── 📁 src/
│   │   ├── index.ts            # Server Entry Point
│   │   ├── 📁 controllers/     # Route Controllers
│   │   │   └── TaskController.ts
│   │   ├── 📁 middleware/      # Express Middleware
│   │   │   ├── index.ts
│   │   │   └── errorHandler.ts
│   │   ├── 📁 models/          # Database Models
│   │   │   └── Tasks.ts
│   │   ├── 📁 routes/          # API Routes
│   │   │   └── Api.ts
│   │   ├── 📁 types/           # TypeScript Types
│   │   │   └── index.ts
│   │   └── 📁 config/          # Configuration
│   │       └── Db.ts
│   ├── 📁 dist/               # Built Files
│   │   └── server.js
│   ├── package.json
│   ├── webpack.config.js       # Webpack Configuration
│   └── tsconfig.json          # TypeScript Configuration
│
└── README.md                   # This File
```

## 🚀 Getting Started

### **Prerequisites**

- **Node.js** 16+
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)

### **Installation**

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Webpacks-Todolist
   ```

2. **Install Backend Dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**

   Create `.env` file in the `backend` folder:

   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/todolist
   ```

5. **Start MongoDB**

   ```bash
   # If using local MongoDB
   mongod
   ```

6. **Start the Application**

   **Terminal 1 - Backend:**

   ```bash
   cd backend
   npm run build
   npm start
   ```

   **Terminal 2 - Frontend:**

   ```bash
   cd frontend
   npm start
   ```

7. **Open in Browser**
   ```
   http://localhost:8080
   ```

## 🎨 Frontend Details

### **Architecture**

The frontend follows a **feature-based architecture** with clear separation of concerns:

- **Components** - Reusable UI elements
- **Features** - Business logic organized by domain (todos)
- **Services** - API integration layer
- **Hooks** - Custom React hooks for state management
- **Types** - TypeScript type definitions

### **Key Components**

#### **🔧 Core Components**

**`App.tsx`** - Main application component

```tsx
import MainLayout from "./components/layout/MainLayout";
import TodosSection from "./features/todos/TodosSection";

function App() {
  return (
    <MainLayout>
      <TodosSection />
    </MainLayout>
  );
}
```

**`MainLayout.tsx`** - Application layout wrapper

- Header with app title and branding
- Main content area with proper spacing
- Responsive design for all screen sizes

**`Header.tsx`** - Application header

- App title with icon
- Modern gradient design
- Responsive typography

#### **📝 Todo Components**

**`TodosSection.tsx`** - Main todo container

- Integrates all todo functionality
- Handles loading and error states
- Displays todo input and list

**`TodoInput.tsx`** - Task creation form

- Input field with validation
- Add button with hover effects
- Keyboard shortcuts (Enter to submit)

**`TodoList.tsx`** - Todo items container

- Maps through todo items
- Handles empty state display
- Responsive grid layout

**`TodoItem.tsx`** - Individual todo item

- Toggle completion checkbox
- Edit in-place functionality
- Delete button with confirmation
- Priority indicators
- Smooth animations

### **🔄 State Management**

**`useTodos.ts`** - Main todo hook

```typescript
export function useTodos() {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // API integration functions
  const onAddTask = async (title: string) => {
    /* ... */
  };
  const onDeleteTask = async (id: number) => {
    /* ... */
  };
  const onToggleTask = async (id: number) => {
    /* ... */
  };
  const onUpdateTask = async (id: number, title: string) => {
    /* ... */
  };

  return {
    todos: state.todos,
    isLoading: state.isLoading,
    error: state.error,
    onAddTask,
    onDeleteTask,
    onToggleTask,
    onUpdateTask,
  };
}
```

**`TodoReducer.ts`** - State reducer

- Manages todos array, loading state, and errors
- Handles API success/failure actions
- Immutable state updates

### **🌐 API Integration**

**`services/Api.ts`** - Backend API integration

```typescript
export const todoAPI = {
  getTasks: () => Promise<Task[]>
  createTask: (task) => Promise<Task>
  updateTask: (id, updates) => Promise<Task>
  toggleTask: (id) => Promise<Task>
  deleteTask: (id) => Promise<void>
}
```

**Features:**

- **Axios configuration** with base URL
- **Error handling** with user-friendly messages
- **TypeScript types** for all API responses
- **Loading states** during requests

### **🎨 Styling & UI**

**Tailwind CSS Configuration:**

- **Custom color palette** for dark theme
- **Responsive design** for mobile/desktop
- **Smooth animations** and transitions
- **Component utilities** for consistent spacing

**Key Design Elements:**

- **Dark theme** with gradient backgrounds
- **Card-based layout** for todo items
- **Color-coded priorities** (p1: red, p2: yellow, p3: green)
- **Interactive hover effects** on buttons
- **Loading spinners** and error messages
- **Icons** from Heroicons for visual enhancement

### **📱 Responsive Design**

- **Mobile-first** approach
- **Breakpoints:** sm (640px), md (768px), lg (1024px)
- **Flexible layouts** that adapt to screen size
- **Touch-friendly** buttons and interactions

### **♿ Accessibility**

- **ARIA labels** on interactive elements
- **Keyboard navigation** support
- **Screen reader** friendly structure
- **Color contrast** meeting WCAG guidelines

## 🔧 Backend Details

### **API Endpoints**

| Method | Endpoint                | Description       | Request Body                        | Response    |
| ------ | ----------------------- | ----------------- | ----------------------------------- | ----------- |
| GET    | `/api/tasks`            | Get all tasks     | -                                   | `Task[]`    |
| POST   | `/api/tasks`            | Create new task   | `{title, isCompleted?, priority?}`  | `Task`      |
| PUT    | `/api/tasks/:id`        | Update task       | `{title?, isCompleted?, priority?}` | `Task`      |
| PATCH  | `/api/tasks/:id/toggle` | Toggle completion | -                                   | `Task`      |
| DELETE | `/api/tasks/:id`        | Delete task       | -                                   | `{message}` |

### **Data Model**

```typescript
interface Task {
  id: number; // Unique identifier
  title: string; // Task description
  isCompleted: boolean; // Completion status
  priority: "p1" | "p2" | "p3"; // Priority level
  createdAt?: Date; // Creation timestamp
  updatedAt?: Date; // Last update timestamp
}
```

## 🔧 Development

### **Frontend Development**

```bash
cd frontend
npm start          # Start dev server with hot reload
npm run build      # Build for production
npm run lint       # Run ESLint
npm run lint:fix   # Fix linting issues
```

### **Backend Development**

```bash
cd backend
npm run build      # Build with webpack
npm start          # Start production server
npm run dev        # Start with nodemon (if configured)
```

### **Development Features**

- **Hot Module Replacement** (HMR) for instant updates
- **TypeScript compilation** with error checking
- **ESLint + Prettier** for code quality
- **Source maps** for debugging
- **Webpack Dev Server** with proxy support

## 📦 Build & Deploy

### **Frontend Production Build**

```bash
cd frontend
npm run build
```

**Output:** `frontend/dist/` folder with optimized static files

### **Backend Production Build**

```bash
cd backend
npm run build
```

**Output:** `backend/dist/server.js` - Single bundled file

### **Deployment Options**

- **Frontend:** Netlify, Vercel, GitHub Pages
- **Backend:** Heroku, Railway, DigitalOcean
- **Database:** MongoDB Atlas (recommended)

## 🧪 Testing (Future Enhancement)

- **Frontend:** Jest + React Testing Library
- **Backend:** Jest + Supertest
- **E2E:** Cypress or Playwright

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **React** team for the amazing framework
- **TypeScript** for type safety
- **Tailwind CSS** for utility-first styling
- **MongoDB** for flexible data storage

---

**Made with ❤️ using React + TypeScript + Express + MongoDB**
