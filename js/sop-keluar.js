// Initialize current year in footer
function initCurrentYear() {
    const yearElement = document.getElementById('appCurrentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// SOP Steps Data
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
    { 
        title: "5.2. Pembuatan Formulir Permintaan Barang (FPB)",
        pelaksana: "Staf Kasir / Staf Penjualan Etalase",
        media: "Formulir FPB fisik standar atau input sistem aplikasi.",
        langkah: [
            "Isi FPB lengkap & jelas: Tgl, Peminta, Kode/Nama Barang, Satuan, Kuantitas Diminta, Keterangan.",
            "Pastikan kuantitas diminta realistis (sesuai kapasitas etalase & laju jual)."
        ]
    },
    { 
        title: "5.3. Persetujuan Permintaan Barang (Opsional)",
        pelaksana: "Kepala Toko / Supervisor Kasir / Supervisor Penjualan",
        langkah: [
            "Terima FPB dari staf.",
            "Review FPB: kelengkapan, kewajaran, urgensi, ketersediaan stok umum.",
            "Beri persetujuan (TTD fisik / approval sistem) atau revisi dengan alasan.",
            "FPB disetujui diteruskan ke Gudang Toko/Petugas Stok."
        ]
    },
    { 
        title: "5.4. Persiapan & Pengambilan Barang di Gudang (Picking)",
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
    { 
        title: "5.5. Verifikasi & Pembuatan Bukti Pengeluaran Internal (BPBI)",
        pelaksana: "Staf Gudang Toko / Petugas Stok Internal",
        langkah: [
            "Verifikasi ulang (double check) kesesuaian barang diambil dengan FPB.",
            "Jika stok kurang, catat di FPB & informasikan (peminta bisa revisi/tunggu).",
            "Buat BPBI: No. BPBI, Tgl Keluar, No. FPB Ref, Detail Barang Keluar, Nama Petugas.",
            "Jika via sistem, bisa terintegrasi saat transaksi 'Issue Stock'."
        ]
    },
    { 
        title: "5.6. Serah Terima Barang ke Area Kasir/Peminta",
        pelaksana: "Staf Gudang Toko & Staf Kasir/Penjualan Etalase (Peminta)",
        langkah: [
            "Staf Gudang bawa barang & BPBI/FPB tervalidasi ke peminta.",
            "Pengecekan bersama: jenis, kuantitas, kondisi barang.",
            "Jika sesuai, kedua pihak TTD bukti serah terima. Salinan untuk arsip masing-masing.",
            "Jika ada ketidaksesuaian, segera selesaikan atau catat sebagai temuan."
        ]
    },
    { 
        title: "5.7. Penataan Barang di Etalase Kasir",
        pelaksana: "Staf Kasir / Staf Penjualan Etalase",
        langkah: [
            "Segera tata barang yang diterima di etalase.",
            "Terapkan FIFO/FEFO: barang lama/ED dekat di depan/atas.",
            "Pastikan pajangan rapi, menarik, sesuai standar visual merchandising.",
            "Pastikan label harga benar, jelas, dan sesuai sistem.",
            "Bersihkan area etalase."
        ]
    },
    { 
        title: "5.8. Pembaruan Data Stok di Sistem (Real-time)",
        pelaksana: "Admin Stok / Staf Kasir Senior / Kepala Toko (sesuai hak akses)",
        dasar: "BPBI atau FPB yang telah divalidasi & TTD serah terima.",
        langkah: [
            "Segera (maks. akhir shift) update stok di sistem POS/Inventori.",
            "Proses sistem: 'Transfer Stok Antar Lokasi Internal' atau 'Pengeluaran Stok untuk Display'.",
            "Input No. BPBI/FPB sebagai referensi transaksi.",
            "Pastikan detail transaksi benar & tersimpan. Krusial untuk akurasi inventaris."
        ]
    }
];

// Initialize accordion functionality
function initAccordion() {
    const appAccordionContainer = document.getElementById('sopAccordionContainer');
    if (!appAccordionContainer) {
        console.warn('Accordion container not found');
        return;
    }
    
    // Clear existing content
    appAccordionContainer.innerHTML = '';
    
    // Create accordion items from appSopStepsData
    appSopStepsData.forEach((step, index) => {
        // Create wrapper div for each accordion item
        const accordionItem = document.createElement('div');
        accordionItem.className = 'accordion-item';
        
        // Create trigger button for each step
        const triggerButton = document.createElement('button');
        triggerButton.className = 'accordion-trigger flex justify-between items-center w-full px-4 py-3 text-left bg-white hover:bg-gray-50 border-b border-gray-200 focus:outline-none focus:bg-gray-50 transition-colors duration-200';
        triggerButton.setAttribute('aria-expanded', 'false');
        triggerButton.setAttribute('aria-controls', `panel-${index}`);
        triggerButton.innerHTML = `
            <span class="font-medium text-gray-800">${escapeHtml(step.title)}</span>
            <span class="plus-minus-icon text-xl font-light transition-transform duration-200" aria-hidden="true">+</span>
        `;
        
        // Create panel content for each step
        const panelContent = document.createElement('div');
        panelContent.className = 'accordion-panel hidden overflow-hidden bg-gray-50 transition-all duration-300';
        panelContent.id = `panel-${index}`;
        panelContent.setAttribute('aria-labelledby', `trigger-${index}`);
        
        // Build the content HTML
        let contentHTML = `
            <div class="p-4 space-y-3">
                <p class="text-sm text-gray-700"><span class="font-semibold">Pelaksana:</span> ${escapeHtml(step.pelaksana)}</p>
        `;
        
        // Add optional fields if they exist
        if (step.frekuensi) {
            contentHTML += `<p class="text-sm text-gray-700"><span class="font-semibold">Frekuensi:</span> ${escapeHtml(step.frekuensi)}</p>`;
        }
        
        if (step.media) {
            contentHTML += `<p class="text-sm text-gray-700"><span class="font-semibold">Media:</span> ${escapeHtml(step.media)}</p>`;
        }
        
        if (step.dasar) {
            contentHTML += `<p class="text-sm text-gray-700"><span class="font-semibold">Dasar:</span> ${escapeHtml(step.dasar)}</p>`;
        }
        
        // Add steps list
        contentHTML += `
            <div class="mt-3">
                <p class="text-sm font-semibold text-gray-800 mb-2">Langkah-langkah:</p>
                <ol class="list-decimal list-inside space-y-2 text-sm text-gray-700 pl-1">
        `;
        
        // Add each step
        step.langkah.forEach((langkah) => {
            contentHTML += `<li class="pl-2 leading-relaxed">${escapeHtml(langkah)}</li>`;
        });
        
        // Close content HTML
        contentHTML += `
                </ol>
            </div>
        </div>
        `;
        
        panelContent.innerHTML = contentHTML;
        
        // Add click event to toggle accordion
        triggerButton.addEventListener('click', function() {
            toggleAccordion(triggerButton, panelContent, index);
        });
        
        // Set IDs for accessibility
        triggerButton.id = `trigger-${index}`;
        
        // Append elements to accordion item
        accordionItem.appendChild(triggerButton);
        accordionItem.appendChild(panelContent);
        
        // Append accordion item to container
        appAccordionContainer.appendChild(accordionItem);
    });
}

// Toggle accordion function
function toggleAccordion(triggerButton, panelContent, index) {
    const isExpanded = !panelContent.classList.contains('hidden');
    const icon = triggerButton.querySelector('.plus-minus-icon');
    
    if (isExpanded) {
        // Close current panel
        panelContent.classList.add('hidden');
        triggerButton.setAttribute('aria-expanded', 'false');
        icon.textContent = '+';
    } else {
        // Close all other panels first
        closeAllAccordions();
        
        // Open current panel
        panelContent.classList.remove('hidden');
        triggerButton.setAttribute('aria-expanded', 'true');
        icon.textContent = '−';
    }
}

// Close all accordion panels
function closeAllAccordions() {
    const allPanels = document.querySelectorAll('.accordion-panel');
    const allTriggers = document.querySelectorAll('.accordion-trigger');
    
    allPanels.forEach((panel) => {
        panel.classList.add('hidden');
    });
    
    allTriggers.forEach((trigger) => {
        trigger.setAttribute('aria-expanded', 'false');
        const icon = trigger.querySelector('.plus-minus-icon');
        if (icon) {
            icon.textContent = '+';
        }
    });
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// Initialize charts
function initCharts() {
    // Check if Chart.js is available
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js library not found. Charts will not be initialized.');
        return;
    }
    
    try {
        // OSA Chart
        const osaCtx = document.getElementById('appKpiOsaChart');
        if (osaCtx) {
            const ctx = osaCtx.getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Tersedia', 'Kosong'],
                    datasets: [{
                        data: [95, 5],
                        backgroundColor: ['#10B981', '#EF4444'],
                        borderWidth: 0,
                        hoverBackgroundColor: ['#059669', '#DC2626']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '70%',
                    plugins: {
                        legend: { 
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                usePointStyle: true
                            }
                        },
                        tooltip: { 
                            callbacks: { 
                                label: function(context) {
                                    return `${context.label}: ${context.raw}%`;
                                }
                            }
                        }
                    }
                }
            });
        }
        
        // You can add more chart initializations here
        console.log('Charts initialized successfully');
        
    } catch (error) {
        console.error('Error initializing charts:', error);
    }
}

