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

// Inisialisasi Intersection Observer untuk navigasi
const sections = document.querySelectorAll('section');
const options = { threshold: 0.4 }; // Trigger ketika 40% section terlihat
const observer = new IntersectionObserver(changeNav, options);
sections.forEach(section => observer.observe(section));

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

// Konfigurasi dasar untuk chart
const chartOptionsBase = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
        },
        tooltip: {
            callbacks: {
                title: tooltipTitleCallback
            }
        }
    },
    scales: {
        x: {
            ticks: {
                callback: function(value) {
                    return formatLabel(this.getLabelForValue(value));
                }
            }
        }
    }
};

// Inisialisasi chart saat dokumen siap
document.addEventListener('DOMContentLoaded', function() {
    // Set tahun saat ini di footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Inisialisasi chart di sini jika diperlukan
    // Contoh:
    // const ctx = document.getElementById('myChart').getContext('2d');
    // new Chart(ctx, { ... });
});
