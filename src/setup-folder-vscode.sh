#!/bin/bash

# Script untuk setup struktur folder VSCode otomatis
# Untuk MEGA PERABOT - Sistem Manajemen Stok & Pemesanan

echo "🚀 MEGA PERABOT - Setup Folder VSCode"
echo "======================================="
echo ""

# Cek apakah di folder yang benar
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json tidak ditemukan!"
    echo "   Pastikan Anda menjalankan script ini di folder megaperabot-frontend/"
    exit 1
fi

echo "✅ package.json ditemukan"
echo ""

# 1. Buat folder src jika belum ada
if [ ! -d "src" ]; then
    echo "📁 Membuat folder src/..."
    mkdir src
    echo "✅ Folder src/ berhasil dibuat"
else
    echo "✅ Folder src/ sudah ada"
fi

echo ""

# 2. Pindahkan file-file ke src/
echo "📦 Memindahkan file ke src/..."

# Array of files and folders to move
items=(
    "App.tsx"
    "main.tsx"
    "components"
    "pages"
    "context"
    "services"
    "types"
    "hooks"
    "styles"
)

for item in "${items[@]}"; do
    if [ -e "$item" ]; then
        echo "   Moving $item..."
        mv "$item" src/
        echo "   ✅ $item berhasil dipindahkan"
    else
        echo "   ⚠️  $item tidak ditemukan (mungkin sudah dipindahkan)"
    fi
done

echo ""

# 3. Update index.html
echo "📝 Mengupdate index.html..."

if [ -f "index.html" ]; then
    # Backup original
    cp index.html index.html.backup
    
    # Replace /main.tsx with /src/main.tsx
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' 's|src="/main.tsx"|src="/src/main.tsx"|g' index.html
    else
        # Linux
        sed -i 's|src="/main.tsx"|src="/src/main.tsx"|g' index.html
    fi
    
    echo "✅ index.html berhasil diupdate"
    echo "   Backup saved as index.html.backup"
else
    echo "❌ index.html tidak ditemukan!"
fi

echo ""

# 4. Verifikasi struktur
echo "🔍 Verifikasi struktur folder..."
echo ""

if [ -d "src" ]; then
    echo "✅ src/ exists"
    
    # Check important files
    [ -f "src/App.tsx" ] && echo "   ✅ src/App.tsx" || echo "   ❌ src/App.tsx not found"
    [ -f "src/main.tsx" ] && echo "   ✅ src/main.tsx" || echo "   ❌ src/main.tsx not found"
    [ -d "src/components" ] && echo "   ✅ src/components/" || echo "   ❌ src/components/ not found"
    [ -d "src/pages" ] && echo "   ✅ src/pages/" || echo "   ❌ src/pages/ not found"
    [ -d "src/context" ] && echo "   ✅ src/context/" || echo "   ❌ src/context/ not found"
    [ -d "src/services" ] && echo "   ✅ src/services/" || echo "   ❌ src/services/ not found"
fi

echo ""

# Check root files
echo "📄 File di root:"
[ -f "index.html" ] && echo "   ✅ index.html" || echo "   ❌ index.html not found"
[ -f "package.json" ] && echo "   ✅ package.json" || echo "   ❌ package.json not found"
[ -f "vite.config.ts" ] && echo "   ✅ vite.config.ts" || echo "   ❌ vite.config.ts not found"

echo ""
echo "======================================="
echo "✅ Setup selesai!"
echo ""
echo "📝 Next steps:"
echo "   1. npm install"
echo "   2. npm run dev"
echo "   3. Buka http://localhost:5173"
echo "   4. Login: megaperabot / admin123"
echo ""
echo "🎉 Selamat! Aplikasi siap dijalankan!"
