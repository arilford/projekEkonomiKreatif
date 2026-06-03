// Bug tracker app script
let bugReports = [];
let editingId = null;

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
  if (!text) return '';
  return text.length > len ? text.slice(0, len) + '...' : text;
}

async function readMediaFromInput() {
  const input = document.getElementById('mediaUpload');
  if (!input || !input.files || input.files.length === 0) return null;

  const file = input.files[0];
  if (!file) return null;

  const isImage = file.type.startsWith('image/');
  const isVideo = file.type.startsWith('video/');
  if (!isImage && !isVideo) {
    alert('Format media harus gambar atau video.');
    return null;
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve({ type: isImage ? 'image' : 'video', dataUrl: reader.result });
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });
}

function populateEditForm(id) {
  const report = bugReports.find(r => r.id === id);
  if (!report) return;

  editingId = id;

  const agentEl = document.getElementById('agentSelect');
  const categoryEl = document.getElementById('categorySelect');
  const descEl = document.getElementById('description');

  if (agentEl) agentEl.value = report.agent || '';
  if (categoryEl) categoryEl.value = report.kategori || '';
  if (descEl) descEl.value = report.deskripsi || '';

  const submitBtn = document.querySelector('#bugForm button[type="submit"]');
  if (submitBtn) submitBtn.textContent = 'Update Laporan';

  // Add cancel button
  const form = document.getElementById('bugForm');
  if (form) {
    const existingCancel = form.querySelector('button[data-cancel="true"]');
    if (existingCancel) existingCancel.remove();

    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.setAttribute('data-cancel', 'true');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.onclick = cancelEdit;

    if (submitBtn && submitBtn.parentNode) submitBtn.parentNode.appendChild(cancelBtn);
  }

  const bugForm = document.getElementById('bugForm');
  bugForm?.scrollIntoView({ behavior: 'smooth' });
  alert('Edit mode aktif. Ubah field dan klik Update.');
}

function saveEdit() {
  const report = bugReports.find(r => r.id === editingId);
  if (!report) return;

  const agentEl = document.getElementById('agentSelect');
  const categoryEl = document.getElementById('categorySelect');
  const descEl = document.getElementById('description');

  report.agent = agentEl ? agentEl.value : report.agent;
  report.kategori = categoryEl ? categoryEl.value : report.kategori;
  report.deskripsi = descEl ? descEl.value.trim() : report.deskripsi;

  saveData();
  renderReports();
  cancelEdit();
  alert('Laporan berhasil diupdate!');
}

function cancelEdit() {
  editingId = null;

  const form = document.getElementById('bugForm');
  if (form) form.reset();

  const submitBtn = document.querySelector('#bugForm button[type="submit"]');
  if (submitBtn) submitBtn.textContent = 'Tambah Laporan';

  const cancelBtn = document.querySelector('#bugForm button[data-cancel="true"]');
  if (cancelBtn) cancelBtn.remove();
}

async function tambahLaporan(e) {
  e.preventDefault();

  const agentEl = document.getElementById('agentSelect');
  const categoryEl = document.getElementById('categorySelect');
  const descEl = document.getElementById('description');

  const agent = agentEl ? agentEl.value : '';
  const category = categoryEl ? categoryEl.value : '';
  const desc = descEl ? descEl.value.trim() : '';

  const proceed = editingId
    ? confirm(`Update laporan "${agent}"?`)
    : confirm(`Tambah laporan "${agent}"-"${category}"?`);

  if (!proceed) return;

  if (editingId) {
    saveEdit();
    return;
  }

  const media = await readMediaFromInput();

  const newReport = {
    id: generateId(),
    agent,
    kategori: category,
    deskripsi: desc,
    media,
    status: 'Belum',
    tgl: new Date().toISOString()
  };

  bugReports.unshift(newReport);
  saveData();
  renderReports();

  if (e.target && typeof e.target.reset === 'function') e.target.reset();
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

function filterReports(agentFilter) {
  if (!agentFilter) return bugReports;
  return bugReports.filter(r => r.agent === agentFilter);
}

function renderReports() {
  const container = document.getElementById('reports');
  const reportCountEl = document.getElementById('reportCount');
  const agentFilterEl = document.getElementById('agentFilter');
  const filterVal = agentFilterEl ? agentFilterEl.value : '';

  const filtered = filterReports(filterVal);

  if (reportCountEl) reportCountEl.textContent = filtered.length;
  if (!container) return;

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
      <div class="report">
        <div class="report-header">
          <div class="agent-badge">${String(report.agent || '').toUpperCase()}</div>
          <div class="status ${String(report.status || '').toLowerCase()}">${report.status}</div>
        </div>
        <div class="date">${formatDate(report.tgl)}</div>
        <div class="desc">${truncate(report.deskripsi)}</div>
        ${mediaHtml}
        <div style="margin:10px 0;font-weight:600;">Kategori: ${report.kategori}</div>
        <div class="actions">
          <button class="btn-small btn-Diperbaiki" onclick="updateStatus('${report.id}')">Perbaiki</button>
          <button class="btn-small btn-edit" onclick="populateEditForm('${report.id}')">Edit</button>
          <button class="btn-small btn-delete" onclick="deleteReport('${report.id}')">Hapus</button>
        </div>
      </div>
    `;
  }).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  const bugForm = document.getElementById('bugForm');
  const agentFilterEl = document.getElementById('agentFilter');

  if (bugForm) bugForm.addEventListener('submit', tambahLaporan);
  if (agentFilterEl) agentFilterEl.addEventListener('change', renderReports);

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