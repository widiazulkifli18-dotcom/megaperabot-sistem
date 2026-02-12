#!/bin/bash

# ========================================
# SCRIPT AUTO-GENERATE BACKEND MEGA PERABOT
# ========================================
# Jalankan dengan: bash generate-backend.sh
# ========================================

echo "╔═══════════════════════════════════════════════════════╗"
echo "║   MEGA PERABOT - AUTO BACKEND GENERATOR              ║"
echo "╠═══════════════════════════════════════════════════════╣"
echo "║  📦 Generating backend files...                       ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""

# Buat folder utama
BACKEND_DIR="megaperabot-backend"

if [ -d "$BACKEND_DIR" ]; then
  echo "⚠️  Folder $BACKEND_DIR sudah ada!"
  read -p "Hapus dan buat ulang? (y/n): " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    rm -rf "$BACKEND_DIR"
  else
    echo "❌ Dibatalkan."
    exit 1
  fi
fi

mkdir -p "$BACKEND_DIR"/{config,routes,middleware}
cd "$BACKEND_DIR"

echo "✅ Folder structure created"

# ========================================
# FILE 1: package.json
# ========================================
cat > package.json << 'EOF'
{
  "name": "megaperabot-backend",
  "version": "1.0.0",
  "description": "Backend API untuk Sistem Manajemen Stok MEGA PERABOT",
  "type": "module",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "keywords": ["api", "sqlite", "express", "mega-perabot"],
  "author": "MEGA PERABOT Team",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "sqlite3": "^5.1.7",
    "dotenv": "^16.4.5"
  },
  "devDependencies": {
    "nodemon": "^3.0.3"
  }
}
EOF

echo "✅ package.json created"

# ========================================
# FILE 2: .env
# ========================================
cat > .env << 'EOF'
PORT=3001
NODE_ENV=development
DB_PATH=./megaperabot.db
CORS_ORIGINS=http://localhost:5173,https://v0.app,https://figma.com,https://*.figma.com
API_PREFIX=/api
EOF

echo "✅ .env created"

# ========================================
# FILE 3: .gitignore
# ========================================
cat > .gitignore << 'EOF'
node_modules/
package-lock.json
.env
.env.local
*.log
.DS_Store
Thumbs.db
EOF

echo "✅ .gitignore created"

# ========================================
# FILE 4: server.js
# ========================================
cat > server.js << 'EOF'
import express from 'express';
import dotenv from 'dotenv';
import { corsMiddleware } from './middleware/cors.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import transactionRoutes from './routes/transactions.js';
import supplierOrderRoutes from './routes/supplierOrders.js';
import restockRoutes from './routes/restock.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const API_PREFIX = process.env.API_PREFIX || '/api';

app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/products`, productRoutes);
app.use(`${API_PREFIX}/transactions`, transactionRoutes);
app.use(`${API_PREFIX}/supplier-orders`, supplierOrderRoutes);
app.use(`${API_PREFIX}/restock`, restockRoutes);

app.get(`${API_PREFIX}/health`, (req, res) => {
  res.json({
    status: 'OK',
    message: 'MEGA PERABOT API is running',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to MEGA PERABOT API',
    version: '1.0.0'
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log('╔═══════════════════════════════════════════════════════╗');
  console.log('║         MEGA PERABOT - BACKEND API SERVER            ║');
  console.log('╠═══════════════════════════════════════════════════════╣');
  console.log(`║  ✅ Server running on: http://localhost:${PORT}         ║`);
  console.log(`║  ✅ Environment: ${(process.env.NODE_ENV || 'development').toUpperCase()}                           ║`);
  console.log(`║  ✅ API Prefix: ${API_PREFIX}                                ║`);
  console.log('╚═══════════════════════════════════════════════════════╝');
});
EOF

echo "✅ server.js created"

# ========================================
# FILE 5: config/database.js
# ========================================
cat > config/database.js << 'EOF'
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = process.env.DB_PATH || join(__dirname, '..', 'megaperabot.db');

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error('❌ Error connecting to database:', err.message);
    process.exit(1);
  } else {
    console.log('✅ Connected to SQLite database');
  }
});

db.run('PRAGMA foreign_keys = ON');

export const query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

export const get = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

export const run = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
};

export default db;
EOF

echo "✅ config/database.js created"

