#!/bin/bash

# Script untuk kill proses Node.js yang pakai port 3001
# Gunakan script ini jika error "Port 3001 already in use"

clear

echo "========================================="
echo "  MEGA PERABOT - Kill Port 3001"
echo "========================================="
echo ""

# Warna
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "📌 Step 1: Mencari proses yang pakai port 3001..."

# Cek OS
if [[ "$OSTYPE" == "darwin"* ]]; then
    # Mac OS
    PID=$(lsof -ti:3001)
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    PID=$(lsof -ti:3001)
else
    echo -e "${RED}❌ OS tidak didukung oleh script ini${NC}"
    exit 1
fi

if [ -z "$PID" ]; then
    echo -e "${YELLOW}ℹ️  Port 3001 tidak digunakan oleh proses apapun${NC}"
    echo ""
    exit 0
fi

echo -e "${GREEN}✅ Ditemukan proses: PID $PID${NC}"
echo ""

echo "📌 Step 2: Membunuh proses $PID..."
kill -9 $PID

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Proses berhasil dibunuh!${NC}"
    echo -e "${GREEN}✅ Port 3001 sekarang tersedia${NC}"
    echo ""
    echo "Sekarang Anda bisa jalankan backend:"
    echo "  cd backend"
    echo "  npm start"
    echo ""
else
    echo -e "${RED}❌ Gagal membunuh proses!${NC}"
    echo -e "${YELLOW}💡 Coba jalankan dengan sudo:${NC}"
    echo "  sudo ./kill-port-3001.sh"
    echo ""
    exit 1
fi
