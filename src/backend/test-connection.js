// Test script untuk cek koneksi backend
const http = require('http');

console.log('\n🔍 TESTING BACKEND CONNECTION...\n');

// Test 1: Cek apakah port 3001 terbuka
const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/health',
  method: 'GET',
  timeout: 5000
};

const req = http.request(options, (res) => {
  console.log('✅ Backend is running!');
  console.log(`   Status Code: ${res.statusCode}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log('   Response:', JSON.stringify(json, null, 2));
      console.log('\n🎉 BACKEND CONNECTION: SUCCESS!\n');
      process.exit(0);
    } catch (e) {
      console.log('   Response (raw):', data);
      console.log('\n⚠️  Backend responded but not JSON format\n');
      process.exit(1);
    }
  });
});

req.on('error', (e) => {
  console.log('❌ BACKEND CONNECTION: FAILED!');
  console.log(`   Error: ${e.message}\n`);
  console.log('📋 TROUBLESHOOTING STEPS:');
  console.log('   1. Pastikan backend sudah jalan: cd backend && npm start');
  console.log('   2. Cek apakah ada error di terminal backend');
  console.log('   3. Cek apakah port 3001 sudah dipakai aplikasi lain');
  console.log('   4. Restart backend: Ctrl+C lalu npm start lagi\n');
  process.exit(1);
});

req.on('timeout', () => {
  console.log('❌ BACKEND CONNECTION: TIMEOUT!');
  console.log('   Backend tidak merespon dalam 5 detik\n');
  req.destroy();
  process.exit(1);
});

req.end();
