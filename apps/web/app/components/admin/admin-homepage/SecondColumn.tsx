'use client';

import React from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { ArcElement } from 'chart.js';

import { Chart } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

const SecondColumn = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

    datasets: [
      {
        type: 'bar' as const,
        label: 'Revenue',
        data: [45, 30, 55, 45, 33, 92, 80, 45, 58, 85, 81, 96],

        backgroundColor: '#ff8743',
        borderRadius: 8,
        barThickness: 24,
      },

      {
        type: 'line' as const,
        label: 'Orders',
        data: [18, 20, 38, 19, 22, 48, 30, 18, 31, 12, 47, 34],

        borderColor: '#8b5cf6',
        backgroundColor: '#8b5cf6',

        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#8b5cf6',
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: 'top' as const,

        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },

      tooltip: {
        enabled: true,
        backgroundColor: '#111827',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 12,
      },
    },

    interaction: {
      intersect: false,
      mode: 'index' as const,
    },

    scales: {
      x: {
        grid: {
          display: false,
        },

        border: {
          display: false,
        },
      },

      y: {
        beginAtZero: true,

        grid: {
          color: '#f1f5f9',
        },

        border: {
          display: false,
        },

        ticks: {
          stepSize: 20,
        },
      },
    },

    animation: {
      duration: 1800,
      easing: 'easeInOutQuart' as const,
    },
  };

  return (
    <div className="max-w-[1450px] mx-auto px-3 py-4">
      <div className="grid sm:grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4">
        {/* Revenue Chart */}
        <div className="col-span-4 lg:col-span-6 bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-2xl font-bold">Revenue</h2>

              <p className="text-gray-500 text-sm mt-1">Monthly analytics overview</p>
            </div>

            <select className="border rounded-lg px-3 py-2 text-sm outline-none">
              <option>Yearly</option>
              <option>Monthly</option>
              <option>Weekly</option>
            </select>
          </div>

          <div className="h-[400px]">
            <Chart type="bar" data={data} options={options} />
          </div>
        </div>

        {/* Second Card */}
        <div className="col-span-4 lg:col-span-3 bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-2xl font-bold">Promotional Sales</h2>

              <p className="text-gray-500 text-sm mt-1">Visitors analytics</p>
            </div>

            <select className="border rounded-lg px-3 py-2 text-sm outline-none">
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>

          <div className="mb-5">
            <h3 className="text-4xl font-bold">7,802</h3>

            <p className="text-green-500 font-medium mt-1">+0.56%</p>
          </div>

          <div className="h-[300px] flex items-center justify-center">
            <Doughnut
              data={{
                labels: ['Social Media', 'Website', 'Store'],

                datasets: [
                  {
                    data: [45, 25, 30],

                    backgroundColor: ['#ff8743', '#3b82f6', '#8b5cf6'],

                    borderWidth: 0,
                    // cutout: '70%',
                  },
                ],
              }}
              options={{
                responsive: true,

                plugins: {
                  legend: {
                    position: 'bottom',

                    labels: {
                      usePointStyle: true,
                      pointStyle: 'circle',
                      padding: 20,
                    },
                  },
                },

                animation: {
                  animateRotate: true,
                  duration: 2000,
                },
              }}
            />
          </div>
        </div>

        {/* Third Card */}
        <div className="col-span-4 lg:col-span-3 bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold">Top Sale</h2>

            <select className="border rounded-lg px-3 py-2 text-sm outline-none">
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>

          <div className="space-y-5">
            {[
              {
                name: 'Neptune Longsleeve',
                price: '$138',
                sales: '952',
                image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
              },

              {
                name: 'Ribbed Tank Top',
                price: '$108',
                sales: '952',
                image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1',
              },

              {
                name: 'Oversized Motif',
                price: '$98',
                sales: '882',
                image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b',
              },

              {
                name: 'V-neck Linen T-shirt',
                price: '$158',
                sales: '869',
                image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c',
              },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover"
                  />

                  <div>
                    <h3 className="font-semibold text-sm">{item.name}</h3>

                    <p className="text-gray-500 text-sm">{item.price}</p>
                  </div>
                </div>

                <div className="text-right">
                  <h3 className="font-bold">{item.sales}</h3>

                  <p className="text-gray-500 text-sm">Sales</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondColumn;
