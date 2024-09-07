import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

const GraphChart = () => {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: 'style-trends',
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yaxis: {
        title: {
          text: 'Number of Recommendations'
        },
        min: 0,
        max: 120,
        tickAmount: 6,
        labels: {
          formatter: function (value) {
            return value.toFixed(0);
          }
        }
      },
      stroke: {
        curve: 'smooth'
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right'
      },
      markers: {
        size: 4
      },
      title: {
        text: 'Trending Styles Over Time',
        align: 'left'
      }
    },
    series: []
  });

  useEffect(() => {
    const fetchTrendCounts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/trend-counts');
        const { trend_counts } = response.data;

        console.log('Trend counts fetched from API:', trend_counts);

        const trends = ['Casual', 'Formal', 'Sporty', 'Chic'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const series = trends.map(trend => {
          const trendData = months.map(month => trend_counts[trend][month] || 0);
          console.log(`Data for ${trend}:`, trendData); // Log data for each trend
          return {
            name: trend,
            data: trendData
          };
        });

        console.log('Processed series data:', series);

        setChartData(prevData => ({
          ...prevData,
          series
        }));
      } catch (error) {
        console.error('Error fetching trend counts:', error);
      }
    };

    fetchTrendCounts();
  }, []);

  return (
    <div className="chart">
      <Chart options={chartData.options} series={chartData.series} type="line" width={750} />
    </div>
  );
};

export default GraphChart;