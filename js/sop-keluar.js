// Data untuk langkah-langkah SOP
const appSopStepsData = [
    { 
        title: "5.1. Identifikasi Kebutuhan & Kondisi Barang Etalase",
        pelaksana: "Staf Kasir / Staf Penjualan Etalase",
        frekuensi: "Secara berkala (awal shift, tengah hari) atau minimal 1x sehari.",
        langkah: [
            "Periksa visual level stok di etalase.",
            "Bandingkan dengan level min/max etalase (jika ada panduan).",
            "Identifikasi item menipis, habis, atau tidak layak jual (tarik segera).",
            "Catat kebutuhan item baru (promosi, arahan visual merchandising).",
            "Buat daftar sementara kebutuhan (item, perkiraan kuantitas)."
        ]
    },
    { title: "5.2. Pembuatan Formulir Permintaan Barang (FPB)", 
        pelaksana: "Staf Kasir / Staf Penjualan Etalase",
        media: "Formulir FPB fisik standar atau input sistem aplikasi.",
        langkah: [
          "Isi FPB lengkap & jelas: Tgl, Peminta, Kode/Nama Barang, Satuan, Kuantitas Diminta, Keterangan.",
          "Pastikan kuantitas diminta realistis (sesuai kapasitas etalase & laju jual)."
        ]
      },
      { title: "5.3. Persetujuan Permintaan Barang (Opsional)", 
        pelaksana: "Kepala Toko / Supervisor Kasir / Supervisor Penjualan",
        langkah: [
          "Terima FPB dari staf.",
          "Review FPB: kelengkapan, kewajaran, urgensi, ketersediaan stok umum.",
          "Beri persetujuan (TTD fisik / approval sistem) atau revisi dengan alasan.",
          "FPB disetujui diteruskan ke Gudang Toko/Petugas Stok."
        ]
      },
      { title: "5.4. Persiapan & Pengambilan Barang di Gudang (Picking)", 
        pelaksana: "Staf Gudang Toko / Petugas Stok Internal",
        dasar: "FPB yang telah diterima (dan disetujui).",
        langkah: [
          "Pahami detail permintaan pada FPB.",
          "Cari & ambil barang dari lokasi penyimpanan sesuai FPB.",
          "WAJIB: Terapkan prinsip FIFO atau FEFO secara konsisten.",
          "Periksa kondisi fisik & ED barang yang diambil. Pisahkan yang tidak standar.",
          "Kumpulkan barang di area transit pengeluaran."
        ]
      },
      { title: "5.5. Verifikasi & Pembuatan Bukti Pengeluaran Internal (BPBI)", 
        pelaksana: "Staf Gudang Toko / Petugas Stok Internal",
        langkah: [
          "Verifikasi ulang (double check) kesesuaian barang diambil dengan FPB.",
          "Jika stok kurang, catat di FPB & informasikan (peminta bisa revisi/tunggu).",
          "Buat BPBI: No. BPBI, Tgl Keluar, No. FPB Ref, Detail Barang Keluar, Nama Petugas.",
          "Jika via sistem, bisa terintegrasi saat transaksi 'Issue Stock'."
        ]
      },
      { title: "5.6. Serah Terima Barang ke Area Kasir/Peminta", 
        pelaksana: "Staf Gudang Toko & Staf Kasir/Penjualan Etalase (Peminta)",
        langkah: [
          "Staf Gudang bawa barang & BPBI/FPB tervalidasi ke peminta.",
          "Pengecekan bersama: jenis, kuantitas, kondisi barang.",
          "Jika sesuai, kedua pihak TTD bukti serah terima. Salinan untuk arsip masing-masing.",
          "Jika ada ketidaksesuaian, segera selesaikan atau catat sebagai temuan."
        ]
      },
      { title: "5.7. Penataan Barang di Etalase Kasir", 
        pelaksana: "Staf Kasir / Staf Penjualan Etalase",
        langkah: [
          "Segera tata barang yang diterima di etalase.",
          "Terapkan FIFO/FEFO: barang lama/ED dekat di depan/atas.",
          "Pastikan pajangan rapi, menarik, sesuai standar visual merchandising.",
          "Pastikan label harga benar, jelas, dan sesuai sistem.",
          "Bersihkan area etalase."
        ]
      },
      { title: "5.8. Pembaruan Data Stok di Sistem (Real-time)", 
        pelaksana: "Admin Stok / Staf Kasir Senior / Kepala Toko (sesuai hak akses)",
        dasar: "BPBI atau FPB yang telah divalidasi & TTD serah terima.",
        langkah: [
          "Segera (maks. akhir shift) update stok di sistem POS/Inventori.",
          "Proses sistem: 'Transfer Stok Antar Lokasi Internal' atau 'Pengeluaran Stok untuk Display'.",
          "Input No. BPBI/FPB sebagai referensi transaksi.",
          "Pastikan detail transaksi benar & tersimpan. Krusial untuk akurasi inventaris."
        ]
      }
    // ... (data lainnya bisa ditambahkan di sini)
];

