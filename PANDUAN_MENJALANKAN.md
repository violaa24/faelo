# Panduan Menjalankan Website Faelo AI

Paket ini berisi website Faelo AI versi terakhir yang sudah disetujui, ditambah backend Node.js dan database PostgreSQL untuk menyimpan formulir **Book a Demo**.

## Cara termudah di Windows

1. Ekstrak file ZIP ini.
2. Buka folder `Faelo_AI_Fullstack`.
3. Klik dua kali `SETUP_WINDOWS.bat`.
4. Saat Notepad terbuka, cari baris berikut:

   ```env
   DB_PASSWORD=GANTI_DENGAN_PASSWORD_POSTGRESQL_ANDA
   ```

5. Ganti bagian setelah tanda `=` dengan password PostgreSQL yang Anda buat saat instalasi. Contoh:

   ```env
   DB_PASSWORD=password_postgresql_anda
   ```

6. Simpan file tersebut, lalu tutup Notepad. Proses setup akan dilanjutkan otomatis.
7. Jika muncul tulisan `Setup completed successfully`, tekan tombol apa saja untuk menutupnya.
8. Klik dua kali `START_WEBSITE.bat`.
9. Buka browser dan masuk ke [http://127.0.0.1:3000](http://127.0.0.1:3000).

Jangan membuka `public/index.html` secara langsung. Website harus dijalankan melalui Node.js agar formulir dapat terhubung ke PostgreSQL.

## Cara melalui terminal VS Code

1. Buka folder ini di VS Code.
2. Salin `.env.example` dan ubah nama salinannya menjadi `.env`.
3. Isi `DB_PASSWORD` di `.env` dengan password PostgreSQL Anda.
4. Pilih menu **Terminal → New Terminal**.
5. Jalankan perintah berikut satu per satu:

   ```bash
   npm install
   npm run db:setup
   npm start
   ```

6. Buka [http://127.0.0.1:3000](http://127.0.0.1:3000).

## Menguji formulir Book a Demo

1. Buka website melalui alamat di atas.
2. Klik **Book a Demo**.
3. Isi formulir dan klik **Request my demo**.
4. Jika berhasil, website menampilkan pesan **Request Received!**.

## Melihat data melalui pgAdmin 4

1. Buka pgAdmin 4.
2. Buka **Servers → PostgreSQL → Databases → faelo_ai → Schemas → public → Tables**.
3. Klik kanan tabel `demo_requests`.
4. Pilih **View/Edit Data → All Rows**.

Alternatifnya, buka **Query Tool**, salin isi file `database/view_demo_requests.sql`, lalu jalankan.

## Menghentikan website

Kembali ke jendela terminal yang menjalankan website, lalu tekan `Ctrl + C`.

## Jika terjadi masalah

- **`password authentication failed`**: password pada `DB_PASSWORD` di file `.env` tidak sesuai dengan password PostgreSQL Anda.
- **`ECONNREFUSED`**: layanan PostgreSQL belum berjalan. Buka Windows Services, cari layanan PostgreSQL, lalu pilih **Start**.
- **Port 3000 sedang digunakan**: ubah `PORT=3000` di `.env`, misalnya menjadi `PORT=3001`, lalu buka `http://127.0.0.1:3001`.
- **Tabel belum tersedia**: jalankan kembali `npm run db:setup`.

## Struktur utama

- `public/`: frontend HTML, CSS, JavaScript, gambar, dan SVG.
- `src/`: server, API, validasi, dan akses PostgreSQL.
- `database/`: struktur tabel dan query untuk melihat data.
- `scripts/`: setup database dan pemeriksaan proyek.
- `tests/`: pengujian validasi formulir.

Jangan membagikan file `.env` karena file tersebut berisi password database Anda.
