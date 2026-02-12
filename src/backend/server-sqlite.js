const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const dbPath = path.join(__dirname, 'megaperabot.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error connecting to database:', err.message);
    process.exit(1);
  }
  console.log('✅ Connected to SQLite database:', dbPath);
});

// Helper function: Map database role to frontend role
function mapRoleToFrontend(dbRole) {
  const roleMap = {
    'admin': 'Admin',
    'gudang': 'Karyawan Gudang',
    'toko': 'Karyawan Toko'
  };
  return roleMap[dbRole] || dbRole;
}

// ==================== HEALTH CHECK ====================
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    database: 'connected', 
    timestamp: new Date().toISOString() 
  });
});

// ==================== AUTH ENDPOINTS ====================
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ 
      success: false, 
      error: 'Username dan password harus diisi' 
    });
  }

  // Query sesuai dengan schema database-sqlite.sql
  const query = `
    SELECT id, username, name, role 
    FROM users 
    WHERE username = ? AND password = ?
  `;

  db.get(query, [username, password], (err, user) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ 
        success: false, 
        error: 'Database error' 
      });
    }

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        error: 'Username atau password salah' 
      });
    }

    // Map role ke format yang diharapkan frontend
    const frontendRole = mapRoleToFrontend(user.role);

    res.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        fullName: user.name,  // 'name' dari DB → 'fullName' untuk frontend
        role: frontendRole     // 'admin' → 'Admin', 'toko' → 'Karyawan Toko', dll
      }
    });
  });
});

