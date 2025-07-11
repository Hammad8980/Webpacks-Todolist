#!/bin/bash

# Deploy Todo List Application

echo "🚀 Starting deployment process..."

# Build backend
echo "📦 Building backend..."
cd backend
npm install --production
npm run build

# Build frontend
echo "📦 Building frontend..."
cd ../frontend
npm install --production
npm run build

echo "✅ Build completed successfully!"
echo "📁 Backend build: backend/dist/"
echo "📁 Frontend build: frontend/dist/"

# Optional: Copy files to deployment directory
# mkdir -p deploy
# cp -r backend/dist deploy/backend
# cp -r frontend/dist deploy/frontend
# cp backend/package.json deploy/backend/
# cp backend/.env.production deploy/backend/.env

echo "🎉 Deployment preparation complete!"
