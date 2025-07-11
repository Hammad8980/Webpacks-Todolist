@echo off
echo 🚀 Starting deployment process...

echo 📦 Building backend...
cd backend
call npm install
call npm run build

echo 📦 Building frontend...
cd ..\frontend
call npm install
call npm run build

echo ✅ Build completed successfully!
echo 📁 Backend build: backend\dist\
echo 📁 Frontend build: frontend\dist\

echo 🎉 Deployment preparation complete!
