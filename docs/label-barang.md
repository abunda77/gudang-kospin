# LABEL BARANG

## FORMAT LABEL
```
+----------------------------------------+
| [Nama Produk Jelas & Singkat]          |
|----------------------------------------|
| **SKU/Kode Barang:** [KODE_BARANG_UNIK] |
|----------------------------------------|
| [Representasi Visual Barcode]          |
| [Nomor Barcode di bawahnya, misal EAN-13]|
|----------------------------------------|
| Qty: [Jumlah per kemasan, jika label   |
|       untuk karton/palet, misal: 12 PCS]|
|----------------------------------------|
| Batch No: [Nomor Batch Produksi]       |
| (Jika Berlaku)                         |
|----------------------------------------|
| Exp. Date: [DD/MM/YYYY]                |
| (Jika Berlaku)                         |
|----------------------------------------|
| Suplier: [Kode Suplier/Nama Singkat]   |
| (Opsional, untuk internal tracking)    |
|----------------------------------------|
| Lokasi Simpan: [Kode Lokasi Gudang]    |
| (Dapat ditambahkan saat putaway)       |
+----------------------------------------+
```

## CATATAN UNTUK LABEL BARANG

### 1. Ukuran Label
- Sesuaikan dengan ukuran produk/kemasan

### 2. Jenis Barcode
- Pilih jenis barcode yang sesuai dengan sistem scanner Anda:
  - EAN-13 (untuk produk eceran)
  - Code 128 (untuk logistik & inventori)
  - QR Code (untuk informasi lengkap)

### 3. Kualitas Cetak
- Pastikan barcode tercetak jelas dan mudah dipindai
- Gunakan resolusi cetak minimal 300 dpi

### 4. Material Label
- Pilih bahan yang tahan lama sesuai kondisi penyimpanan
- Pastikan tahan terhadap air dan goresan

### 5. Informasi Tambahan (Opsional)
- Negara asal
- Simbol handling khusus
- Berat bersih/kotor
- Kode HS (jika untuk ekspor/impor)

## CONTOH LABEL

### Contoh 1: Label Produk
```
+----------------------------------------+
| SUSU UHT COKLAT 200ML                  |
|----------------------------------------|
| **SKU/Kode Barang:** PRD-2023-001      |
|----------------------------------------|
| [GAMBAR BARCODE]                       |
| 8999999999999 (EAN-13)                 |
|----------------------------------------|
| Qty: 24 PCS                            |
|----------------------------------------|
| Batch No: BCH-2023-05-001              |
| Exp. Date: 31/12/2023                  |
|----------------------------------------|
| Suplier: SPL-001 - UD MAJU JAYA        |
| Lokasi Simpan: GUD-A-05-02             |
+----------------------------------------+
```

### Contoh 2: Label Karton
```
+----------------------------------------+
| KARTON - SUSU UHT COKLAT 24 PCS        |
|----------------------------------------|
| **SKU/Kode Barang:** KTN-2023-001      |
|----------------------------------------|
| [GAMBAR BARCODE]                       |
| 10012345678905 (ITF-14)                |
|----------------------------------------|
| Qty: 1 KARTON (24 PCS)                 |
| Berat: 12.5 KG                        |
|----------------------------------------|
| Batch No: BCH-2023-05-001              |
| Exp. Date: 31/12/2023                  |
|----------------------------------------|
| Suplier: SPL-001 - UD MAJU JAYA        |
| Lokasi Simpan: PALET-01-03             |
+----------------------------------------+
```

## SIMBOL KHUSUS
- ☣️ Bahan berbahaya
- ☢️ Radioaktif
- ↑↑ Simbol atas
- ↓↓ Simbol bawah
- 🌡️ Suhu terkendali
- 💧 Hindari air
- ☀️ Hindari sinar matahari langsung
## Scan Barcode/QR Code
[GAMBAR_BARCODE_ATAU_QR_CODE]

## Instruksi Penyimpanan
- 
- 

## Informasi Keamanan
- □ Mudah Terbakar
- □ Beracun
- □ Korosif
- □ Lainnya: ___________

## Tanda Tangan
- **Dibuat Oleh**: 
  - Nama: 
  - Jabatan: 
  - Tanda Tangan: 
  - Tanggal: 
- **Diperiksa Oleh**: 
  - Nama: 
  - Jabatan: 
  - Tanda Tangan: 
  - Tanggal: 
