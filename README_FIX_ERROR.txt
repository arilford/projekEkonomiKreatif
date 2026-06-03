Temuan penyebab error utama:
- script.js masih berisi marker git conflict: <<<<<<< HEAD / ======= / >>>>>>> ...
- akibatnya JavaScript menjadi invalid syntax dan browser akan melempar SyntaxError saat file dimuat.
- Selain marker conflict, script.js juga tampak memiliki duplikasi/ketimpa fungsi (bagian renderReports, loadData/saveData) yang membuat logika tidak konsisten.

Langkah perbaikan yang harus dilakukan:
1) Bersihkan semua block conflict di script.js.
2) Pastikan hanya ada satu versi implementasi untuk fungsi-fungsi inti:
   - loadData, saveData, generateId, formatDate, readMediaFromInput
   - populateEditForm, saveEdit, cancelEdit
   - tambahLaporan, updateStatus, deleteReport
   - filterReports, renderReports
   - init DOMContentLoaded
3) Pastikan id di HTML sesuai dengan query selector script.js:
   #bugForm, #agentFilter, #reports, #reportCount, #clearAll, #agentSelect, #categorySelect, #description, #mediaUpload.

Catatan:
- index1.html juga memiliki marker conflict pada bagian img header, input file mediaUpload, dan footer.
- CSS/style.css juga memiliki marker conflict.

Urutan prioritas perbaikan:
- script.js dulu (wajib agar tidak SyntaxError)
- index1.html & style.css setelahnya.

