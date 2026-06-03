<<<<<<< HEAD
// Bug tracker base script (generated)
let bugReports = [];
let editingId = null;

// ========== Helpers ============
function loadData() {
  const data = localStorage.getItem('valorantBugs');
  if (data) bugReports = JSON.parse(data);
  renderReports();
}

function saveData() {
  localStorage.setItem('valorantBugs', JSON.stringify(bugReports));
}

function generateId() {
  return 'VAL-' + Math.random().toString(36).substring(2, 9).toUpperCase();
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function truncate(text, len = 100) {
  return text.length > len ? text.slice(0, len) + '...' : text;
}

// Read media from input (image/video) -> return { type, dataUrl } or null
function readMediaFromInput() {
  const input = document.getElementById('mediaUpload');
  if (!input || !input.files || input.files.length === 0) return Promise.resolve(null);

  const file = input.files[0];
  if (!file) return Promise.resolve(null);

  const isImage = file.type.startsWith('image/');
  const isVideo = file.type.startsWith('video/');
  if (!isImage && !isVideo) {
    alert('Format media harus gambar atau video.');
    return Promise.resolve(null);
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({ type: isImage ? 'image' : 'video', dataUrl: reader.result });
    };
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });
}

// ========== Edit ============
function populateEditForm(id) {
  const report = bugReports.find(r => r.id === id);
  if (!report) return;
=======
  let bugReports = [];
  let editingId = null;

  // Smooth scroll navbar & active class
    document.addEventListener('DOMContentLoaded', function () {
      const navLinks = document.querySelectorAll('.nav-link');
      const sections = document.querySelectorAll('section[id]');

    // Smooth scroll saat klik navbar
    navLinks.forEach(link => {
      link.addEventListener('click', e => {
          e.preventDefault();

      const targetId = e.target.getAttribute('href');
      const target = document.querySelector(targetId);

      if (target) {
          target.scrollIntoView({
              behavior: 'smooth'
          });

      // Hilangkan active yang lama
      navLinks.forEach(lnk => lnk.classList.remove('active'));
      // Tambah active ke yang diklik
      link.classList.add('active');
      }
    });
    });
>>>>>>> ff3d18050425004f080c16233f53372cab32c01e

    // Update navbar aktif saat scroll
  window.addEventListener('scroll', () => {
      let currentSection = '';

  sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;

      if (
      pageYOffset >= sectionTop &&
      pageYOffset < sectionTop + sectionHeight
  ) {
      currentSection = section.getAttribute('id');
      }
  });

<<<<<<< HEAD
  document.getElementById('bugForm').scrollIntoView();
  alert('Edit mode aktif. Ubah field dan klik Update.');
}

function saveEdit() {
  const report = bugReports.find(r => r.id === editingId);
  if (!report) return;

  report.agent = document.getElementById('agentSelect').value;
  report.kategori = document.getElementById('categorySelect').value;
  report.deskripsi = document.getElementById('description').value.trim();
  // media: tidak wajib di-update

  saveData();
  renderReports();
  cancelEdit();
  alert('Laporan berhasil diupdate!');
}

function cancelEdit() {
  editingId = null;
  document.getElementById('bugForm').reset();

  const submitBtn = document.querySelector('#bugForm button[type="submit"]');
  submitBtn.textContent = 'Tambah Laporan';

  const cancelBtn = document.querySelector('#bugForm button[type="button"]');
  if (cancelBtn) cancelBtn.remove();
}

// ========== CRUD ============
async function tambahLaporan(e) {
  e.preventDefault();

  const agent = document.getElementById('agentSelect').value;
  const category = document.getElementById('categorySelect').value;
  const desc = document.getElementById('description').value.trim();

  const proceed = editingId
    ? confirm(`Update laporan "${agent}"?`)
    : confirm(`Tambah laporan "${agent}"-"${category}"?`);

  if (!proceed) return;

  if (editingId) {
    saveEdit();
    return;
  }

  const media = await readMediaFromInput();
  const mediaPayload = media ? media : null;

  const newReport = {
    id: generateId(),
    agent,
    kategori: category,
    deskripsi: desc,
    media: mediaPayload,
    status: 'Belum',
    tgl: new Date().toISOString()
  };

  bugReports.unshift(newReport);
  saveData();
  renderReports();
  e.target.reset();
  alert('Laporan berhasil ditambahkan!');
}

function updateStatus(id) {
  if (!confirm('Bug sudah diperbaiki?')) return;

  const report = bugReports.find(r => r.id === id);
  if (!report) return;

  report.status = 'Diperbaiki';
  saveData();
  renderReports();
  alert('Laporan berhasil diperbaiki!');
}

function deleteReport(id) {
  if (!confirm('Hapus laporan?')) return;

  bugReports = bugReports.filter(r => r.id !== id);
  saveData();
  renderReports();
  alert('Laporan berhasil dihapus!');
}

// ========== Render ============
function filterReports(agentFilter) {
  if (!agentFilter) return bugReports;
  return bugReports.filter(r => r.agent === agentFilter);
}

function renderReports() {
  const container = document.getElementById('reports');
  const filterVal = document.getElementById('agentFilter').value;
  const filtered = filterReports(filterVal);

  document.getElementById('reportCount').textContent = filtered.length;

  if (filtered.length === 0) {
    container.innerHTML = '<p class="empty" style="text-align:center;padding:40px;color:#9aa0a6;">Tidak ada laporan.</p>';
    return;
  }

  container.innerHTML = filtered.map(report => {
    const mediaHtml = report.media && report.media.type === 'image'
      ? `<img class="report-media-image" src="${report.media.dataUrl}" alt="Foto bug" />`
      : report.media && report.media.type === 'video'
        ? `<video class="report-media-video" controls src="${report.media.dataUrl}"></video>`
        : '';

    return `
=======
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentSection) {
      link.classList.add('active');
      }
  });
  });
  });
  // Load from localStorage
  function loadData() {
    const data = localStorage.getItem('valorantBugs');
    if (data) bugReports = JSON.parse(data);
    renderReports();
  }

  // Save to localStorage
  function saveData() {
    localStorage.setItem('valorantBugs', JSON.stringify(bugReports));
  }

  // Generate ID
  function generateId() {
    return 'VAL-' + Math.random().toString(36).substring(2, 9).toUpperCase();
  }

  // Format date
  function formatDate(date) {
    return new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  // Populate edit form
  function populateEditForm(id) {
    const report = bugReports.find(r => r.id === id);
    if (!report) return;

    editingId = id;
    document.getElementById('agentSelect').value = report.agent;
    document.getElementById('categorySelect').value = report.kategori;
    document.getElementById('description').value = report.deskripsi;

    const submitBtn = document.querySelector('#bugForm button[type="submit"]');
    submitBtn.textContent = 'Update Laporan';

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.type = 'button';
    cancelBtn.onclick = cancelEdit;
    submitBtn.parentNode.appendChild(cancelBtn);

    document.getElementById('bugForm').scrollIntoView();
    alert('Edit mode aktif. Ubah field dan klik Update.');
  }

  // Save edit
  function saveEdit() {
    const report = bugReports.find(r => r.id === editingId);
    if (!report) return;

    report.agent = document.getElementById('agentSelect').value;
    report.kategori = document.getElementById('categorySelect').value;
    report.deskripsi = document.getElementById('description').value.trim();

    saveData();
    renderReports();
    cancelEdit();
    alert('Laporan berhasil diupdate!');
  }

  // Cancel edit
  function cancelEdit() {
    editingId = null;
    document.getElementById('bugForm').reset();
    const submitBtn = document.querySelector('#bugForm button[type="submit"]');
    submitBtn.textContent = 'Tambah Laporan';
    const cancelBtn = document.querySelector('#bugForm button[type="button"]');
    if (cancelBtn) cancelBtn.remove();
  }

  // Add report or update
  function tambahLaporan(e) {
    e.preventDefault();
    const agent = document.getElementById('agentSelect').value;
    const category = document.getElementById('categorySelect').value;
    const desc = document.getElementById('description').value.trim();


    const proceed = editingId ? confirm(`Update laporan "${agent}"?`) : confirm(`Tambah laporan "${agent}"-"${category}"?`);
    
    if (proceed) {
      if (editingId) {
        saveEdit();
      } else {
        const newReport = {
          id: generateId(),
          agent,
          kategori: category,
          deskripsi: desc,
          status: 'Belum',
          tgl: new Date().toISOString()
        };
        bugReports.unshift(newReport);
        saveData();
        renderReports();
        e.target.reset();
        alert('Laporan berhasil ditambahkan!');
      }
    }
  }

  // Filter
  function filterReports(agentFilter) {
    if (!agentFilter) return bugReports;
    return bugReports.filter(r => r.agent === agentFilter);
  }

  // Update status
  function updateStatus(id) {
    if (confirm('Bug sudah diperbaiki?')) {
      const report = bugReports.find(r => r.id === id);
      if (report) {
        report.status = 'Diperbaiki';
        saveData();
        renderReports();
        alert('Laporan berhasil diperbaiki!');
      }
    }
  }

  // Delete
  function deleteReport(id) {
    if (confirm('Hapus laporan?')) {
      bugReports = bugReports.filter(r => r.id !== id);
      saveData();
      renderReports();
      alert('Laporan berhasil dihapus!');
    }
  }

  // Truncate text
  function truncate(text, len = 100) {
    return text.length > len ? text.slice(0, len) + '...' : text;
  }

  // Render reports
  function renderReports() {
    const container = document.getElementById('reports');
    const filterVal = document.getElementById('agentFilter').value;
    const filtered = filterReports(filterVal);

    document.getElementById('reportCount').textContent = filtered.length;

    if (filtered.length === 0) {
      container.innerHTML = '<p class="empty" style="text-align:center;padding:40px;color:#9aa0a6;">Tidak ada laporan.</p>';
      return;
    }

    container.innerHTML = filtered.map(report => `
>>>>>>> ff3d18050425004f080c16233f53372cab32c01e
      <div class="report">
        <div class="report-header">
          <div class="agent-badge">${report.agent.toUpperCase()}</div>
          <div class="status ${report.status.toLowerCase()}">${report.status}</div>
        </div>
        <div class="date">${formatDate(report.tgl)}</div>
        <div class="desc">${truncate(report.deskripsi)}</div>
<<<<<<< HEAD
        ${mediaHtml}
=======
>>>>>>> ff3d18050425004f080c16233f53372cab32c01e
        <div style="margin:10px 0;font-weight:600;">Kategori: ${report.kategori}</div>
        <div class="actions">
          <button class="btn-small btn-Diperbaiki" onclick="updateStatus('${report.id}')">Perbaiki</button>
          <button class="btn-small btn-edit" onclick="populateEditForm('${report.id}')">Edit</button>
          <button class="btn-small btn-delete" onclick="deleteReport('${report.id}')">Hapus</button>
        </div>
      </div>
<<<<<<< HEAD
    `;
  }).join('');
}

// ========== Init ============
document.addEventListener('DOMContentLoaded', () => {
  const bugForm = document.getElementById('bugForm');
  const agentFilter = document.getElementById('agentFilter');

  if (bugForm) bugForm.addEventListener('submit', tambahLaporan);
  if (agentFilter) agentFilter.addEventListener('change', renderReports);

  const clearAllBtn = document.getElementById('clearAll');
  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', () => {
      if (bugReports.length && confirm('Hapus semua laporan?')) {
        bugReports = [];
        saveData();
        renderReports();
        alert('Semua Laporan berhasil dihapus!');
      }
    });
  }

  // Add button styles (keperluan tampilan)
  const style = document.createElement('style');
  style.textContent = `
    .btn-Diperbaiki { background: #4f46e5; color: white; }
    .btn-edit { background: #4f46e5; color: white; }
    .btn-delete { background: #111827; color: white; }
    .report-media-image { width: 100%; max-height: 360px; object-fit: contain; border-radius: 10px; margin: 10px 0; border: 1px solid #e5e7eb; }
    .report-media-video { width: 100%; max-height: 360px; border-radius: 10px; margin: 10px 0; border: 1px solid #e5e7eb; background: #0b1220; }
  `;
  document.head.appendChild(style);

  loadData();
});

=======
    `).join('');
  }

  // Init
  document.addEventListener('DOMContentLoaded', loadData);
  document.getElementById('bugForm').addEventListener('submit', tambahLaporan);
  document.getElementById('agentFilter').addEventListener('change', () => renderReports());
  document.getElementById('clearAll').addEventListener('click', () => {
    if (bugReports.length && confirm('Hapus semua laporan?')) {
      bugReports = [];
      saveData();
      renderReports();
      alert('Semua Laporan berhasil dihapus!');
    }
  });

  // Add button styles
  const style = document.createElement('style');
  style.textContent = `
    .btn-Diperbaiki { background: #4CAF50; color: white; }
    .btn-edit { background: #ee9b0b; color: white; }
    .btn-delete { background: #f44336; color: white; }
  `;
  document.head.appendChild(style);


>>>>>>> ff3d18050425004f080c16233f53372cab32c01e
