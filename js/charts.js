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
                color: '#475569', // Teks Sekunder
                callback: value => value
            },
            grid: { 
                color: '#E2E8F0' // Warna grid lebih lembut
            }
        },
        x: {
            ticks: { 
                color: '#475569' 
            },
            grid: { 
                display: false 
            }
        }
    }
};

const chartColors = ['#2A6EBC', '#559BD8', '#80C9F3', '#004299'];

// Fungsi untuk memformat label chart
function formatLabel(str, maxLen = 16) {
    if (str.length <= maxLen) return str;
    
    const words = str.split(' ');
    let result = '';
    let currentLine = '';
    
    words.forEach(word => {
        if ((currentLine + ' ' + word).length <= maxLen) {
            currentLine += (currentLine ? ' ' : '') + word;
        } else {
            if (currentLine) result += (result ? '\n' : '') + currentLine;
            currentLine = word;
        }
    });
    
    if (currentLine) {
        result += (result ? '\n' : '') + currentLine;
    }
    
    return result;
}

// Fungsi untuk tooltip chart
function tooltipTitleCallback(tooltipItems) {
    const label = tooltipItems[0]?.label || '';
    return label.split('\n');
}

// Inisialisasi chart saat dokumen siap
document.addEventListener('DOMContentLoaded', function() {
    // Set tahun saat ini di footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

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
                    backgroundColor: [chartColors[0], chartColors[1]],
                    borderColor: [chartColors[0], chartColors[1]],
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
                    backgroundColor: [chartColors[0], chartColors[1]],
                    borderColor: [chartColors[0], chartColors[1]],
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
                    backgroundColor: [chartColors[0], chartColors[1]],
                    borderColor: [chartColors[0], chartColors[1]],
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
                    backgroundColor: [chartColors[0], chartColors[1]],
                    borderColor: [chartColors[0], chartColors[1]],
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
                } 
            }
        });
    }
});
