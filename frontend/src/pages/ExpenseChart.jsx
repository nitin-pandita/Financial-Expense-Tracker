import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ExpenseCharts = ({ expenses }) => {
  const categories = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(categories),
    datasets: [
      {
        label: "Expenses by Category",
        data: Object.values(categories),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow better control of height
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14, // Adjust legend font size
          },
        },
      },
      title: {
        display: true,
        text: "Expenses Bar Chart",
        font: {
          size: 18, // Chart title font size
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
    elements: {
      bar: {
        borderWidth: 2,
        barThickness: 50, // Increase bar thickness
      },
    },
  };

  return (
    <div className="w-full bg-gray-50 p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-700 mb-5">
        Expense Analytics
      </h2>
      <div className="flex justify-center">
        <div className="w-full lg:w-3/4" style={{ height: "400px" }}>
          <Bar data={chartData} options={barOptions} />
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <div
          className="w-full lg:w-3/4"
          style={{ height: "400px", maxWidth: "500px" }} // Adjust size and limit width
        >
          <Pie
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false, // Allow better control of height
              plugins: {
                legend: {
                  position: "top",
                  labels: {
                    font: {
                      size: 14, // Adjust font size for legend
                    },
                  },
                },
                title: {
                  display: true,
                  text: "Expenses Pie Chart",
                  font: {
                    size: 18, // Adjust title font size
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ExpenseCharts;
