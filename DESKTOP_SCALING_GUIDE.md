# Desktop Scaling Guide

## Cara Mengubah Ukuran UI untuk Desktop

File utama untuk mengubah ukuran: `client/src/index.css`

### 📝 Text Sizes (Ukuran Teks)
Cari section ini di file CSS (sekitar baris 115-124):

```css
/* TEXT SIZES - Ganti angka ini untuk memperbesar/memperkecil teks */
.lg\:desktop-text-base { font-size: 1.4rem !important; }      /* Basic text */
.lg\:desktop-text-lg { font-size: 1.6rem !important; }        /* Large text */  
.lg\:desktop-text-xl { font-size: 1.8rem !important; }        /* Extra large */
.lg\:desktop-text-2xl { font-size: 2.1rem !important; }       /* 2X large */
.lg\:desktop-text-3xl { font-size: 2.6rem !important; }       /* 3X large */
.lg\:desktop-text-4xl { font-size: 3.2rem !important; }       /* 4X large */
.lg\:desktop-text-5xl { font-size: 4.2rem !important; }       /* 5X large */
.lg\:desktop-text-6xl { font-size: 5.3rem !important; }       /* 6X large */
```

**Cara mengubah:**
- Untuk memperbesar semua teks: naikkan semua angka (contoh: 1.4rem → 1.6rem)
- Untuk memperkecil semua teks: turunkan semua angka (contoh: 1.4rem → 1.2rem)

### 📦 Card Sizes (Ukuran Card)
Cari section ini di file CSS (sekitar baris 145-149):

```css
/* CARD SIZES - Ganti angka ini untuk memperbesar/memperkecil card */
.lg\:desktop-w-400 { width: 500px !important; }              /* Card width */
.lg\:desktop-h-280 { height: 350px !important; }             /* Card height */
.lg\:desktop-w-320 { width: 400px !important; }              /* Small card width */
.lg\:desktop-h-240 { height: 300px !important; }             /* Small card height */
```

**Cara mengubah:**
- Untuk memperbesar card: naikkan angka px (contoh: 500px → 600px)
- Untuk memperkecil card: turunkan angka px (contoh: 500px → 450px)

### 📏 Spacing (Jarak/Padding)
Cari section ini di file CSS (sekitar baris 127-143):

```css
/* SPACING SIZES - Ganti angka ini untuk memperbesar/memperkecil spacing */
.lg\:desktop-p-8 { padding: 2.3rem !important; }             /* Padding 8 */
.lg\:desktop-p-12 { padding: 3.5rem !important; }            /* Padding 12 */
.lg\:desktop-p-16 { padding: 4.6rem !important; }            /* Padding 16 */
```

**Cara mengubah:**
- Untuk spacing lebih besar: naikkan angka rem (contoh: 2.3rem → 2.8rem)
- Untuk spacing lebih kecil: turunkan angka rem (contoh: 2.3rem → 1.8rem)

## 🚀 Contoh Perubahan

### Jika ingin semua teks 20% lebih besar:
```css
.lg\:desktop-text-base { font-size: 1.7rem !important; }      /* dari 1.4rem */
.lg\:desktop-text-lg { font-size: 1.9rem !important; }        /* dari 1.6rem */
.lg\:desktop-text-xl { font-size: 2.2rem !important; }        /* dari 1.8rem */
```

### Jika ingin card lebih besar:
```css
.lg\:desktop-w-400 { width: 600px !important; }              /* dari 500px */
.lg\:desktop-h-280 { height: 420px !important; }             /* dari 350px */
```

## ⚡ Tips:
1. Simpan file setelah edit - perubahan akan muncul otomatis
2. Ubah satu section dulu, lalu lihat hasilnya
3. Konsisten dengan perubahan (jika naik 20%, semua naik 20%)
4. File akan hot reload otomatis di browser