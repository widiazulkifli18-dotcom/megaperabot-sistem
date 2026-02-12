# 🚀 CARA DEPLOY KE VERCEL (Step-by-Step)

**Untuk Skripsi: Sistem MEGA PERABOT**  
**URL Target:** https://megaperabot-sistem.vercel.app

---

## 📋 OVERVIEW

```
Figma Make (Prototype)
        ↓
    Export ZIP
        ↓
VS Code (Local Development)
        ↓
    Push to GitHub
        ↓
Vercel (Production Deployment)
        ↓
https://megaperabot-sistem.vercel.app ✅
```

---

## ⚠️ PENTING: Batasan Figma Make

**Figma Make TIDAK BISA:**
- ❌ Push langsung ke Git
- ❌ Deploy langsung ke Vercel
- ❌ Command line access

**Figma Make BISA:**
- ✅ Develop & test prototype
- ✅ Export code sebagai ZIP
- ✅ Demo langsung (tanpa deploy)

**Untuk Deploy ke Vercel → Harus pakai VS Code/Terminal!**

---

## 🎯 METODE 1: DEPLOY VIA VERCEL DASHBOARD (TERMUDAH!)

### **Step 1: Persiapan (10 menit)**

#### **1.1. Export dari Figma Make**

1. **Buka project** di Figma Make
2. **Klik tombol "Export"** (biasanya di menu)
3. **Download ZIP** semua file project
4. **Extract** ke folder, misal: `C:\megaperabot-sistem`

#### **1.2. Install VS Code & Node.js**

**Download & Install:**
```
1. VS Code: https://code.visualstudio.com/
2. Node.js: https://nodejs.org/ (LTS version)
```

**Verifikasi Install:**
```bash
# Buka Terminal/CMD, ketik:
node -v
# Output: v20.x.x ✅

npm -v
# Output: 10.x.x ✅
```

#### **1.3. Buka Project di VS Code**

```bash
# 1. Buka VS Code
# 2. File → Open Folder
# 3. Pilih folder megaperabot-sistem
# 4. Open Terminal di VS Code (Ctrl+`)
```

#### **1.4. Install Dependencies**

```bash
# Di Terminal VS Code:
npm install

# Tunggu sampai selesai (1-2 menit)
# Output: "added 234 packages" ✅
```

#### **1.5. Test di Localhost**

```bash
npm run dev

# Output:
#   VITE v5.x.x  ready in 234 ms
#   ➜  Local:   http://localhost:3000/
#   ➜  press h + enter to show help
```

**Buka browser:**
```
http://localhost:3000/

✅ Halaman login muncul
✅ Login berhasil
✅ Kelola Produk berfungsi
```

**Kalau berhasil → Lanjut ke Step 2!**

---

### **Step 2: Setup GitHub Repository (15 menit)**

#### **2.1. Buat GitHub Account**

1. **Buka:** https://github.com/
2. **Sign up** (kalau belum punya account)
3. **Verifikasi email**

#### **2.2. Buat Repository Baru**

1. **Login ke GitHub**
2. **Klik "New repository"** (tombol hijau)
3. **Isi form:**
   ```
   Repository name: megaperabot-sistem
   Description: Sistem Informasi Manajemen Stok MEGA PERABOT
   
   ○ Public  ← Pilih ini (untuk Vercel free)
   □ Add README
   □ Add .gitignore
   ```
4. **Klik "Create repository"**

#### **2.3. Copy Repository URL**

```
https://github.com/username/megaperabot-sistem.git
                 ^^^^^^^^
                 (ganti dengan username GitHub Anda)
```

**Simpan URL ini!** Akan dipakai di step berikutnya.

---

### **Step 3: Push Code ke GitHub (10 menit)**

#### **3.1. Init Git di VS Code**

```bash
# Di Terminal VS Code:
git init
git branch -M main
```

#### **3.2. Add Remote Repository**

```bash
# Ganti URL dengan repository Anda:
git remote add origin https://github.com/username/megaperabot-sistem.git
```

#### **3.3. Add & Commit Files**

```bash
# Add semua file:
git add .

# Commit:
git commit -m "Initial commit: MEGA PERABOT System for Thesis"
```

#### **3.4. Push ke GitHub**

```bash
git push -u origin main

# Output:
# Counting objects...
# Writing objects: 100%
# ✅ To https://github.com/username/megaperabot-sistem.git
```

**Verifikasi di GitHub:**
1. Refresh halaman repository
2. Semua file muncul ✅

---

### **Step 4: Deploy ke Vercel (5 menit)** ⭐

#### **4.1. Buat Vercel Account**

1. **Buka:** https://vercel.com/
2. **Sign up with GitHub** ← Pilih ini (mudah!)
3. **Authorize Vercel** untuk akses GitHub

#### **4.2. Import Project**

1. **Klik "Add New..."** → **"Project"**
2. **Import Git Repository**
3. **Pilih repository:** `megaperabot-sistem`
4. **Klik "Import"**

#### **4.3. Configure Project**

```
Configure Project:

