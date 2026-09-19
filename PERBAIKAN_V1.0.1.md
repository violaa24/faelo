# Perbaikan versi 1.0.1

Versi ini memperbaiki tombol **Book a Demo** yang sebelumnya tidak merespons.

## Penyebab

Versi awal memakai perintah klik langsung pada atribut HTML. Kebijakan keamanan backend memblokir perintah tersebut, sehingga tombol terlihat normal tetapi formulir tidak terbuka.

## Perbaikan

- Semua tombol **Book a Demo** sekarang memakai event listener JavaScript yang kompatibel dengan kebijakan keamanan.
- Tombol tutup, tombol Close, tombol Escape, dan klik pada area gelap modal telah diperiksa.
- Pengiriman formulir ke API dan tampilan sukses/gagal telah diuji.
- Proteksi keamanan tetap aktif dan tidak dilonggarkan.

Jika database `faelo_ai` sudah dibuat oleh versi sebelumnya, menjalankan `SETUP_WINDOWS.bat` kembali tetap aman dan tidak menghapus data lama.