// Smooth scroll functionality
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbar = document.getElementById('appNavbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 20;
                
                window.scrollTo({ 
                    top: offsetPosition, 
                    behavior: 'smooth' 
                });
            }
        });
    });
}

// Update active navigation link on scroll
function initScrollNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.app-nav-link');
    
    if (sections.length === 0 || navLinks.length === 0) {
        return; // No sections or nav links found
    }
    
    function updateActiveNavLink() {
        let current = '';
        const scrollPosition = window.pageYOffset + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = '#' + section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });
    }
    
    // Throttle scroll event for better performance
    let scrollTimeout;
    function throttledScrollHandler() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(updateActiveNavLink, 100);
    }
    
    window.addEventListener('scroll', throttledScrollHandler);
    updateActiveNavLink(); // Initial call
}

// Error handling wrapper
function safeExecute(func, funcName) {
    try {
        func();
    } catch (error) {
        console.error(`Error executing ${funcName}:`, error);
    }
}

// Main initialization function
function initializeApp() {
    console.log('DOM loaded - initializing SOP Keluar app');
    
    // Initialize all components with error handling
    safeExecute(initCurrentYear, 'initCurrentYear');
    safeExecute(initAccordion, 'initAccordion');
    safeExecute(initCharts, 'initCharts');
    safeExecute(initSmoothScroll, 'initSmoothScroll');
    safeExecute(initScrollNavigation, 'initScrollNavigation');
    
    console.log('App initialization completed');
}

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    // DOM is already loaded
    initializeApp();
}

// Export functions for potential external use
window.SOPApp = {
    initAccordion,
    initCharts,
    closeAllAccordions,
    data: appSopStepsData
};