Framework Preset:  [Vite ▼]  ← Auto-detect ✅

Build and Output Settings:
  Build Command:    npm run build  ✅
  Output Directory: dist            ✅
  Install Command:  npm install     ✅

Root Directory:     ./  ✅

Environment Variables: (kosongkan)
```

#### **4.4. Deploy!**

**Klik "Deploy"** (tombol biru besar)

**Proses Deployment:**
```
Building...      (30 detik)
  ↓
npm install      ✅
npm run build    ✅
Deploying...     (30 detik)
  ↓
✅ Deployment Complete!
```

#### **4.5. Get Production URL**

```
🎉 Your project is live!

https://megaperabot-sistem.vercel.app

atau

https://megaperabot-sistem-xyz123.vercel.app
                            ^^^^^^
                  (random string jika nama sudah terpakai)
```

---

### **Step 5: Test Production (5 menit)**

#### **5.1. Buka Production URL**

```
https://megaperabot-sistem.vercel.app
```

#### **5.2. Test Login**

```
Username: megaperabot
Password: admin123

✅ Login berhasil
```

#### **5.3. Test Kelola Produk**

**Tambah Produk:**
```
Kode: PK9999
Nama: Test Vercel Deploy
Kategori: Alat Kebersihan
Harga Beli: 5000
Harga Jual: 10000
Stok: 100

Klik "Tambah Produk"
✅ Toast: "Produk berhasil ditambahkan!"
```

**Refresh Page (F5):**
```
✅ Produk masih ada! (localStorage works!)
```

**Edit Produk:**
```
Ubah harga jual → 12000
✅ Toast: "Produk berhasil diperbarui!"
```

**Hapus Produk:**
```
Klik Hapus → Konfirmasi
✅ Toast: "Produk berhasil dihapus!"
```

#### **5.4. Test di Mobile**

**Buka di HP:**
```
https://megaperabot-sistem.vercel.app

✅ Responsive
✅ Semua fitur work
✅ Touch gestures OK
```

---

### **Step 6: Custom Domain (Optional)**

#### **Jika Sudah Punya Domain:**

1. **Buka Vercel Dashboard**
2. **Pilih project:** megaperabot-sistem
3. **Settings** → **Domains**
4. **Add Domain:**
   ```
   megaperabot.com
   atau
   sistem.megaperabot.com
   ```
5. **Configure DNS** (ikuti instruksi Vercel)
6. **Wait DNS Propagation** (5-48 jam)
7. **Done!** HTTPS otomatis ✅

---

## 🎯 METODE 2: DEPLOY VIA VERCEL CLI (Advanced)

### **Untuk yang suka Terminal/Command Line**

#### **Step 1: Install Vercel CLI**

```bash
npm install -g vercel
```

#### **Step 2: Login**

```bash
vercel login

# Pilih metode login:
# > Continue with GitHub ✅
```

#### **Step 3: Deploy**

```bash
# Di folder project:
cd /path/to/megaperabot-sistem

# Deploy:
vercel

# Prompts:
? Set up and deploy? [Y/n] y
? Which scope? [Your Account]
? Link to existing project? [y/N] n
? What's your project's name? megaperabot-sistem
? In which directory is your code located? ./

# Auto-detect framework:
✅ Auto-detected Project Settings (Vite)

? Want to modify these settings? [y/N] n

# Deployment starts...
✅ Production: https://megaperabot-sistem.vercel.app
```

#### **Step 4: Production Deployment**

```bash
# Deploy to production:
vercel --prod

# Output:
✅ Production: https://megaperabot-sistem.vercel.app
```

---

## 📊 VERCEL DASHBOARD

### **Monitoring Deployment**

**Buka:** https://vercel.com/dashboard

**Overview Tab:**
```
┌────────────────────────────────────┐
│ megaperabot-sistem                 │
│                                    │
│ Production Deployment              │
│ ✅ Ready                           │
│                                    │
│ https://megaperabot-sistem.        │
│        vercel.app                  │
│                                    │
│ Last deployed: 2 minutes ago       │
│ Build time: 1m 23s                 │
└────────────────────────────────────┘
```

**Deployments Tab:**
```
Status    | Branch | Commit      | Time
─────────────────────────────────────────
✅ Ready  | main   | Initial... | 2m ago
```

**Analytics Tab:**
```
Visitors:     23
Page Views:   45
Bandwidth:    1.2 MB
Top Pages:    /login, /product-management
```

---

## 🔄 UPDATE DEPLOYMENT

### **Setiap Kali Ada Perubahan Code:**

```bash
# 1. Edit code di VS Code
# 2. Save changes

