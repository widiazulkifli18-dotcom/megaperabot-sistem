#!/bin/bash

# ========================================
# MEGA PERABOT - VSCODE SETUP HELPER
# ========================================
# Script ini membantu setup project di VSCode
# ========================================

echo "╔═══════════════════════════════════════════════════════╗"
echo "║   MEGA PERABOT - VSCODE SETUP HELPER                 ║"
echo "╠═══════════════════════════════════════════════════════╣"
echo "║  Setup frontend & backend untuk development          ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""

# Check current directory
CURRENT_DIR=$(pwd)
echo "📁 Current directory: $CURRENT_DIR"
echo ""

# ========================================
# STEP 1: Setup Frontend
# ========================================
echo "╔═══════════════════════════════════════════════════════╗"
echo "║  STEP 1: Setup Frontend                               ║"
echo "╚═══════════════════════════════════════════════════════╝"

if [ ! -f "package.json" ]; then
  echo "⚠️  package.json tidak ditemukan!"
  echo "📝 Membuat package.json untuk frontend..."
  
  cat > package.json << 'EOF'
{
  "name": "megaperabot-frontend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.28.0",
    "lucide-react": "^0.460.0",
    "sonner": "^1.7.1",
    "recharts": "^2.15.0",
    "motion": "^11.15.0",
    "@radix-ui/react-dialog": "^1.1.4",
    "@radix-ui/react-dropdown-menu": "^2.1.4",
    "@radix-ui/react-label": "^2.1.1",
    "@radix-ui/react-popover": "^1.1.4",
    "@radix-ui/react-select": "^2.1.4",
    "@radix-ui/react-separator": "^1.1.1",
    "@radix-ui/react-slot": "^1.1.1",
    "@radix-ui/react-tabs": "^1.1.1",
    "@radix-ui/react-toast": "^1.2.4",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.7.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "@vitejs/plugin-react": "^4.3.4",
    "typescript": "^5.7.3",
    "vite": "^6.0.7",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/vite": "^4.0.0"
  }
}
EOF
  
  echo "✅ package.json created"
else
  echo "✅ package.json already exists"
fi

# Fix React Router imports for VSCode
echo ""
echo "🔧 Fixing React Router imports..."

# Function to replace react-router with react-router-dom
fix_imports() {
  if [ -f "$1" ]; then
    sed -i.bak "s/from 'react-router'/from 'react-router-dom'/g" "$1" 2>/dev/null || \
    sed -i "" "s/from 'react-router'/from 'react-router-dom'/g" "$1" 2>/dev/null
    rm -f "$1.bak"
    echo "  ✅ Fixed: $1"
  fi
}

fix_imports "App.tsx"
fix_imports "src/App.tsx"
fix_imports "components/ProtectedRoute.tsx"
fix_imports "src/components/ProtectedRoute.tsx"
fix_imports "components/Layout.tsx"
fix_imports "src/components/Layout.tsx"
fix_imports "pages/Login.tsx"
fix_imports "src/pages/Login.tsx"
fix_imports "pages/Unauthorized.tsx"
fix_imports "src/pages/Unauthorized.tsx"

echo "✅ React Router imports fixed for VSCode"

# Install frontend dependencies
echo ""
read -p "📦 Install frontend dependencies? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "⏳ Installing frontend dependencies..."
  npm install
  echo "✅ Frontend dependencies installed"
else
  echo "⏭️  Skipped npm install"
fi

# ========================================
# STEP 2: Setup Backend
# ========================================
echo ""
echo "╔═══════════════════════════════════════════════════════╗"
echo "║  STEP 2: Setup Backend                                ║"
echo "╚═══════════════════════════════════════════════════════╝"

if [ -f "generate-backend.sh" ]; then
  read -p "🚀 Generate backend now? (y/n): " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    bash generate-backend.sh
  else
    echo "⏭️  Backend generation skipped"
  fi
else
  echo "⚠️  generate-backend.sh not found in current directory"
  echo "💡 Make sure you're in the correct folder"
