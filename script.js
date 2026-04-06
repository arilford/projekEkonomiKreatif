let bugReports = [];
let editingId = null;

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
    <div class="report">
      <div class="report-header">
        <div class="agent-badge">${report.agent.toUpperCase()}</div>
        <div class="status ${report.status.toLowerCase()}">${report.status}</div>
      </div>
      <div class="date">${formatDate(report.tgl)}</div>
      <div class="desc">${truncate(report.deskripsi)}</div>
      <div style="margin:10px 0;font-weight:600;">Kategori: ${report.kategori}</div>
      <div class="actions">
        <button class="btn-small btn-Diperbaiki" onclick="updateStatus('${report.id}')">Perbaiki</button>
        <button class="btn-small btn-edit" onclick="populateEditForm('${report.id}')">Edit</button>
        <button class="btn-small btn-delete" onclick="deleteReport('${report.id}')">Hapus</button>
      </div>
    </div>
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

// Add CSS for new buttons if needed (inline for simplicity)
const style = document.createElement('style');
style.textContent = `
  .btn-Diperbaiki { background: #4CAF50; color: white; }
  .btn-edit { background: #ee9b0b; color: white; }
  .btn-delete { background: #f44336; color: white; }
`;
document.head.appendChild(style);


