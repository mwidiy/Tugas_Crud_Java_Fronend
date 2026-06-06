Panduan Deployment Frontend - Aplikasi Data Kendaraan
===================================================

Folder ini berisi kode untuk tampilan antarmuka (Frontend) dari Aplikasi Data Kendaraan.
Frontend ini dibangun menggunakan murni HTML, CSS, dan JavaScript (jQuery + Bootstrap 5).

Persiapan Sebelum Deployment:
1. Buka file js/app.js menggunakan teks editor.
2. Pastikan baris pertama (API_BASE_URL) sudah mengarah ke IP VPS backend Anda.
   Contoh saat ini sudah diatur ke: http://104.211.102.69:8080/api/kendaraan

Cara Deployment ke Vercel (Gratis & Mudah):
1. Buat akun di Vercel (vercel.com) menggunakan akun GitHub Anda.
2. Anda bisa melakukan drag-and-drop seluruh isi folder "frontend" ini langsung ke halaman dashboard Vercel.
3. Tunggu proses upload selesai. Vercel akan memberikan link URL otomatis (misalnya: aplikasi-kendaraan.vercel.app).
4. Selesai! URL tersebut sudah bisa Anda bagikan ke HRD.

Catatan Penting:
Karena backend berjalan di server VPS port 8080 tanpa protokol HTTPS (hanya HTTP biasa), pastikan ketika mengakses halaman Vercel nantinya Anda juga menggunakan URL HTTP, atau atur browser agar mengizinkan Mixed Content. Jika menemui kendala tidak bisa tarik data, silakan cek console browser (Inspect Element > Console).
