const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'megaperabot.db');
const sqlPath = path.join(__dirname, 'database-sqlite.sql');

console.log('🔄 Starting database initialization...\n');

// Remove existing database if exists
if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
  console.log('🗑️  Old database removed');
}

// Create new database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error creating database:', err.message);
    process.exit(1);
  }
  console.log('✅ New database created:', dbPath);
});

// Read SQL file
if (!fs.existsSync(sqlPath)) {
  console.error('❌ Error: database-sqlite.sql file not found!');
  process.exit(1);
}

const sql = fs.readFileSync(sqlPath, 'utf8');

// Execute the entire SQL file as one
db.exec(sql, (err) => {
  if (err) {
    console.error('❌ Error executing SQL:', err.message);
    db.close();
    process.exit(1);
  }

  console.log('✅ SQL executed successfully\n');

  // Verify data
  db.get("SELECT COUNT(*) as count FROM users", [], (err, row) => {
    if (err) {
      console.error('❌ Error verifying users:', err.message);
    } else {
      console.log(`📊 Users created: ${row.count}`);
      
      // Show user details
      db.all("SELECT username, role FROM users", [], (err, rows) => {
        if (!err) {
          rows.forEach(user => {
            console.log(`   - ${user.username} (${user.role})`);
          });
        }
      });
    }

    // Verify products
    db.get("SELECT COUNT(*) as count FROM products", [], (err, row) => {
      if (err) {
        console.error('❌ Error verifying products:', err.message);
      } else {
        console.log(`\n📦 Products created: ${row.count}`);
        
        // Show some products
        db.all("SELECT kode_barang, nama_barang, stok_akhir FROM products LIMIT 3", [], (err, rows) => {
          if (!err) {
            rows.forEach(product => {
              console.log(`   - [${product.kode_barang}] ${product.nama_barang} (Stok: ${product.stok_akhir})`);
            });
            if (row.count > 3) {
              console.log(`   ... dan ${row.count - 3} produk lainnya`);
            }
          }

          // Close database
          db.close((err) => {
            if (err) {
              console.error('❌ Error closing database:', err.message);
            }
            console.log('\n🎉 Database initialized successfully!');
            console.log('💡 Next step: npm start\n');
          });
        });
      }
    });
  });
});