fi

# ========================================
# STEP 3: Configuration Guide
# ========================================
echo ""
echo "╔═══════════════════════════════════════════════════════╗"
echo "║  STEP 3: Configuration                                ║"
echo "╚═══════════════════════════════════════════════════════╝"

echo ""
echo "📝 IMPORTANT: Update api.ts configuration"
echo ""
echo "File: services/api.ts (or src/services/api.ts)"
echo ""
echo "Change line 7:"
echo "  ❌ const USE_MOCK_DATA = true;"
echo "  ✅ const USE_MOCK_DATA = false;"
echo ""
echo "This will connect frontend to real backend API."
echo ""

# ========================================
# STEP 4: Database Setup
# ========================================
echo "╔═══════════════════════════════════════════════════════╗"
echo "║  STEP 4: Database Setup                               ║"
echo "╚═══════════════════════════════════════════════════════╝"

if [ -d "megaperabot-backend" ]; then
  echo ""
  echo "📋 Copy your megaperabot.db file to:"
  echo "   megaperabot-backend/megaperabot.db"
  echo ""
  
  read -p "📂 Do you have megaperabot.db file? Enter path (or press Enter to skip): " DB_PATH
  
  if [ -n "$DB_PATH" ] && [ -f "$DB_PATH" ]; then
    cp "$DB_PATH" "megaperabot-backend/megaperabot.db"
    echo "✅ Database copied successfully!"
  elif [ -n "$DB_PATH" ]; then
    echo "❌ File not found: $DB_PATH"
  else
    echo "⏭️  Database setup skipped"
  fi
fi

# ========================================
# FINAL SUMMARY
# ========================================
echo ""
echo "╔═══════════════════════════════════════════════════════╗"
echo "║  ✅ SETUP COMPLETE!                                   ║"
echo "╠═══════════════════════════════════════════════════════╣"
echo "║  Next Steps:                                          ║"
echo "╠═══════════════════════════════════════════════════════╣"
echo "║  BACKEND:                                             ║"
echo "║  1. cd megaperabot-backend                            ║"
echo "║  2. npm install                                       ║"
echo "║  3. Copy megaperabot.db to this folder                ║"
echo "║  4. npm start                                         ║"
echo "║                                                       ║"
echo "║  FRONTEND:                                            ║"
echo "║  1. Update api.ts: USE_MOCK_DATA = false              ║"
echo "║  2. npm run dev                                       ║"
echo "║                                                       ║"
echo "║  TEST:                                                ║"
echo "║  Open http://localhost:5173                           ║"
echo "║  Login: megaperabot / admin123                        ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""

# Create quick start scripts
echo "📝 Creating quick start scripts..."

# Start backend script
cat > start-backend.sh << 'EOF'
#!/bin/bash
echo "🚀 Starting MEGA PERABOT Backend..."
cd megaperabot-backend
npm start
EOF

chmod +x start-backend.sh
echo "✅ Created: start-backend.sh"

# Start frontend script
cat > start-frontend.sh << 'EOF'
#!/bin/bash
echo "🚀 Starting MEGA PERABOT Frontend..."
npm run dev
EOF

chmod +x start-frontend.sh
echo "✅ Created: start-frontend.sh"

# Start both script
cat > start-all.sh << 'EOF'
#!/bin/bash
echo "🚀 Starting MEGA PERABOT - Frontend & Backend..."
echo ""

# Start backend in background
echo "📡 Starting backend..."
cd megaperabot-backend
npm start &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 3

# Start frontend
echo "🎨 Starting frontend..."
npm run dev

# Cleanup on exit
trap "kill $BACKEND_PID" EXIT
EOF

chmod +x start-all.sh
echo "✅ Created: start-all.sh"

echo ""
echo "🎯 Quick start commands created:"
echo "   ./start-backend.sh  - Start backend only"
echo "   ./start-frontend.sh - Start frontend only"
echo "   ./start-all.sh      - Start both (recommended)"
echo ""
echo "🎉 Done! Happy coding!"
