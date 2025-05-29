// Fungsi untuk mengubah navigasi aktif
function changeNav(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('id');
            document.querySelectorAll('.nav-link').forEach(link => {
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    });
}

// Fungsi untuk memformat label chart
function formatLabel(str, maxLen = 16) {
    if (typeof str !== 'string') {
        return String(str);
    }
    if (str.length <= maxLen) {
         return str;
     }
     const words = str.split(' ');
    if (words.length === 1) {
        // Handle single long word by character splitting if needed
        return str.length > maxLen ? [str.substring(0, maxLen - 1) + '...'] : [str];
    }
     const lines = [];
     let currentLine = '';
     
     for (const word of words) {
        const testLine = currentLine + word;
        if (testLine.length > maxLen && currentLine.length > 0) {
             lines.push(currentLine.trim());
             currentLine = word + ' ';
         } else {
            currentLine = testLine + ' ';
         }
     }
     
     if (currentLine.trim().length > 0) {
         lines.push(currentLine.trim());
     }
     
    return lines.length > 0 ? lines : [str];
 }

// Fungsi untuk tooltip chart
const tooltipTitleCallback = function(tooltipItems) {
    const item = tooltipItems[0];
    let label = item.chart.data.labels[item.dataIndex];
    if (Array.isArray(label)) {
        return label.join(' ');
    } else {
        return label;
    }
};

// Konfigurasi dasar untuk chart
const chartOptionsBase = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false },
        tooltip: {
            callbacks: { 
                title: tooltipTitleCallback 
            }
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: { 
                color: 'var(--text-color-secondary)', // Use CSS variable
                callback: value => value
            },
            grid: { 
                color: 'var(--text-color-secondary)', // Use CSS variable
                borderColor: 'var(--text-color-secondary)'
            }
        },
        x: {
            ticks: { 
                color: 'var(--text-color-secondary)' // Use CSS variable
            },
            grid: { 
                display: false 
            }
        }
    }
};

// Warna untuk chart (gunakan variabel CSS untuk mode gelap)
const chartColors = ['var(--accent-secondary)', 'var(--accent-tertiary)', '#80C9F3', 'var(--accent-primary)'];


// Theme toggle logic
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

function setTheme(theme) {
    document.body.classList.remove('light-mode', 'dark-mode');
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);

    // Update button icon
    if (theme === 'dark-mode') {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    } else {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    }
    
    // Re-render charts to apply new colors - This is a simplified approach.
    // A more robust solution would involve destroying and recreating charts
    // or using Chart.js update() method if it supports CSS variable changes dynamically.
    // For this example, we assume CSS variables affect the canvas rendering implicitly
    // or rely on a page reload/re-initialization if needed.
    // In a real application, you might need chart.update() or chart.destroy() followed by new Chart().
    // As a quick visual fix, we can trigger a slight resize or re-draw if update() isn't enough.
    // window.dispatchEvent(new Event('resize')); // Might help some charts re-render
    
    // A simple way to force chart color update without destroying/recreating
    // is not directly supported by Chart.js for CSS variables applied this way.
    // The current setup relies on the browser re-interpreting CSS variables on class change.
    // If chart colors don't update, a full chart re-initialization on theme change is needed.
    // For this implementation, we'll rely on the CSS variable approach and note this limitation.
}

// Check local storage for theme preference on load
const storedTheme = localStorage.getItem('theme');
if (storedTheme) {
    setTheme(storedTheme);
} else {
    // Default theme if no preference is set
    setTheme('light-mode'); // Or 'dark-mode' based on your preference
}


// Event listener for the toggle button
themeToggle.addEventListener('click', function() {
    if (document.body.classList.contains('dark-mode')) {
        setTheme('light-mode');
    } else {
        setTheme('dark-mode');
    }
});


