// Format currency to VND
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

// Format date to locale string
function formatDate(date) {
    return new Date(date).toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Initialize revenue chart
function initRevenueChart() {
    const ctx = document.getElementById('revenueChart').getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(79, 70, 229, 0.1)');
    gradient.addColorStop(1, 'rgba(79, 70, 229, 0)');

    const data = {
        labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
        datasets: [{
            label: 'Doanh thu',
            data: [1500000, 2500000, 2000000, 3500000, 3000000, 4500000, 4000000, 4800000, 5200000, 4700000, 5500000, 6000000],
            borderColor: '#4f46e5',
            backgroundColor: gradient,
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#fff',
            pointBorderColor: '#4f46e5',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#fff',
                    titleColor: '#111827',
                    bodyColor: '#4b5563',
                    borderColor: '#e5e7eb',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return formatCurrency(context.parsed.y);
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#6b7280'
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#f3f4f6'
                    },
                    ticks: {
                        color: '#6b7280',
                        callback: function(value) {
                            return formatCurrency(value);
                        }
                    }
                }
            }
        }
    };

    new Chart(ctx, config);
}

// Handle period selection for chart
function handlePeriodSelection() {
    const buttons = document.querySelectorAll('.chart-actions button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');
            // TODO: Update chart data based on selected period
        });
    });
}

// Handle transaction search
function handleTransactionSearch() {
    const searchInput = document.querySelector('.search-input');
    const filterSelect = document.querySelector('.filter-select');
    const tableRows = document.querySelectorAll('.transaction-table tbody tr');

    function filterTransactions() {
        const searchTerm = searchInput.value.toLowerCase();
        const filterValue = filterSelect.value;

        tableRows.forEach(row => {
            const text = row.textContent.toLowerCase();
            const type = row.querySelector('.transaction-type').textContent.toLowerCase();
            const matchesSearch = text.includes(searchTerm);
            const matchesFilter = filterValue === 'all' || type === filterValue;
            row.style.display = matchesSearch && matchesFilter ? '' : 'none';
        });
    }

    searchInput.addEventListener('input', filterTransactions);
    filterSelect.addEventListener('change', filterTransactions);
}

// Initialize date range picker
function initDateRangePicker() {
    const dateRangeSelect = document.querySelector('.date-range-select');
    if (dateRangeSelect) {
        dateRangeSelect.addEventListener('change', (e) => {
            const value = e.target.value;
            let startDate = new Date();
            let endDate = new Date();

            switch (value) {
                case '7days':
                    startDate.setDate(startDate.getDate() - 7);
                    break;
                case '30days':
                    startDate.setDate(startDate.getDate() - 30);
                    break;
                case '90days':
                    startDate.setDate(startDate.getDate() - 90);
                    break;
                // TODO: Handle custom date range
            }

            // TODO: Update data based on selected date range
            console.log('Date range:', formatDate(startDate), 'to', formatDate(endDate));
        });
    }
}

// Export financial report
function exportReport() {
    const exportBtn = document.querySelector('.export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            // TODO: Implement export functionality
            console.log('Exporting financial report...');
        });
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initRevenueChart();
    handlePeriodSelection();
    handleTransactionSearch();
    initDateRangePicker();
    exportReport();

    // Format all currency amounts on the page
    document.querySelectorAll('.amount').forEach(el => {
        const amount = parseFloat(el.dataset.value || el.textContent);
        el.textContent = formatCurrency(amount);
    });

    // Format all dates on the page
    document.querySelectorAll('.date').forEach(el => {
        const date = el.dataset.value || el.textContent;
        el.textContent = formatDate(date);
    });
}); 