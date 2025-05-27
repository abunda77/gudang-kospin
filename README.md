# Sistem Manajemen Gudang Retail Modern

Aplikasi web untuk mengelola operasional gudang retail modern dengan fitur lengkap mulai dari penerimaan barang, manajemen stok, hingga pelaporan.

## Fitur Aplikasi Web

### I. Fitur Umum & Dasar

#### Autentikasi & Manajemen Pengguna
- Login & Logout Pengguna
- Manajemen Peran Pengguna (Admin Gudang, Staf Gudang, Kepala Gudang, Tim Pembelian, Super Admin)
- Manajemen Hak Akses berdasarkan Peran
- Profil Pengguna

#### Dashboard
- Tampilan ringkasan statistik kunci (PO menunggu, GRN hari ini, item butuh perhatian)
- Grafik performa gudang
- Daftar tugas atau notifikasi penting

#### Manajemen Data Master
- Manajemen Suplier
- Manajemen Produk/Barang
- Manajemen Gudang & Lokasi Penyimpanan

### II. Fitur Berdasarkan Tahapan SOP Penerimaan Barang

#### 1. Modul Purchase Order (PO)
- Pembuatan dan pengelolaan PO
- Persetujuan PO
- Pelacakan status pengiriman
- Cetak/Unduh PO dalam format PDF

#### 2. Modul Penerimaan Barang
- Validasi Surat Jalan (SJ/DO)
- Proses verifikasi barang
- Pencatatan barang diterima/ditolak
- Upload bukti ketidaksesuaian

#### 3. Modul Goods Received Note (GRN/BPB)
- Pembuatan GRN otomatis
- Update stok real-time
- Manajemen daftar GRN
- Cetak/unduh GRN

#### 4. Modul Laporan Ketidaksesuaian
- Pembuatan laporan ketidaksesuaian
- Pelacakan status penyelesaian
- Komunikasi internal

#### 5. Modul Penyimpanan Barang (Putaway)
- Rekomendasi lokasi penyimpanan
- Pencatatan lokasi aktual
- Update lokasi stok

#### 6. Modul Manajemen Stok
- Visualisasi stok real-time
- Histori pergerakan stok
- Peringatan stok minimum/maksimum
- Stock opname/adjustment

### III. Fitur Tambahan

- Integrasi Barcode/QR Code
- Aplikasi Mobile Responsif
- Portal Suplier (opsional)

## Skema Database

### Tabel Utama

#### 1. Pengguna (Users)
- id (PK)
- name
- email
- password
- role_id (FK ke Roles)
- status
- last_login
- created_at
- updated_at

#### 2. Peran (Roles)
- id (PK)
- name
- description
- permissions (JSON)
- created_at
- updated_at

#### 3. Suplier (Suppliers)
- id (PK)
- kode_suplier
- nama
- alamat
- telepon
- email
- npwp
- status
- created_at
- updated_at

#### 4. Kategori Produk (ProductCategories)
- id (PK)
- nama
- deskripsi
- created_at
- updated_at

#### 5. Produk (Products)
- id (PK)
- kode_produk
- nama
- deskripsi
- kategori_id (FK ke ProductCategories)
- satuan
- stok_minimum
- stok_maksimum
- harga_beli_terakhir
- harga_jual
- gambar
- barcode
- status
- created_at
- updated_at

#### 6. Gudang (Warehouses)
- id (PK)
- kode_gudang
- nama
- alamat
- telepon
- status
- created_at
- updated_at

#### 7. Lokasi Penyimpanan (StorageLocations)
- id (PK)
- gudang_id (FK ke Warehouses)
- kode_lokasi
- nama
- deskripsi
- kapasitas
- status
- created_at
- updated_at

#### 8. Purchase Order (PurchaseOrders)
- id (PK)
- nomor_po
- suplier_id (FK ke Suppliers)
- tanggal_po
- tanggal_dibutuhkan
- status
- catatan
- dibuat_oleh (FK ke Users)
- disetujui_oleh (FK ke Users)
- tanggal_disetujui
- created_at
- updated_at

#### 9. Detail PO (PurchaseOrderDetails)
- id (PK)
- po_id (FK ke PurchaseOrders)
- produk_id (FK ke Products)
- kuantitas
- harga_satuan
- subtotal
- diterima
- sisa
- created_at
- updated_at

#### 10. Penerimaan Barang (GoodsReceipts)
- id (PK)
- nomor_grn
- po_id (FK ke PurchaseOrders)
- tanggal_terima
- suplier_id (FK ke Suppliers)
- surat_jalan
- pengirim
- catatan
- status
- dibuat_oleh (FK ke Users)
- created_at
- updated_at

#### 11. Detail Penerimaan (GoodsReceiptDetails)
- id (PK)
- goods_receipt_id (FK ke GoodsReceipts)
- product_id (FK ke Products)
- po_detail_id (FK ke PurchaseOrderDetails)
- kuantitas_dipesan
- kuantitas_diterima
- kuantitas_ditolak
- alasan_penolakan
- lokasi_id (FK ke StorageLocations)
- status
- created_at
- updated_at

#### 12. Laporan Ketidaksesuaian (DiscrepancyReports)
- id (PK)
- nomor_laporan
- goods_receipt_id (FK ke GoodsReceipts)
- dilaporkan_oleh (FK ke Users)
- tanggal_laporan
- status
- catatan
- tindakan
- diselesaikan_oleh (FK ke Users)
- tanggal_selesai
- created_at
- updated_at

#### 13. Detail Ketidaksesuaian (DiscrepancyReportDetails)
- id (PK)
- report_id (FK ke DiscrepancyReports)
- product_id (FK ke Products)
- kuantitas
- jenis_masalah
- deskripsi
- bukti_gambar
- created_at
- updated_at

#### 14. Stok (Inventories)
- id (PK)
- product_id (FK ke Products)
- location_id (FK ke StorageLocations)
- kuantitas
- batch_number
- expired_date
- created_at
- updated_at

#### 15. Riwayat Stok (InventoryTransactions)
- id (PK)
- inventory_id (FK ke Inventories)
- transaction_type (masuk/keluar/adjustment)
- quantity
- reference_type (GRN/SO/Adjustment dll)
- reference_id
- catatan
- created_by (FK ke Users)
- created_at

## Teknologi yang Digunakan

- **Frontend**: 
  - HTML5, CSS3, JavaScript
  - Tailwind CSS
  - Chart.js
  - Responsive Design

- **Backend**:
  - PHP 8.0+
  - Laravel 9.x
  - MySQL 8.0+

- **Lainnya**:
  - Git untuk version control
  - Composer untuk manajemen dependensi PHP
  - Docker (opsional untuk development)

## Instalasi

1. Clone repositori
2. Salin `.env.example` menjadi `.env`
3. Sesuaikan konfigurasi database di `.env`
4. Install dependensi:
   ```
   composer install
   npm install
   ```
5. Generate key aplikasi:
   ```
   php artisan key:generate
   ```
6. Migrasi database:
   ```
   php artisan migrate --seed
   ```
7. Compile aset:
   ```
   npm run dev
   ```
8. Jalankan server development:
   ```
   php artisan serve
   ```

## Kontribusi

Kontribusi untuk pengembangan aplikasi ini sangat diterima. Silakan buat branch baru untuk fitur/perbaikan yang diusulkan dan ajukan pull request.

## Lisensi

Hak Cipta © 2023 Perusahaan Retail Anda. Hak Cipta Dilindungi.

---

Aplikasi ini dikembangkan untuk memenuhi kebutuhan manajemen gudang retail modern dengan fitur lengkap berdasarkan standar operasional prosedur yang berlaku.
