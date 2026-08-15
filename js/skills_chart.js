document.addEventListener('DOMContentLoaded', () => {
    // We lazily instantiate the chart using IntersectionObserver so it animates when scrolled into view
    const canvas = document.getElementById('skillsChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Chart data based on portfolio.json
    const data = {
        labels: ['Python', 'C', 'JavaScript', 'SQL', 'AWS', 'GenAI', 'FastAPI', 'React'],
        datasets: [{
            label: 'Proficiency',
            data: [90, 85, 80, 75, 80, 85, 85, 70],
            backgroundColor: 'rgba(79, 172, 254, 0.2)', // Soft blue transparent
            borderColor: '#4facfe',
            borderWidth: 2,
            pointBackgroundColor: '#0a0a0f',
            pointBorderColor: '#4facfe',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#4facfe',
            pointRadius: 4,
            pointHoverRadius: 6
        }]
    };

    // Advanced Academic/Editorial Design Settings for Dark Mode
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        // Using native Chart.js radar animation which wipes out from center
        animation: {
            duration: 2500,
            easing: 'easeOutQuart'
        },
        scales: {
            r: {
                angleLines: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                pointLabels: {
                    color: '#e2e8f0',
                    font: {
                        family: "'Inter', sans-serif",
                        size: 14,
                        weight: 500
                    }
                },
                ticks: {
                    display: false, // hide the inner numbers for cleaner look
                    backdropColor: 'transparent',
                    max: 100,
                    min: 0
                }
            }
        },
        plugins: {
            legend: {
                display: false // We don't need a legend for a single dataset
            },
            tooltip: {
                backgroundColor: 'rgba(10, 10, 15, 0.9)',
                titleFont: { family: "'Outfit', sans-serif", size: 16 },
                bodyFont: { family: "'Inter', sans-serif", size: 14 },
                borderColor: 'rgba(255,255,255,0.1)',
                borderWidth: 1,
                padding: 12,
                displayColors: false
            }
        }
    };

    let chartInstance = null;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!chartInstance) {
                    chartInstance = new Chart(ctx, {
                        type: 'radar',
                        data: data,
                        options: options
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(canvas);
});
