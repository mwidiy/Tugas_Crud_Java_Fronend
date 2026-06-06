const API_BASE_URL = 'https://medium-humor-assignment-electric.trycloudflare.com/api/kendaraan';

$(document).ready(function () {
    // Determine which page we are on
    const path = window.location.pathname;

    if (path.includes('index.html') || path === '/' || path.endsWith('/frontend/')) {
        initMonitoringPage();
    } else if (path.includes('form.html')) {
        initFormPage();
    }
});

function initMonitoringPage() {
    loadData();

    $('#btnSearch').click(function () {
        loadData();
    });

    $('#btnConfirmDelete').click(function () {
        const id = $('#deleteNoRegistrasi').val();
        if (id) {
            $.ajax({
                url: `${API_BASE_URL}/${id}`,
                type: 'DELETE',
                success: function () {
                    $('#deleteModal').modal('hide');
                    loadData();
                },
                error: function (err) {
                    alert('Gagal menghapus data: ' + err.responseJSON?.message || err.statusText);
                }
            });
        }
    });
}

function loadData() {
    const noReg = $('#searchNoRegistrasi').val() || '';
    const nama = $('#searchNamaPemilik').val() || '';

    $.ajax({
        url: `${API_BASE_URL}?noRegistrasi=${noReg}&namaPemilik=${nama}`,
        type: 'GET',
        success: function (data) {
            const tbody = $('#tableBody');
            tbody.empty();
            if (data.length === 0) {
                tbody.append('<tr><td colspan="9">Tidak ada data ditemukan</td></tr>');
                return;
            }

            data.forEach((item, index) => {
                const tr = `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${item.noRegistrasi}</td>
                        <td>${item.namaPemilik}</td>
                        <td>${item.merkKendaraan}</td>
                        <td>${item.tahunPembuatan}</td>
                        <td>${item.kapasitasSilinder} cc</td>
                        <td>${item.warnaKendaraan}</td>
                        <td>${item.bahanBakar}</td>
                        <td>
                            <a href="form.html?mode=detail&id=${item.noRegistrasi}" class="action-link action-detail fw-bold">Detail</a>
                            <a href="form.html?mode=edit&id=${item.noRegistrasi}" class="action-link action-edit ms-2 fw-bold">Edit</a>
                            <a href="#" class="action-link action-delete ms-2 fw-bold" onclick="showDeleteModal('${item.noRegistrasi}')">Delete</a>
                        </td>
                    </tr>
                `;
                tbody.append(tr);
            });
        },
        error: function () {
            alert('Gagal mengambil data dari server. Pastikan Backend berjalan di port 8080.');
        }
    });
}

function showDeleteModal(id) {
    $('#deleteTargetId').text(id);
    $('#deleteNoRegistrasi').val(id);
    $('#deleteModal').modal('show');
}

function initFormPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode') || 'add';
    const id = urlParams.get('id');

    if (mode === 'add') {
        $('#formTitle').text('Tambah Data Kendaraan');
    } else if (mode === 'edit') {
        $('#formTitle').text('Edit Data Kendaraan');
        $('#noRegistrasi').prop('readonly', true);
        $('#btnSave').text('Ubah');
        loadDetail(id);
    } else if (mode === 'detail') {
        $('#formTitle').text('Detail Data Kendaraan');
        $('input, textarea, select').prop('readonly', true).prop('disabled', true);
        $('#btnSave').hide();
        loadDetail(id);
    }

    $('#kendaraanForm').submit(function (e) {
        e.preventDefault();

        const payload = {
            noRegistrasi: $('#noRegistrasi').val(),
            namaPemilik: $('#namaPemilik').val(),
            alamat: $('#alamat').val(),
            merkKendaraan: $('#merkKendaraan').val(),
            tahunPembuatan: parseInt($('#tahunPembuatan').val()),
            kapasitasSilinder: parseInt($('#kapasitasSilinder').val()),
            warnaKendaraan: $('#warnaKendaraan').val(),
            bahanBakar: $('#bahanBakar').val()
        };

        const type = mode === 'add' ? 'POST' : 'PUT';
        const url = mode === 'add' ? API_BASE_URL : `${API_BASE_URL}/${id}`;

        $.ajax({
            url: url,
            type: type,
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function () {
                window.location.href = 'index.html';
            },
            error: function (err) {
                alert('Gagal menyimpan data: ' + (err.responseJSON?.message || err.statusText));
            }
        });
    });
}

function loadDetail(id) {
    if (!id) return;
    $.ajax({
        url: `${API_BASE_URL}/${id}`,
        type: 'GET',
        success: function (data) {
            $('#noRegistrasi').val(data.noRegistrasi);
            $('#namaPemilik').val(data.namaPemilik);
            $('#alamat').val(data.alamat);
            $('#merkKendaraan').val(data.merkKendaraan);
            $('#tahunPembuatan').val(data.tahunPembuatan);
            $('#kapasitasSilinder').val(data.kapasitasSilinder);
            $('#warnaKendaraan').val(data.warnaKendaraan);
            $('#bahanBakar').val(data.bahanBakar);
        },
        error: function () {
            alert('Data tidak ditemukan!');
            window.location.href = 'index.html';
        }
    });
}