# 3. Commit & Push:
git add .
git commit -m "Update: fitur XYZ"
git push origin main

# 4. Vercel auto-deploy! ✅
# Tunggu 1-2 menit
# Production URL otomatis update
```

**No Need to Manual Deploy!**
- ✅ Vercel deteksi push baru
- ✅ Auto-build & deploy
- ✅ Zero-downtime deployment

---

## ⚙️ ENVIRONMENT VARIABLES (Jika Perlu)

### **Setup di Vercel Dashboard:**

**Settings → Environment Variables:**

```
┌─────────────────────────────────────┐
│ Add Environment Variable            │
│                                     │
│ Name:  VITE_API_URL                 │
│ Value: https://api.megaperabot.com  │
│                                     │
│ Environments:                       │
│ ✅ Production                       │
│ ✅ Preview                          │
│ ✅ Development                      │
│                                     │
│ [Cancel]          [Save]            │
└─────────────────────────────────────┘
```

**Access di Code:**
```typescript
const API_URL = import.meta.env.VITE_API_URL;
```

---

## 🐛 TROUBLESHOOTING DEPLOYMENT

### **Problem: "Build Failed"**

**Check Build Logs:**
```
Vercel Dashboard → Deployments → Click failed deployment

Logs:
❌ Error: Module not found: 'react-router'

Solution:
1. Install missing package:
   npm install react-router
2. Commit & push:
   git add package.json package-lock.json
   git commit -m "Fix: add missing dependency"
   git push
```

### **Problem: "Page Not Found (404)"**

**Solution: Configure `vercel.json`**

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

```bash
# Add file:
touch vercel.json
# Paste code above

# Commit & push:
git add vercel.json
git commit -m "Fix: add SPA routing config"
git push
```

### **Problem: "Environment Variables Not Working"**

**Solution:**
```
1. Check variable name starts with VITE_
2. Rebuild deployment:
   Vercel Dashboard → Deployments → 
   ... → Redeploy
```

### **Problem: "Domain DNS Not Resolving"**

**Solution:**
```
1. Wait 5-48 hours (DNS propagation)
2. Check DNS records:
   - A record: 76.76.21.21
   - CNAME: cname.vercel-dns.com
3. Verify at: https://dnschecker.org/
```

---

## ✅ CHECKLIST DEPLOYMENT SUCCESS

**Pre-Deployment:**
- [ ] Code tested di localhost
- [ ] No console errors
- [ ] Build berhasil (`npm run build`)
- [ ] Git repository ready
- [ ] Vercel account ready

**Deployment:**
- [ ] Code pushed ke GitHub
- [ ] Vercel project configured
- [ ] Deployment completed (green ✅)
- [ ] Production URL accessible

**Post-Deployment:**
- [ ] Login test (3 roles)
- [ ] Kelola Produk test (CRUD)
- [ ] Mobile responsive test
- [ ] Performance check (fast loading)
- [ ] HTTPS active (🔒 icon)

---

## 📈 BEST PRACTICES

### **1. Branching Strategy**

```bash
# Main branch = Production
# Dev branch = Staging

# Create dev branch:
git checkout -b dev

# Work on dev, push:
git push origin dev

# Merge to main when ready:
git checkout main
git merge dev
git push origin main

# Vercel auto-deploy from main ✅
```

### **2. Environment Setup**

```
Production:  main branch
Preview:     dev branch
Development: local
```

### **3. Commit Messages**

```
✅ Good:
- "feat: add product management CRUD"
- "fix: resolve login validation bug"
- "docs: update README deployment guide"

❌ Bad:
- "update"
- "fix bug"
- "changes"
```

---

## 🎓 UNTUK PRESENTASI SKRIPSI

### **Tunjukkan URL Production:**

```
"Sistem ini telah di-deploy ke production dan dapat
diakses secara online melalui URL:

https://megaperabot-sistem.vercel.app

Sistem menggunakan platform cloud Vercel dengan
fitur CI/CD (Continuous Integration/Deployment)
yang memungkinkan automatic deployment setiap
ada perubahan code di repository GitHub."
```

### **Tunjukkan Vercel Dashboard:**

```
"Deployment dimonitor melalui Vercel Dashboard
yang menampilkan analytics penggunaan, build logs,
dan deployment history secara real-time."
```

---

## 📞 SUPPORT & RESOURCES

**Official Docs:**
- Vercel: https://vercel.com/docs
- Vite: https://vitejs.dev/guide/
- React Router: https://reactrouter.com/

**Community:**
- Vercel Discord: https://vercel.com/discord
- GitHub Discussions: Repository → Discussions

---

**Deployment Complete! System Ready for Thesis Defense! 🎓🎉**

---

**Last Updated:** 12 Februari 2026  
**Guide Version:** 1.0  
**Tested With:** Vercel v32, Vite v5, React 18
