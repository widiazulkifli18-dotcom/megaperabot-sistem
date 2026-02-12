const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'megaperabot.db');
const sqlPath = path.join(__dirname, 'database-sqlite.sql');

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
const sql = fs.readFileSync(sqlPath, 'utf8');

// Split SQL commands (handle multiple statements)
const statements = sql
  .split(';')
  .map(s => s.trim())
  .filter(s => s.length > 0 && !s.startsWith('--'));

// Execute SQL statements
db.serialize(() => {
  let count = 0;
  statements.forEach((statement) => {
    db.run(statement, (err) => {
      if (err) {
        console.error('❌ Error executing SQL:', err.message);
        console.error('Statement:', statement.substring(0, 100));
      } else {
        count++;
      }
    });
  });

  db.get("SELECT COUNT(*) as count FROM users", [], (err, row) => {
    if (err) {
      console.error('❌ Error verifying data:', err.message);
    } else {
      console.log(`\n✅ Database initialized successfully!`);
      console.log(`📊 Users: ${row.count}`);
    }

    db.get("SELECT COUNT(*) as count FROM products", [], (err, row) => {
      if (err) {
        console.error('❌ Error verifying products:', err.message);
      } else {
        console.log(`📦 Products: ${row.count}`);
      }

      db.close((err) => {
        if (err) {
          console.error('❌ Error closing database:', err.message);
        }
        console.log('\n🎉 Database ready to use!');
        console.log('💡 Run: npm start\n');
      });
    });
  });
});
