# Plan: betulkan semua error (JS/HTML/CSS)

## Informasi yang sudah ditemukan

- `script.js` sudah dibetulkan menjadi JS valid.
- `index1.html`, `index2.html`, `index3.html`, `index4.html` masih memiliki marker konflik git: `<<<<<<< HEAD`, `=======`, `>>>>>>> ...`.
- `CSS/style.css` masih memiliki marker konflik git yang berpotensi membuat CSS tidak valid.

## Plan (file-level)

1. Bersihkan `index1.html`:
   - Pilih satu cabang (HEAD) untuk header, dan pastikan `input type=file#mediaUpload` tetap ada.
   - Hapus semua marker conflict.
2. Bersihkan `index2.html`, `index3.html`, `index4.html` dengan pola yang sama:
   - Pastikan ada `form#bugForm`, `select#agentFilter`, `select#agentSelect`, `select#categorySelect`, `textarea#description`, `input#mediaUpload`.
3. Bersihkan `CSS/style.css`:
   - Hapus marker conflict dan gabungkan pilihan warna yang konsisten (ambil cabang HEAD agar identik dengan bagian lain atau ambil satu warna saja).
   - Pastikan tidak ada potongan string `<<<<<<<` tersisa.
4. Verifikasi:
   - Browser console: tidak ada SyntaxError.
   - Coba tambah laporan + upload media.
   - Coba edit/update/delete.

## Dependent Files

- index1.html, index2.html, index3.html, index4.html, CSS/style.css

## Followup steps

- Buka index1-5 di browser, cek console.
