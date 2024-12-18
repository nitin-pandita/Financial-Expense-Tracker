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
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Expenses Bar Chart",
      },
    },
  };

  return (
    <div>
      <h2>Expense Analytics</h2>
      <div style={{ width: "50%", margin: "0 auto" }}>
        <Bar data={chartData} options={barOptions} />
      </div>
      <div style={{ width: "50%", margin: "20px auto" }}>
        <Pie data={chartData} />
      </div>
    </div>
  );
};

export default ExpenseCharts;
