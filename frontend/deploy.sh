#!/bin/bash

echo "🚀 Starting deployment process..."

echo "📦 Building backend..."
cd ../backend
npm install
npm run build

echo "📦 Building frontend..."
cd ../frontend
npm install
npm run build

echo "✅ Build completed!"
echo "📁 Backend: backend/dist/server.js"
echo "📁 Frontend: frontend/dist/"
echo "🎉 Ready for deployment!"