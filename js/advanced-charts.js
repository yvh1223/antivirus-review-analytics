        function updateTimelineChart() {
            const ctx = document.getElementById('sentimentTimelineChart').getContext('2d');
            
            if (window.timelineChart) {
                window.timelineChart.destroy();
            }
            
            const years = [];
            for (let year = currentFilters.yearStart; year <= currentFilters.yearEnd; year++) {
                years.push(year.toString());
            }
            
            window.timelineChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: years,
                    datasets: [{
                        label: 'Positive Sentiment %',
                        data: years.map(() => 85 + Math.random() * 10),
                        borderColor: '#4CAF50',
                        backgroundColor: 'rgba(76, 175, 80, 0.1)',
                        tension: 0.4,
                        fill: true
                    }, {
                        label: 'Negative Sentiment %',
                        data: years.map(() => 5 + Math.random() * 5),
                        borderColor: '#F44336',
                        backgroundColor: 'rgba(244, 67, 54, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: { beginAtZero: true, max: 100 }
                    }
                }
            });
        }

        function updatePlatformChart() {
            const ctx = document.getElementById('platformComparisonChart').getContext('2d');
            
            if (window.platformChart) {
                window.platformChart.destroy();
            }
            
            let labels = ['Google Play', 'Apple App Store'];
            let data = [3.8, 4.2];
            
            if (currentFilters.platform === 'google') {
                labels = ['Google Play'];
                data = [3.8];
            } else if (currentFilters.platform === 'apple') {
                labels = ['Apple App Store'];
                data = [4.2];
            }
            
            window.platformChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Average Rating',
                        data: data,
                        backgroundColor: ['#4CAF50', '#2196F3'],
                        borderColor: ['#388E3C', '#1976D2'],
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: { beginAtZero: true, max: 5 }
                    },
                    plugins: { legend: { display: false } }
                }
            });
        }

        function updateGeoChart() {
            const ctx = document.getElementById('geoChart').getContext('2d');
            
            if (window.geoChart) {
                window.geoChart.destroy();
            }
            
            window.geoChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['🇺🇸 US', '🇬🇧 UK', '🇨🇦 CA', '🇦🇺 AU', '🌍 Others'],
                    datasets: [{
                        data: [34.2, 12.8, 8.9, 7.3, 36.8],
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                        borderWidth: 2,
                        borderColor: '#fff'
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: { padding: 15, font: { size: 10 } }
                        }
                    }
                }
            });
        }

        function updateHeatmap() {
            const container = document.getElementById('heatmapChart');
            container.innerHTML = '';
            
            const data = [];
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            
            for (let year = currentFilters.yearStart; year <= currentFilters.yearEnd; year++) {
                for (let month = 0; month < 12; month++) {
                    data.push({
                        year: year,
                        month: months[month],
                        value: Math.floor(Math.random() * 1000) + 100
                    });
                }
            }
            
            const margin = {top: 20, right: 20, bottom: 50, left: 60};
            const width = container.offsetWidth - margin.left - margin.right;
            const height = 300 - margin.top - margin.bottom;
            
            const svg = d3.select(container)
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);
            
            const years = [...new Set(data.map(d => d.year))];
            const monthNames = [...new Set(data.map(d => d.month))];
            
            const xScale = d3.scaleBand()
                .domain(monthNames)
                .range([0, width])
                .padding(0.1);
            
            const yScale = d3.scaleBand()
                .domain(years)
                .range([0, height])
                .padding(0.1);
            
            const colorScale = d3.scaleSequential(d3.interpolateBlues)
                .domain([0, d3.max(data, d => d.value)]);
            
            svg.selectAll('rect')
                .data(data)
                .enter().append('rect')
                .attr('x', d => xScale(d.month))
                .attr('y', d => yScale(d.year))
                .attr('width', xScale.bandwidth())
                .attr('height', yScale.bandwidth())
                .attr('fill', d => colorScale(d.value))
                .attr('stroke', '#fff')
                .attr('stroke-width', 1);
            
            svg.append('g')
                .attr('transform', `translate(0,${height})`)
                .call(d3.axisBottom(xScale));
            
            svg.append('g')
                .call(d3.axisLeft(yScale));
        }

        function showTab(tabName) {
            document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            updateTabContent(tabName);
        }

        function updateTabContent(tabName) {
            const insights = {
                sentiment: {
                    trend: "Sentiment analysis reveals 86.9% positive feedback across all filtered data with strong correlation to product performance metrics.",
                    competitive: "Bitdefender leads in positive sentiment (94.2%) while McAfee shows improvement opportunities in user satisfaction.",
                    risk: "Monitor negative sentiment spikes during major updates and subscription renewal periods for early warning indicators.",
                    strategic: "Focus on addressing top complaint categories: performance impact, false positives, and subscription transparency."
                },
                competitive: {
                    trend: "Market leader Norton maintains volume advantage but faces rating pressure from premium competitors like Bitdefender.",
                    competitive: "Three-tier market structure: Premium (Bitdefender 4.47★), Mainstream (Norton 4.31★), Value (McAfee 3.27★).",
                    risk: "Norton's slight rating decline (-0.08) signals potential market share vulnerability to emerging competitors.",
                    strategic: "Opportunity exists in the 3.5-4.0 rating gap - target users seeking better experience than value brands."
                },
                temporal: {
                    trend: "2024-2025 shows stabilization after 2022-2023 growth phase, with mobile-first users driving engagement patterns.",
                    competitive: "Seasonal patterns favor Q4 (holiday security awareness) and Q1 (renewal cycles) for review velocity.",
                    risk: "Post-pandemic security awareness plateau may reduce organic growth - need proactive engagement strategies.",
                    strategic: "Time product launches for Q4 momentum and leverage back-to-school/work periods for enterprise messaging."
                },
                geographic: {
                    trend: "US dominates (34.2%) but international markets show higher growth rates, especially UK (12.8%) and Canada (8.9%).",
                    competitive: "Regional preferences vary: iOS bias in US/UK, Android dominance in emerging markets affects platform strategy.",
                    risk: "Regulatory changes in EU and data privacy laws in CA/UK require localized compliance approaches.",
                    strategic: "Prioritize international expansion with localized pricing and region-specific security messaging."
                }
            };

            const selectedInsights = insights[tabName] || insights.sentiment;
            
            document.getElementById('trendInsight').textContent = selectedInsights.trend;
            document.getElementById('competitiveInsight').textContent = selectedInsights.competitive;
            document.getElementById('riskInsight').textContent = selectedInsights.risk;
            document.getElementById('strategicInsight').textContent = selectedInsights.strategic;
        }

        // Initialize on page load
        window.addEventListener('load', function() {
            updateFilters();
            updateCharts();
            
            setTimeout(() => {
                document.querySelectorAll('.analytics-card').forEach((card, index) => {
                    card.style.animation = `slideIn 0.6s ease ${index * 0.1}s both`;
                });
            }, 100);
        });
    </script>
</body>
</html>