@echo off
REM Script untuk kill proses Node.js yang pakai port 3001
REM Gunakan script ini jika error "Port 3001 already in use"

cls
echo =========================================
echo   MEGA PERABOT - Kill Port 3001
echo =========================================
echo.

echo [Step 1] Mencari proses yang pakai port 3001...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3001') do (
    set PID=%%a
)

if not defined PID (
    echo [INFO] Port 3001 tidak digunakan oleh proses apapun
    echo.
    pause
    exit /b 0
)

echo [FOUND] Proses ID: %PID%
echo.

echo [Step 2] Membunuh proses %PID%...
taskkill /F /PID %PID% >nul 2>&1

if errorlevel 1 (
    echo [ERROR] Gagal membunuh proses!
    echo [TIP] Coba jalankan script ini sebagai Administrator
    echo.
    pause
    exit /b 1
)

echo [OK] Proses berhasil dibunuh!
echo [OK] Port 3001 sekarang tersedia
echo.
echo Sekarang Anda bisa jalankan backend:
echo   cd backend
echo   npm start
echo.

pause