# ========================================
# FILE 6: middleware/cors.js
# ========================================
cat > middleware/cors.js << 'EOF'
import cors from 'cors';

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = process.env.CORS_ORIGINS 
      ? process.env.CORS_ORIGINS.split(',').map(o => o.trim())
      : ['http://localhost:5173', 'http://localhost:3000'];
    
    if (!origin) return callback(null, true);
    
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (allowedOrigin.includes('*')) {
        const regex = new RegExp(allowedOrigin.replace('*', '.*'));
        return regex.test(origin);
      }
      return allowedOrigin === origin;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.warn('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

export const corsMiddleware = cors(corsOptions);
EOF

echo "✅ middleware/cors.js created"

# ========================================
# FILE 7: routes/auth.js
# ========================================
cat > routes/auth.js << 'EOF'
import express from 'express';
import { get, query } from '../config/database.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username dan password harus diisi' });
    }
    
    const sql = `
      SELECT user_id, username, name, role 
      FROM users 
      WHERE username = ? AND password = ?
    `;
    
    const user = await get(sql, [username, password]);
    
    if (!user) {
      return res.status(401).json({ error: 'Username atau password salah' });
    }
    
    res.json({
      message: 'Login berhasil',
      user: {
        id: user.user_id,
        username: user.username,
        name: user.name,
        role: user.role
      }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat login' });
  }
});

export default router;
EOF

echo "✅ routes/auth.js created"

# ========================================
# FILE 8: routes/products.js
# ========================================
cat > routes/products.js << 'EOF'
import express from 'express';
import { query, get } from '../config/database.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const sql = `
      SELECT 
        p.*,
        COALESCE(SUM(t.quantity), 0) as jumlah_terjual,
        COALESCE(SUM(t.quantity * p.harga_jual), 0) as total_penjualan
      FROM products p
      LEFT JOIN transactions t ON p.product_id = t.product_id
      GROUP BY p.product_id
      ORDER BY p.kode_barang ASC
    `;
    
    const products = await query(sql);
    res.json(products);
    
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data produk' });
  }
});

export default router;
EOF

echo "✅ routes/products.js created"

# ========================================
# FILE 9: routes/transactions.js
# ========================================
cat > routes/transactions.js << 'EOF'
import express from 'express';
import { query, get, run } from '../config/database.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const sql = `
      SELECT 
        t.*,
        p.kode_barang,
        p.nama_barang,
        p.harga_jual,
        (t.quantity * p.harga_jual) as subtotal,
        u.name as created_by_name
      FROM transactions t
      JOIN products p ON t.product_id = p.product_id
      JOIN users u ON t.created_by = u.user_id
      ORDER BY t.transaction_date DESC
    `;
    
    const transactions = await query(sql);
    res.json(transactions);
    
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data transaksi' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { product_id, quantity, payment_method, transaction_date, created_by } = req.body;
    
    if (!product_id || !quantity || !payment_method || !transaction_date || !created_by) {
      return res.status(400).json({ error: 'Semua field harus diisi' });
    }
    
    const product = await get('SELECT * FROM products WHERE product_id = ?', [product_id]);
    if (!product) {
      return res.status(404).json({ error: 'Produk tidak ditemukan' });
    }
    
    if (product.stok_akhir < quantity) {
      return res.status(400).json({ error: 'Stok tidak mencukupi' });
    }
    
    const date = new Date(transaction_date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    const lastTrx = await get(
      `SELECT transaction_code FROM transactions 
       WHERE transaction_code LIKE ? 
       ORDER BY transaction_code DESC LIMIT 1`,
      [`TRX-${year}${month}${day}%`]
    );
    
    let nextNum = 1;
    if (lastTrx) {
      const lastNum = parseInt(lastTrx.transaction_code.slice(-4));
      nextNum = lastNum + 1;
    }
    
    const transaction_code = `TRX-${year}${month}${day}${String(nextNum).padStart(4, '0')}`;
    
    const sql = `
      INSERT INTO transactions (transaction_code, product_id, quantity, payment_method, transaction_date, created_by)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    const result = await run(sql, [transaction_code, product_id, quantity, payment_method, transaction_date, created_by]);
    
    await run('UPDATE products SET stok_akhir = stok_akhir - ? WHERE product_id = ?', [quantity, product_id]);
    
    res.status(201).json({
      message: 'Transaksi berhasil dibuat',
      transaction_id: result.lastID,
      transaction_code
    });
    
  } catch (error) {
    console.error('Create transaction error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat membuat transaksi' });
  }
});

export default router;
EOF

echo "✅ routes/transactions.js created"