// ==================== PRODUCTS ENDPOINTS ====================
app.get('/api/products', (req, res) => {
  const query = `
    SELECT 
      kode_barang,
      nama_barang,
      kategori,
      stok_akhir,
      harga_beli,
      harga_jual,
      pemasok,
      jumlah_terjual,
      penjualan,
      keuntungan
    FROM products 
    ORDER BY nama_barang
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.get('/api/products/:kode_barang', (req, res) => {
  const { kode_barang } = req.params;

  const query = `
    SELECT * FROM products 
    WHERE kode_barang = ?
  `;

  db.get(query, [kode_barang], (err, row) => {
    if (err) {
      console.error('Error fetching product:', err);
      return res.status(500).json({ error: err.message });
    }

    if (!row) {
      return res.status(404).json({ error: 'Produk tidak ditemukan' });
    }

    res.json(row);
  });
});

// CREATE - Add new product
app.post('/api/products', (req, res) => {
  const { kode_barang, nama_barang, kategori, harga_beli, harga_jual, stok_akhir, pemasok } = req.body;

  // Validasi
  if (!kode_barang || !nama_barang) {
    return res.status(400).json({ error: 'Kode barang dan nama barang harus diisi' });
  }

  if (harga_beli <= 0 || harga_jual <= 0) {
    return res.status(400).json({ error: 'Harga beli dan harga jual harus lebih dari 0' });
  }

  // Check if product already exists
  db.get('SELECT kode_barang FROM products WHERE kode_barang = ?', [kode_barang], (err, row) => {
    if (err) {
      console.error('Error checking product:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (row) {
      return res.status(400).json({ error: 'Kode barang sudah digunakan' });
    }

    // Insert new product
    const query = `
      INSERT INTO products (
        kode_barang, nama_barang, kategori, harga_beli, harga_jual, 
        stok_awal, stok_akhir, pemasok, jumlah_terjual, penjualan, keuntungan
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, 0, 0)
    `;

    db.run(query, [
      kode_barang, 
      nama_barang, 
      kategori || 'Alat Kebersihan', 
      harga_beli, 
      harga_jual, 
      stok_akhir || 0,
      stok_akhir || 0,
      pemasok || '-'
    ], function(err) {
      if (err) {
        console.error('Error creating product:', err);
        return res.status(500).json({ error: 'Gagal menambahkan produk' });
      }

      res.json({ 
        success: true, 
        message: 'Produk berhasil ditambahkan',
        kode_barang 
      });
    });
  });
});

// UPDATE - Update product
app.put('/api/products/:kode_barang', (req, res) => {
  const { kode_barang } = req.params;
  const { nama_barang, kategori, harga_beli, harga_jual, stok_akhir, pemasok } = req.body;

  // Validasi
  if (!nama_barang) {
    return res.status(400).json({ error: 'Nama barang harus diisi' });
  }

  if (harga_beli <= 0 || harga_jual <= 0) {
    return res.status(400).json({ error: 'Harga beli dan harga jual harus lebih dari 0' });
  }

  const query = `
    UPDATE products 
    SET 
      nama_barang = ?,
      kategori = ?,
      harga_beli = ?,
      harga_jual = ?,
      stok_akhir = ?,
      pemasok = ?
    WHERE kode_barang = ?
  `;

  db.run(query, [
    nama_barang,
    kategori,
    harga_beli,
    harga_jual,
    stok_akhir,
    pemasok,
    kode_barang
  ], function(err) {
    if (err) {
      console.error('Error updating product:', err);
      return res.status(500).json({ error: 'Gagal memperbarui produk' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Produk tidak ditemukan' });
    }

    res.json({ 
      success: true, 
      message: 'Produk berhasil diperbarui',
      kode_barang 
    });
  });
});

// DELETE - Delete product
app.delete('/api/products/:kode_barang', (req, res) => {
  const { kode_barang } = req.params;

  // Check if product exists
  db.get('SELECT * FROM products WHERE kode_barang = ?', [kode_barang], (err, row) => {
    if (err) {
      console.error('Error checking product:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (!row) {
      return res.status(404).json({ error: 'Produk tidak ditemukan' });
    }

    // Delete product
    db.run('DELETE FROM products WHERE kode_barang = ?', [kode_barang], function(err) {
      if (err) {
        console.error('Error deleting product:', err);
        return res.status(500).json({ error: 'Gagal menghapus produk' });
      }

      res.json({ 
        success: true, 
        message: 'Produk berhasil dihapus',
        kode_barang 
      });
    });
  });
});

// ==================== CUSTOMER ORDERS ENDPOINTS ====================
app.post('/api/orders/customer', (req, res) => {
  const { customerName, items, totalAmount } = req.body;

  if (!customerName || !items || items.length === 0) {
    return res.status(400).json({ 
      error: 'Data pesanan tidak lengkap' 
    });
  }

  // Generate order ID
  const orderId = `ORD${Date.now()}`;
  const tanggal = new Date().toISOString().split('T')[0];

  db.serialize(() => {
    db.run('BEGIN TRANSACTION');

    // Insert customer order
    const orderQuery = `
      INSERT INTO customer_orders (id, total_pembayaran, metode_pembayaran, tanggal)
      VALUES (?, ?, 'Tunai', ?)
    `;

    db.run(orderQuery, [orderId, totalAmount, tanggal], function(err) {
      if (err) {
        db.run('ROLLBACK');
        console.error('Error creating order:', err);
        return res.status(500).json({ error: 'Gagal membuat pesanan' });
      }

      // Insert order items and update stock
      let itemsProcessed = 0;
      const totalItems = items.length;

      items.forEach((item) => {
        // Insert order item
        const itemQuery = `
          INSERT INTO order_items (order_id, kode_barang, nama_barang, jumlah, harga, subtotal)
          VALUES (?, ?, ?, ?, ?, ?)
        `;

        db.run(itemQuery, [
          orderId,
          item.product.kode_barang,
          item.product.nama_barang,
          item.quantity,
          item.product.harga_jual,
          item.subtotal
        ], (err) => {
          if (err) {
            db.run('ROLLBACK');
            console.error('Error inserting order item:', err);
            return res.status(500).json({ error: 'Gagal menambah item pesanan' });
          }

          // Update product stock and sales
          const updateQuery = `
            UPDATE products 
            SET 
              stok_akhir = stok_akhir - ?,
              jumlah_terjual = jumlah_terjual + ?,
              penjualan = penjualan + ?,
              keuntungan = keuntungan + ?
            WHERE kode_barang = ?
          `;

          const profit = (item.product.harga_jual - item.product.harga_beli) * item.quantity;

          db.run(updateQuery, [
            item.quantity,
            item.quantity,
            item.subtotal,
            profit,
            item.product.kode_barang
          ], (err) => {
            if (err) {
              db.run('ROLLBACK');
              console.error('Error updating stock:', err);
              return res.status(500).json({ error: 'Gagal update stok' });
            }

            // Update stock_items table
            const updateStockItemsQuery = `
              UPDATE stock_items 
              SET 
                stok_tersedia = stok_tersedia - ?,
                status = CASE 
                  WHEN (stok_tersedia - ?) <= 0 THEN 'Habis'
                  WHEN (stok_tersedia - ?) < 10 THEN 'Stok Rendah'
                  ELSE 'Tersedia'
                END
              WHERE kode_barang = ?
            `;

            db.run(updateStockItemsQuery, [
              item.quantity,
              item.quantity,
              item.quantity,
              item.product.kode_barang
            ], (err) => {
              if (err) {
                console.warn('Warning: Could not update stock_items:', err.message);
              }

              itemsProcessed++;

              // If all items processed, commit transaction
              if (itemsProcessed === totalItems) {
                db.run('COMMIT', (err) => {
                  if (err) {
                    console.error('Error committing transaction:', err);
                    return res.status(500).json({ error: 'Gagal menyimpan transaksi' });
                  }

                  res.json({ 
                    success: true, 
                    orderId,
                    message: 'Pesanan berhasil dibuat' 
                  });
                });
              }
            });
          });
        });
      });
    });
  });
});

app.get('/api/orders', (req, res) => {
  const query = `
    SELECT * FROM customer_orders 
    ORDER BY tanggal DESC, created_at DESC
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error fetching orders:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// ==================== RESTOCK ENDPOINTS ====================
app.post('/api/restock', (req, res) => {
  const { kode_barang, quantity } = req.body;

  if (!kode_barang || !quantity || quantity <= 0) {
    return res.status(400).json({ 
      error: 'Kode barang dan jumlah harus diisi dengan benar' 
    });
  }

  // Update product stock
  const updateQuery = `
    UPDATE products 
    SET 
      stok_akhir = stok_akhir + ?,
      stok_masuk = stok_masuk + ?
    WHERE kode_barang = ?
  `;

  db.run(updateQuery, [quantity, quantity, kode_barang], function(err) {
    if (err) {
      console.error('Error restocking:', err);
      return res.status(500).json({ error: 'Gagal melakukan restock' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Produk tidak ditemukan' });
    }

    // Update stock_items
    const updateStockItemsQuery = `
      UPDATE stock_items 
      SET 
        stok_tersedia = stok_tersedia + ?,
        status = CASE 
          WHEN (stok_tersedia + ?) >= 10 THEN 'Tersedia'
          WHEN (stok_tersedia + ?) > 0 THEN 'Stok Rendah'
          ELSE 'Habis'
        END
      WHERE kode_barang = ?
    `;

    db.run(updateStockItemsQuery, [quantity, quantity, quantity, kode_barang], (err) => {
      if (err) {
        console.warn('Warning: Could not update stock_items:', err.message);
      }

      // Log restock entry (optional, jika ada tabel restock_entries)
      const restockId = `RST${Date.now()}`;
      const tanggal = new Date().toISOString().split('T')[0];

      const logQuery = `
        INSERT INTO restock_entries (id, kode_barang, nama_barang, jumlah_masuk, harga_beli, tanggal_penerimaan, pemasok)
        SELECT ?, kode_barang, nama_barang, ?, harga_beli, ?, pemasok
        FROM products
        WHERE kode_barang = ?
      `;

      db.run(logQuery, [restockId, quantity, tanggal, kode_barang], (err) => {
        if (err) {
          console.warn('Warning: Could not log restock entry:', err.message);
        }

        res.json({ 
          success: true, 
          message: 'Restock berhasil',
          kode_barang,
          quantity
        });
      });
    });
  });
});

app.get('/api/restock', (req, res) => {
  const query = `
    SELECT * FROM restock_entries 
    ORDER BY tanggal_penerimaan DESC, created_at DESC
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error fetching restock history:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows || []);
  });
});

// ==================== SUPPLIER ORDERS ENDPOINTS ====================
app.post('/api/orders/supplier', (req, res) => {
  const { supplierId, items, totalAmount } = req.body;

  // This is a placeholder - implement according to your business logic
  res.json({ 
    success: true, 
    message: 'Endpoint supplier order belum diimplementasikan' 
  });
});

app.get('/api/orders/supplier', (req, res) => {
  const query = `
    SELECT * FROM supplier_orders 
    ORDER BY tanggal_pemesanan DESC, created_at DESC
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error fetching supplier orders:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows || []);
  });
});

// ==================== ERROR HANDLING ====================
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

// ==================== START SERVER ====================
app.listen(PORT, () => {
  console.log('\n🚀 ====================================');
  console.log('🚀  MEGA PERABOT Backend API');
  console.log(`🚀  Server: http://localhost:${PORT}`);
  console.log(`🚀  Database: ${dbPath}`);
  console.log('🚀 ====================================\n');
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    }
    console.log('\n✅ Database connection closed');
    process.exit(0);
  });
});