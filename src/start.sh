#!/bin/bash

# MEGA PERABOT - Startup Script untuk Windows/Mac/Linux
# Script ini akan menjalankan backend dan frontend secara otomatis

clear

echo "========================================="
echo "🚀 MEGA PERABOT - Startup Script"
echo "========================================="
echo ""

# Warna untuk output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Cek Node.js terinstall
echo "📌 Step 1: Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js tidak terinstall!${NC}"
    echo "   Download dari: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v)
echo -e "${GREEN}✅ Node.js terinstall: $NODE_VERSION${NC}"
echo ""

# Step 2: Cek folder backend
echo "📌 Step 2: Checking backend folder..."
if [ ! -d "backend" ]; then
    echo -e "${RED}❌ Folder backend tidak ditemukan!${NC}"
    echo "   Pastikan Anda menjalankan script ini di root project"
    exit 1
fi
echo -e "${GREEN}✅ Folder backend ditemukan${NC}"
echo ""

# Step 3: Install backend dependencies
echo "📌 Step 3: Installing backend dependencies..."
cd backend
if [ ! -d "node_modules" ]; then
    echo "   Installing packages..."
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ npm install failed!${NC}"
        exit 1
    fi
else
    echo -e "${YELLOW}⚠️  node_modules sudah ada, skip install${NC}"
fi
echo -e "${GREEN}✅ Backend dependencies ready${NC}"
echo ""

# Step 4: Cek database
echo "📌 Step 4: Checking database..."
if [ ! -f "megaperabot.db" ]; then
    echo "   Database tidak ada, membuat database baru..."
    npm run init-db
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Database initialization failed!${NC}"
        exit 1
    fi
else
    echo -e "${YELLOW}⚠️  Database sudah ada${NC}"
fi
echo -e "${GREEN}✅ Database ready${NC}"
echo ""

# Step 5: Test backend connection
echo "📌 Step 5: Testing backend connection..."
npm test &> /dev/null &
TEST_PID=$!
sleep 3
kill $TEST_PID 2>/dev/null

# Step 6: Start backend server
echo "📌 Step 6: Starting backend server..."
echo -e "${YELLOW}   Backend akan jalan di http://localhost:3001${NC}"
npm start &
BACKEND_PID=$!
echo "   Backend PID: $BACKEND_PID"
sleep 3

# Cek apakah backend jalan
if ps -p $BACKEND_PID > /dev/null; then
    echo -e "${GREEN}✅ Backend server started!${NC}"
else
    echo -e "${RED}❌ Backend failed to start!${NC}"
    exit 1
fi
echo ""

# Step 7: Install frontend dependencies
echo "📌 Step 7: Installing frontend dependencies..."
cd ..
if [ ! -d "node_modules" ]; then
    echo "   Installing packages..."
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ npm install failed!${NC}"
        kill $BACKEND_PID
        exit 1
    fi
else
    echo -e "${YELLOW}⚠️  node_modules sudah ada, skip install${NC}"
fi
echo -e "${GREEN}✅ Frontend dependencies ready${NC}"
echo ""

# Step 8: Start frontend server
echo "📌 Step 8: Starting frontend server..."
echo -e "${YELLOW}   Frontend akan jalan di http://localhost:3000${NC}"
npm run dev &
FRONTEND_PID=$!
echo "   Frontend PID: $FRONTEND_PID"
sleep 3

if ps -p $FRONTEND_PID > /dev/null; then
    echo -e "${GREEN}✅ Frontend server started!${NC}"
else
    echo -e "${RED}❌ Frontend failed to start!${NC}"
    kill $BACKEND_PID
    exit 1
fi
echo ""

# Success message
echo "========================================="
echo -e "${GREEN}🎉 MEGA PERABOT SUDAH JALAN!${NC}"
echo "========================================="
echo ""
echo "📱 Akses aplikasi:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:3001"
echo ""
echo "🔑 Login dengan:"
echo "   Username: megaperabot"
echo "   Password: admin123"
echo ""
echo "🛑 Untuk stop server:"
echo "   Tekan Ctrl+C di terminal ini"
echo "   Atau jalankan: kill $BACKEND_PID $FRONTEND_PID"
echo ""
echo "📊 Process IDs:"
echo "   Backend:  $BACKEND_PID"
echo "   Frontend: $FRONTEND_PID"
echo ""

# Wait for user to stop
wait
