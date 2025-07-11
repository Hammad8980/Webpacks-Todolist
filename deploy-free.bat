@echo off
echo 🆓 FREE DEPLOYMENT GUIDE - No Heroku Needed!

echo.
echo ✅ 100%% FREE Backend Options:
echo.
echo 1. Railway (Recommended)
echo    - Go to: https://railway.app
echo    - Sign up with GitHub
echo    - $5 monthly credit (free for small apps)
echo    - Deploy from GitHub repo
echo.
echo 2. Render 
echo    - Go to: https://render.com
echo    - Free tier available
echo    - Deploy from GitHub
echo.
echo 3. Vercel
echo    - Go to: https://vercel.com
echo    - Deploy from GitHub
echo    - Supports Node.js backend
echo.
echo 4. Cyclic
echo    - Go to: https://app.cyclic.sh
echo    - Completely free
echo    - Easy GitHub integration
echo.

echo 📦 Preparing builds for FREE deployment...
echo.

REM Build backend
echo Building backend...
cd backend
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Backend build failed
    pause
    exit /b 1
)

REM Build frontend  
echo Building frontend...
cd ..\frontend
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Frontend build failed
    pause
    exit /b 1
)

cd ..

echo.
echo ✅ Builds completed successfully!
echo.
echo 📁 Files ready for FREE deployment:
echo    - Backend: backend\dist\server.js
echo    - Frontend: frontend\dist\ (folder)
echo.
echo 🎯 RECOMMENDED FREE PATH:
echo.
echo 1. BACKEND on Railway:
echo    ├─ Go to https://railway.app
echo    ├─ New Project → Deploy from GitHub
echo    ├─ Select backend folder
echo    ├─ Add environment variables:
echo    │  ├─ NODE_ENV=production
echo    │  ├─ MONGO_URI=your_mongo_connection
echo    │  └─ CORS_ORIGIN=*
echo    └─ Get your Railway URL
echo.
echo 2. FRONTEND on Netlify:
echo    ├─ Go to https://netlify.com
echo    ├─ Drag frontend\dist folder
echo    ├─ Update API URL in code
echo    └─ Redeploy
echo.
echo 🎉 Total cost: $0.00 - Completely FREE!
echo.
echo 📚 Need help? Check DEPLOY_NOW.md for detailed steps.
echo.
pause