// Inisialisasi saat dokumen siap
document.addEventListener('DOMContentLoaded', function() {
     // Set tahun saat ini di footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
     
     // Inisialisasi smooth scrolling untuk navigasi
     const navLinks = document.querySelectorAll('.nav-link');
     const sections = document.querySelectorAll('section');
     
     // Smooth scrolling untuk navigasi
     navLinks.forEach(link => {
         link.addEventListener('click', function(e) {
             e.preventDefault();
             const targetId = this.getAttribute('href');
             const targetElement = document.querySelector(targetId);
             
             if (targetElement) {
                const navbar = document.getElementById('navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                 const elementPosition = targetElement.getBoundingClientRect().top;
                 const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 10;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Inisialisasi Intersection Observer untuk navigasi
    const options = { threshold: 0.4 }; // Trigger ketika 40% section terlihat
    const observer = new IntersectionObserver(changeNav, options);
    sections.forEach(section => observer.observe(section));
    
    // Inisialisasi KPI Charts jika elemen ada
    if (document.getElementById('kpiAkurasiPenerimaan')) {
        // Chart Akurasi Penerimaan
        new Chart(document.getElementById('kpiAkurasiPenerimaan'), {
            type: 'bar',
            data: {
                labels: [formatLabel('Target Perusahaan'), formatLabel('Realisasi Saat Ini')],
                datasets: [{
                    label: 'Akurasi (%)',
                    data: [99, 99.2],
                    backgroundColor: [getComputedStyle(document.documentElement).getPropertyValue('--accent-secondary'), getComputedStyle(document.documentElement).getPropertyValue('--accent-tertiary')], // Use computed styles
                    borderColor: [getComputedStyle(document.documentElement).getPropertyValue('--accent-secondary'), getComputedStyle(document.documentElement).getPropertyValue('--accent-tertiary')],
                    borderWidth: 1,
                    borderRadius: 5,
                    barPercentage: 0.6
                }]
            },
            options: { 
                ...chartOptionsBase, 
                scales: { 
                    ...chartOptionsBase.scales, 
                    y: { 
                        ...chartOptionsBase.scales.y, 
                        suggestedMax: 100, 
                        ticks: { 
                            ...chartOptionsBase.scales.y.ticks, 
                            callback: value => value + '%' 
                        } 
                    } 
                },
                 plugins: {
                     ...chartOptionsBase.plugins,
                      tooltip: {
                         ...chartOptionsBase.plugins.tooltip,
                          callbacks: {
                            ...chartOptionsBase.plugins.tooltip.callbacks,
                             label: function(context) {
                                 let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += context.parsed.y + '%';
                                }
                                return label;
                            }
                          }
                     }
                 }
            }
        });

        // Chart Waktu Siklus
        new Chart(document.getElementById('kpiWaktuSiklus'), {
            type: 'bar',
            data: {
                labels: [formatLabel('Target Waktu (Jam)'), formatLabel('Realisasi Rata-rata (Jam)')],
                datasets: [{
                    label: 'Waktu (Jam)',
                    data: [2, 1.5],
                    backgroundColor: [getComputedStyle(document.documentElement).getPropertyValue('--accent-secondary'), getComputedStyle(document.documentElement).getPropertyValue('--accent-tertiary')], // Use computed styles
                    borderColor: [getComputedStyle(document.documentElement).getPropertyValue('--accent-secondary'), getComputedStyle(document.documentElement).getPropertyValue('--accent-tertiary')],
                    borderWidth: 1,
                    borderRadius: 5,
                    barPercentage: 0.6
                }]
            },
            options: { 
                ...chartOptionsBase, 
                scales: { 
                    ...chartOptionsBase.scales, 
                    y: { 
                        ...chartOptionsBase.scales.y, 
                        suggestedMax: 3, 
                        ticks: { 
                            ...chartOptionsBase.scales.y.ticks, 
                            callback: value => value + ' Jam' 
                        } 
                    } 
                },
                 plugins: {
                     ...chartOptionsBase.plugins,
                     tooltip: {
                         ...chartOptionsBase.plugins.tooltip,
                         callbacks: {
                             ...chartOptionsBase.plugins.tooltip.callbacks,
                             label: function(context) {
                                 let label = context.dataset.label || '';
                                 if (label) {
                                     label += ': ';
                                 }
                                 if (context.parsed.y !== null) {
                                     label += context.parsed.y + ' Jam';
                                 }
                                 return label;
                             }
                         }
                     }
                 }
            }
        });

        // Chart Tingkat Kerusakan
        new Chart(document.getElementById('kpiTingkatKerusakan'), {
            type: 'bar',
            data: {
                labels: [formatLabel('Target Maksimum (%)'), formatLabel('Realisasi Saat Ini (%)')],
                datasets: [{
                    label: 'Kerusakan (%)',
                    data: [1, 0.8],
                    backgroundColor: [getComputedStyle(document.documentElement).getPropertyValue('--accent-secondary'), getComputedStyle(document.documentElement).getPropertyValue('--accent-tertiary')], // Use computed styles
                    borderColor: [getComputedStyle(document.documentElement).getPropertyValue('--accent-secondary'), getComputedStyle(document.documentElement).getPropertyValue('--accent-tertiary')],
                    borderWidth: 1,
                    borderRadius: 5,
                    barPercentage: 0.6
                }]
            },
            options: { 
                ...chartOptionsBase, 
                scales: { 
                    ...chartOptionsBase.scales, 
                    y: { 
                        ...chartOptionsBase.scales.y, 
                        suggestedMax: 2, 
                        ticks: { 
                            ...chartOptionsBase.scales.y.ticks, 
                            callback: value => value + '%' 
                        } 
                    } 
                },
                 plugins: {
                     ...chartOptionsBase.plugins,
                      tooltip: {
                         ...chartOptionsBase.plugins.tooltip,
                          callbacks: {
                            ...chartOptionsBase.plugins.tooltip.callbacks,
                             label: function(context) {
                                 let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += context.parsed.y + '%';
                                }
                                return label;
                            }
                          }
                     }
                 }
            }
        });
        
        // Chart Akurasi Stok
        new Chart(document.getElementById('kpiAkurasiStok'), {
            type: 'bar',
            data: {
                labels: [formatLabel('Target Akurasi Stok'), formatLabel('Realisasi Akurasi Stok')],
                datasets: [{
                    label: 'Akurasi (%)',
                    data: [99.5, 99.7],
                    backgroundColor: [getComputedStyle(document.documentElement).getPropertyValue('--accent-secondary'), getComputedStyle(document.documentElement).getPropertyValue('--accent-tertiary')], // Use computed styles
                    borderColor: [getComputedStyle(document.documentElement).getPropertyValue('--accent-secondary'), getComputedStyle(document.documentElement).getPropertyValue('--accent-tertiary')],
                    borderWidth: 1,
                    borderRadius: 5,
                    barPercentage: 0.6
                }]
            },
            options: { 
                ...chartOptionsBase, 
                scales: { 
                    ...chartOptionsBase.scales, 
                    y: { 
                        ...chartOptionsBase.scales.y, 
                        suggestedMax: 100, 
                        min: 98, 
                        ticks: { 
                            ...chartOptionsBase.scales.y.ticks, 
                            callback: value => value + '%' 
                        } 
                    } 
                },
                 plugins: {
                     ...chartOptionsBase.plugins,
                      tooltip: {
                         ...chartOptionsBase.plugins.tooltip,
                          callbacks: {
                            ...chartOptionsBase.plugins.tooltip.callbacks,
                             label: function(context) {
                                 let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += context.parsed.y + '%';
                                }
                                return label;
                            }
                          }
                     }
                 }
            }
        });
    }
});