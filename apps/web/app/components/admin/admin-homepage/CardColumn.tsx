'use client';

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip);

const cards = [
  {
    title: 'Total Earnings',
    amount: '$334,945',
    percentage: '+1.56%',
    color: '#22c55e',
    bg: 'rgba(34,197,94,0.2)',
    data: [10, 25, 15, 40, 20, 45, 50],
  },

  {
    title: 'Total Orders',
    amount: '2,802',
    percentage: '+1.24%',
    color: '#f97316',
    bg: 'rgba(249,115,22,0.2)',
    data: [15, 35, 20, 50, 30, 60, 70],
  },

  {
    title: 'Customers',
    amount: '4,945',
    percentage: '+2.12%',
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.2)',
    data: [5, 20, 10, 45, 25, 50, 65],
  },

  {
    title: 'My Balance',
    amount: '$12,780',
    percentage: '+0.86%',
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.2)',
    data: [20, 30, 18, 55, 35, 58, 75],
  },
];

export default function CardColumn() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      {cards.map((card, index) => {
        const data = {
          labels: ['1', '2', '3', '4', '5', '6', '7'],

          datasets: [
            {
              data: card.data,
              borderColor: card.color,
              backgroundColor: card.bg,
              fill: true,
              tension: 0.4,
              pointRadius: 0,
              pointHoverRadius: 4,
              pointHoverBackgroundColor: card.color,
              pointHoverBorderWidth: 3,
              borderWidth: 3,
            },
          ],
        };

        const options = {
          responsive: true,
          maintainAspectRatio: false,

          plugins: {
            legend: {
              display: false,
            },

            tooltip: {
              enabled: true,
              backgroundColor: '#111',
              titleColor: '#fff',
              bodyColor: '#fff',
              displayColors: false,
              padding: 10,

              callbacks: {
                label: function (context: any) {
                  return `${context.raw}`;
                },
              },
            },
          },

          interaction: {
            intersect: false,
            mode: 'index' as const,
          },

          scales: {
            x: {
              display: false,
            },

            y: {
              display: false,
            },
          },

          animation: {
            duration: 1500,
            easing: 'easeInOutCubic' as const,
          },
        };

        return (
          <div key={index} className="bg-white rounded-xl p-4 shadow-sm mt-4">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">{card.title}</p>

                <h2 className="text-3xl font-bold mt-1">{card.amount}</h2>
              </div>

              <span className="font-semibold" style={{ color: card.color }}>
                {card.percentage}
              </span>
            </div>

            {/* Graph */}
            <div className="h-28 mt-4">
              <Line data={data} options={options} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
