# 🚀 Deployment Guide

This document provides step-by-step instructions for deploying your Todo List application to various platforms.

## 📋 Prerequisites

- Node.js 18+ installed
- MongoDB database (MongoDB Atlas recommended)
- Git repository
- Account on chosen deployment platform

## 🎯 Deployment Options

### 1. **Heroku (Recommended for Backend)**

#### Backend Deployment on Heroku:

1. **Install Heroku CLI:**

   ```bash
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login to Heroku:**

   ```bash
   heroku login
   ```

3. **Create Heroku app:**

   ```bash
   cd backend
   heroku create your-todo-backend
   ```

4. **Set environment variables:**

   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGO_URI=your_mongodb_connection_string
   heroku config:set CORS_ORIGIN=https://your-frontend-domain.com
   ```

5. **Deploy:**
   ```bash
   git add .
   git commit -m "Deploy backend"
   git push heroku main
   ```

### 2. **Netlify (Recommended for Frontend)**

#### Frontend Deployment on Netlify:

1. **Build frontend locally:**

   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy via Netlify CLI:**

   ```bash
   npm install -g netlify-cli
   netlify login
   netlify deploy --prod --dir=dist
   ```

3. **Or deploy via Git:**
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `frontend/dist`

### 3. **Vercel (Full Stack)**

1. **Install Vercel CLI:**

   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel --prod
   ```

### 4. **Docker + DigitalOcean/AWS**

1. **Build and run with Docker:**

   ```bash
   docker-compose up --build -d
   ```

2. **Deploy to cloud provider using Docker images**

### 5. **Railway (Alternative)**

1. **Connect GitHub repository to Railway**
2. **Deploy backend and frontend as separate services**

## 🔧 Configuration Steps

### Environment Variables

**Backend (.env.production):**

```env
NODE_ENV=production
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
CORS_ORIGIN=https://your-frontend-domain.com
```

**Frontend:**
Update `src/services/Api.ts` with your backend URL:

```typescript
baseURL: "https://your-backend-domain.com/api";
```

### Database Setup

1. **MongoDB Atlas:**
   - Create account at mongodb.com
   - Create cluster and database
   - Get connection string
   - Update MONGO_URI in environment variables

### Domain Configuration

1. **Backend:** Update CORS_ORIGIN with frontend domain
2. **Frontend:** Update API baseURL with backend domain

## 🚦 Quick Deploy Script

Run the deployment preparation script:

**Windows:**

```bash
deploy.bat
```

**Linux/Mac:**

```bash
chmod +x deploy.sh
./deploy.sh
```

## 📝 Post-Deployment Checklist

- [ ] Backend is accessible at your domain
- [ ] Frontend loads correctly
- [ ] API calls work between frontend and backend
- [ ] Database connection is established
- [ ] CORS is properly configured
- [ ] Environment variables are set
- [ ] HTTPS is enabled

## 🔍 Testing Deployment

1. **Test API endpoints:**

   ```bash
   curl https://your-backend-domain.com/api/tasks
   ```

2. **Test frontend functionality:**
   - Create todo
   - Mark as complete
   - Delete todo
   - Check if data persists

## 🆘 Troubleshooting

**Common Issues:**

1. **CORS Errors:** Update CORS_ORIGIN in backend
2. **API Not Found:** Check frontend API baseURL
3. **Database Connection:** Verify MongoDB connection string
4. **Build Errors:** Check Node.js version compatibility

## 📱 Recommended Hosting Combinations

1. **Heroku (Backend) + Netlify (Frontend)**
2. **Railway (Backend) + Vercel (Frontend)**
3. **DigitalOcean (Docker) - Full Stack**
4. **AWS/GCP (Full Stack)**

Choose the combination that best fits your needs and budget!