// Fungsi untuk memformat label chart
function formatChartLabel(str, maxLen = 14) {
    if (typeof str !== 'string' || str.length <= maxLen) return str;
    const words = str.split(' ');
    const lines = [];
    let currentLine = '';
    
    for (const word of words) {
        if ((currentLine + word).length > maxLen && currentLine.length > 0) {
            lines.push(currentLine.trim());
            currentLine = word + ' ';
        } else {
            currentLine += word + ' ';
        }
    }
    
    if (currentLine.trim().length > 0) {
        lines.push(currentLine.trim());
    }
    
    return lines.length > 0 ? lines : [str];
}

// Inisialisasi saat dokumen siap
document.addEventListener('DOMContentLoaded', function() {
    // Set tahun saat ini di footer
    const currentYearElement = document.getElementById('appCurrentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Inisialisasi accordion SOP
    initSopAccordion();
    
    // Inisialisasi navigasi
    initNavigation();
    
    // Inisialisasi chart KPI
    initKpiCharts();
});

// Fungsi untuk inisialisasi accordion SOP
function initSopAccordion() {
    const accordionContainer = document.getElementById('sopAccordionContainer');
    if (!accordionContainer) return;

    appSopStepsData.forEach(step => {
        const triggerButton = document.createElement('button');
        triggerButton.className = 'accordion-trigger';
        triggerButton.innerHTML = `<span>${step.title}</span> <span class="plus-minus-icon text-xl font-light transition-transform duration-200 transform">+</span>`;
        
        const panelContent = document.createElement('div');
        panelContent.className = 'accordion-panel';
        
        let contentHTML = `<p class="text-sm text-gray-600 mb-2"><strong>Pelaksana:</strong> ${step.pelaksana}</p>`;
        if(step.frekuensi) contentHTML += `<p class="text-sm text-gray-600 mb-2"><strong>Frekuensi:</strong> ${step.frekuensi}</p>`;
        if(step.media) contentHTML += `<p class="text-sm text-gray-600 mb-2"><strong>Media:</strong> ${step.media}</p>`;
        if(step.dasar) contentHTML += `<p class="text-sm text-gray-600 mb-2"><strong>Dasar:</strong> ${step.dasar}</p>`;
        
        contentHTML += '<strong class="text-sm text-gray-700">Langkah-langkah:</strong><ul class="list-disc list-inside text-sm text-gray-600 mt-1 space-y-1">';
        step.langkah.forEach(l => {
            contentHTML += `<li>${l.replace(/\*(.*?)\*/g, "<strong>$1</strong>")}</li>`;
        });
        contentHTML += '</ul>';
        
        panelContent.innerHTML = contentHTML;
        
        accordionContainer.appendChild(triggerButton);
        accordionContainer.appendChild(panelContent);
        
        triggerButton.addEventListener('click', () => {
            const isActive = panelContent.classList.contains('active');
            const icon = triggerButton.querySelector('.plus-minus-icon');
            if (isActive) {
                panelContent.classList.remove('active');
                icon.textContent = '+';
                icon.classList.remove('rotate-45');
            } else {
                panelContent.classList.add('active');
                icon.textContent = '-';
                icon.classList.add('rotate-45');
            }
        });
    });
}

// Fungsi untuk inisialisasi navigasi
function initNavigation() {
    const navLinks = document.querySelectorAll('.app-nav-link');
    const sections = document.querySelectorAll('main section');

    // Smooth scrolling untuk navigasi
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbar = document.getElementById('appNavbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 15;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight navigasi aktif saat scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.25, rootMargin: "-60px 0px -60px 0px" });

    sections.forEach(section => observer.observe(section));
}

// Fungsi untuk inisialisasi chart KPI
function initKpiCharts() {
    const chartTooltipTitleCallback = (tooltipItems) => {
        const item = tooltipItems[0];
        let label = item.chart.data.labels[item.dataIndex];
        return Array.isArray(label) ? label.join(' ') : label;
    };

    const defaultChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'bottom', labels: { color: '#6C757D', font: { size: 10 } } },
            tooltip: {
                callbacks: { title: chartTooltipTitleCallback },
                bodyColor: '#343A40',
                titleColor: '#007BFF',
                backgroundColor: 'rgba(255,255,255,0.95)',
                borderColor: '#17A2B8',
                borderWidth: 1,
                padding: 10,
                titleFont: { weight: 'bold'},
                bodyFont: {size: 11}
            }
        },
        scales: {
            y: { beginAtZero: true, ticks: { color: '#6C757D', font: {size: 10} }, grid: { color: '#E9ECEF' } },
            x: { ticks: { color: '#6C757D', font: {size: 10} }, grid: { display: false } }
        }
    };
    
    const chartColors = ['#007BFF', '#17A2B8', '#28A745', '#FFC107', '#DC3545'];

    // Inisialisasi chart KPI
    initChart('appKpiOsaChart', 'doughnut', 
        [formatChartLabel('Tersedia (%)'), formatChartLabel('Tidak Tersedia (%)')], 
        [[98.2, 1.8]], 
        [chartColors[0], '#E9ECEF'],
        { ...defaultChartOptions, cutout: '65%' }
    );

    initChart('appKpiAkurasiStokChart', 'doughnut',
        [formatChartLabel('Akurat (%)'), formatChartLabel('Selisih (%)')],
        [[99.1, 0.9]],
        [chartColors[1], '#E9ECEF'],
        { ...defaultChartOptions, cutout: '65%' }
    );

    initChart('appKpiWaktuSiklusChart', 'bar',
        [formatChartLabel('Target (Menit)'), formatChartLabel('Realisasi (Menit)')],
        [[30, 22]],
        [chartColors[0], chartColors[2]],
        { 
            ...defaultChartOptions, 
            plugins: {
                ...defaultChartOptions.plugins,
                legend: { display: false }
            }
        }
    );
}

// Fungsi pembantu untuk inisialisasi chart
function initChart(elementId, type, labels, datasets, backgroundColors, options) {
    const ctx = document.getElementById(elementId);
    if (!ctx) return;

    const chartData = {
        labels: labels,
        datasets: datasets.map((data, index) => ({
            data: data,
            backgroundColor: Array.isArray(backgroundColors[0]) ? backgroundColors[index] : backgroundColors,
            borderWidth: 1,
            borderRadius: type === 'bar' ? 3 : 0,
            barPercentage: type === 'bar' ? 0.5 : undefined
        }))
    };

    new Chart(ctx, {
        type: type,
        data: chartData,
        options: options
    });
}