# ========================================
# FILE 10: routes/supplierOrders.js
# ========================================
cat > routes/supplierOrders.js << 'EOF'
import express from 'express';
import { query, get, run } from '../config/database.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const sql = `
      SELECT 
        so.*,
        p.kode_barang,
        p.nama_barang,
        p.harga_beli,
        (so.quantity * p.harga_beli) as total_cost,
        u.name as created_by_name
      FROM supplier_orders so
      JOIN products p ON so.product_id = p.product_id
      JOIN users u ON so.created_by = u.user_id
      ORDER BY so.order_date DESC
    `;
    
    const orders = await query(sql);
    res.json(orders);
    
  } catch (error) {
    console.error('Get supplier orders error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data pesanan pemasok' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { product_id, quantity, supplier, order_date, created_by } = req.body;
    
    if (!product_id || !quantity || !supplier || !order_date || !created_by) {
      return res.status(400).json({ error: 'Semua field harus diisi' });
    }
    
    const product = await get('SELECT * FROM products WHERE product_id = ?', [product_id]);
    if (!product) {
      return res.status(404).json({ error: 'Produk tidak ditemukan' });
    }
    
    const date = new Date(order_date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    
    const lastOrder = await get(
      `SELECT order_code FROM supplier_orders 
       WHERE order_code LIKE ? 
       ORDER BY order_code DESC LIMIT 1`,
      [`PO-${year}${month}%`]
    );
    
    let nextNum = 1;
    if (lastOrder) {
      const lastNum = parseInt(lastOrder.order_code.slice(-4));
      nextNum = lastNum + 1;
    }
    
    const order_code = `PO-${year}${month}${String(nextNum).padStart(4, '0')}`;
    
    const sql = `
      INSERT INTO supplier_orders (order_code, product_id, quantity, supplier, order_date, created_by)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    const result = await run(sql, [order_code, product_id, quantity, supplier, order_date, created_by]);
    
    res.status(201).json({
      message: 'Pesanan pemasok berhasil dibuat',
      order_id: result.lastID,
      order_code
    });
    
  } catch (error) {
    console.error('Create supplier order error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat membuat pesanan pemasok' });
  }
});

export default router;
EOF

echo "✅ routes/supplierOrders.js created"

# ========================================
# FILE 11: routes/restock.js
# ========================================
cat > routes/restock.js << 'EOF'
import express from 'express';
import { query, get, run } from '../config/database.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const sql = `
      SELECT 
        r.*,
        p.kode_barang,
        p.nama_barang,
        p.harga_beli,
        (r.quantity * p.harga_beli) as total_cost,
        u.name as created_by_name
      FROM restock r
      JOIN products p ON r.product_id = p.product_id
      JOIN users u ON r.created_by = u.user_id
      ORDER BY r.restock_date DESC
    `;
    
    const restocks = await query(sql);
    res.json(restocks);
    
  } catch (error) {
    console.error('Get restock error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data restock' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { product_id, quantity, restock_date, notes, created_by } = req.body;
    
    if (!product_id || !quantity || !restock_date || !created_by) {
      return res.status(400).json({ error: 'Semua field wajib harus diisi' });
    }
    
    const product = await get('SELECT * FROM products WHERE product_id = ?', [product_id]);
    if (!product) {
      return res.status(404).json({ error: 'Produk tidak ditemukan' });
    }
    
    const sql = `
      INSERT INTO restock (product_id, quantity, restock_date, notes, created_by)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    const result = await run(sql, [product_id, quantity, restock_date, notes || null, created_by]);
    
    await run('UPDATE products SET stok_akhir = stok_akhir + ? WHERE product_id = ?', [quantity, product_id]);
    
    res.status(201).json({
      message: 'Restock berhasil dibuat',
      restock_id: result.lastID,
      new_stock: product.stok_akhir + quantity
    });
    
  } catch (error) {
    console.error('Create restock error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat membuat restock' });
  }
});

export default router;
EOF

echo "✅ routes/restock.js created"

# ========================================
# SELESAI!
# ========================================
echo ""
echo "╔═══════════════════════════════════════════════════════╗"
echo "║  ✅ BACKEND FILES GENERATED SUCCESSFULLY!            ║"
echo "╠═══════════════════════════════════════════════════════╣"
echo "║  📁 Location: ./$BACKEND_DIR/                         ║"
echo "╠═══════════════════════════════════════════════════════╣"
echo "║  NEXT STEPS:                                          ║"
echo "║  1. cd $BACKEND_DIR                             ║"
echo "║  2. npm install                                       ║"
echo "║  3. Copy file megaperabot.db ke folder ini            ║"
echo "║  4. npm start                                         ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""

# Buat README
cat > README.md << 'EOF'
# MEGA PERABOT - Backend API

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Copy Database
Copy file `megaperabot.db` dari DB Browser ke folder ini

### 3. Run Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

### 4. Test API
Open browser: http://localhost:3001/api/health

## Available Endpoints

- `POST /api/auth/login` - Login
- `GET /api/products` - Get all products
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create transaction
- `GET /api/supplier-orders` - Get supplier orders
- `POST /api/supplier-orders` - Create supplier order
- `GET /api/restock` - Get restock history
- `POST /api/restock` - Create restock

## Environment Variables

Create `.env` file (already generated):
```
PORT=3001
NODE_ENV=development
DB_PATH=./megaperabot.db
CORS_ORIGINS=http://localhost:5173,https://v0.app
API_PREFIX=/api
```

## Test Accounts

- Admin: `megaperabot` / `admin123`
- Karyawan Toko: `karyawan01` / `toko123`
- Karyawan Gudang: `staffgudang01` / `gudang123`
EOF

echo "✅ README.md created"
echo ""
echo "🎉 Done! Backend siap digunakan!"
