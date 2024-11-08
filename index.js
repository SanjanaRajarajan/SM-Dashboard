document.addEventListener("DOMContentLoaded", function () {
    // Overview Chart Configuration
    const overviewCtx = document.getElementById('overviewChart').getContext('2d');
    const overviewChart = new Chart(overviewCtx, {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                { label: 'Facebook', backgroundColor: '#ff6b6b', data: [50, 70, 80, 60, 90, 110, 130] },
                { label: 'YouTube', backgroundColor: '#ffba08', data: [80, 100, 90, 95, 110, 120, 150] },
                { label: 'WhatsApp', backgroundColor: '#00d084', data: [30, 50, 40, 60, 70, 100, 120] },
                { label: 'Twitter', backgroundColor: '#1da1f2', data: [60, 75, 80, 70, 85, 95, 105] }
            ]
        },
        options: {
            responsive: true,
            scales: { y: { beginAtZero: true } }
        }
    });

    // Platform-specific Chart Configuration
    const ctx = document.getElementById('analyticsChart').getContext('2d');
    let analyticsChart = new Chart(ctx, {
        type: 'line',
        data: { labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'], datasets: [{ label: 'Engagement', backgroundColor: 'rgba(255, 107, 107, 0.2)', borderColor: '#ff6b6b',  data: [] }] },
        options: { responsive: true, scales: { y: { beginAtZero: true } }, animation: { duration: 500, easing: 'easeInOutQuart' } }
    });

    // Sample Data for Each Platform
    const data = { Facebook: [50, 70, 80, 60, 90, 110, 130], YouTube: [80, 100, 90, 95, 110, 120, 150], WhatsApp: [30, 50, 40, 60, 70, 100, 120], Twitter: [60, 75, 80, 70, 85, 95, 105] };
    const colors = { Facebook: '#ff6b6b', YouTube: '#ffba08', WhatsApp: '#00d084', Twitter: '#1da1f2' };

    function updateChart(platform) {
        if (platform === 'Overview') {
            document.getElementById('overview-card').style.display = 'block';
            document.getElementById('platform-card').style.display = 'none';
        } else {
            const newData = data[platform];
            const newColor = colors[platform];
            analyticsChart.data.datasets[0].data = newData;
            analyticsChart.data.datasets[0].borderColor = newColor;
            analyticsChart.data.datasets[0].backgroundColor = newColor + '33';
            analyticsChart.update();
            document.getElementById('platform-title').innerText = `${platform} Analytics`;
            document.getElementById('overview-card').style.display = 'none';
            document.getElementById('platform-card').style.display = 'block';
        }
    }

    // Menu links event listeners
    document.querySelectorAll('.menu-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelectorAll('.menu-link').forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            updateChart(this.getAttribute('data-platform'));
        });
    });

    // Sidebar toggle button for mobile
    document.querySelector('.sidebar-toggle').addEventListener('click', function () {
        document.querySelector('.sidebar').classList.toggle('active');
    });
});
