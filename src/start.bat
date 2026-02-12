@echo off
REM MEGA PERABOT - Startup Script untuk Windows
REM Script ini akan menjalankan backend dan frontend secara otomatis

cls

echo =========================================
echo.  MEGA PERABOT - Startup Script
echo =========================================
echo.

REM Step 1: Cek Node.js terinstall
echo [Step 1] Checking Node.js...
node -v >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js tidak terinstall!
    echo         Download dari: https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo [OK] Node.js terinstall: %NODE_VERSION%
echo.

REM Step 2: Cek folder backend
echo [Step 2] Checking backend folder...
if not exist "backend\" (
    echo [ERROR] Folder backend tidak ditemukan!
    echo         Pastikan Anda menjalankan script ini di root project
    pause
    exit /b 1
)
echo [OK] Folder backend ditemukan
echo.

REM Step 3: Install backend dependencies
echo [Step 3] Installing backend dependencies...
cd backend
if not exist "node_modules\" (
    echo         Installing packages...
    call npm install
    if errorlevel 1 (
        echo [ERROR] npm install failed!
        pause
        exit /b 1
    )
) else (
    echo [SKIP] node_modules sudah ada
)
echo [OK] Backend dependencies ready
echo.

REM Step 4: Cek database
echo [Step 4] Checking database...
if not exist "megaperabot.db" (
    echo         Database tidak ada, membuat database baru...
    call npm run init-db
    if errorlevel 1 (
        echo [ERROR] Database initialization failed!
        pause
        exit /b 1
    )
) else (
    echo [SKIP] Database sudah ada
)
echo [OK] Database ready
echo.

REM Step 5: Start backend server
echo [Step 5] Starting backend server...
echo         Backend akan jalan di http://localhost:3001
start "MEGA PERABOT Backend" cmd /k "npm start"
timeout /t 5 /nobreak >nul
echo [OK] Backend server started!
echo.

REM Step 6: Install frontend dependencies
echo [Step 6] Installing frontend dependencies...
cd ..
if not exist "node_modules\" (
    echo         Installing packages...
    call npm install
    if errorlevel 1 (
        echo [ERROR] npm install failed!
        pause
        exit /b 1
    )
) else (
    echo [SKIP] node_modules sudah ada
)
echo [OK] Frontend dependencies ready
echo.

REM Step 7: Start frontend server
echo [Step 7] Starting frontend server...
echo         Frontend akan jalan di http://localhost:3000
start "MEGA PERABOT Frontend" cmd /k "npm run dev"
timeout /t 5 /nobreak >nul
echo [OK] Frontend server started!
echo.

REM Success message
echo =========================================
echo.  MEGA PERABOT SUDAH JALAN!
echo =========================================
echo.
echo  Akses aplikasi:
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:3001
echo.
echo  Login dengan:
echo    Username: megaperabot
echo    Password: admin123
echo.
echo  Untuk stop server:
echo    Tutup window "MEGA PERABOT Backend" dan "MEGA PERABOT Frontend"
echo.
echo.

REM Open browser
timeout /t 3 /nobreak >nul
start http://localhost:3000

pause
