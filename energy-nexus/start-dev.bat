@echo off
echo Starting Energy Nexus Development Environment...
echo.

echo Step 1: Starting Backend Server on port 5000
cd backend
start "Backend Server" cmd /k "npm run dev"
timeout /t 3 /nobreak > nul

echo Step 2: Checking if backend is running...
curl -s http://localhost:5000/health > nul
if %errorlevel% neq 0 (
    echo ERROR: Backend is not responding. Please check if port 5000 is available.
    pause
    exit /b 1
)
echo Backend is running successfully!

echo.
echo Step 3: Starting Frontend Server
cd ../frontend
start "Frontend Server" cmd /k "npm run dev"

echo.
echo Both servers are starting...
echo.
echo Frontend will be available at: http://localhost:5173
echo Backend API available at: http://localhost:5000
echo.
echo Login Credentials:
echo PowerPool: PowerPool@energynexus.com / powerpool@login
echo Vivek: vivek@example.com / hello@123
echo Phone login also supported with: 8840776158
echo.
pause
