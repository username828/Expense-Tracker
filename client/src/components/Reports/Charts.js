import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
} from "chart.js";

// Register necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const ExpenseChart = () => {
  // Access expenses from the Redux store
  const expenses = useSelector((state) => state.expense.expenses);

  // Group expenses by category and calculate total amounts
  const categoryData = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categoryData), // Categories
    datasets: [
      {
        label: "Expenses by Category",
        data: Object.values(categoryData), // Amounts
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Expenses by Category",
      },
    },
  };

  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="w-3/4">
        <h2 className="text-xl font-semibold mb-4">Bar Chart</h2>
        <Bar data={data} options={options} />
      </div>
      <div className="w-3/4">
        <h2 className="text-xl font-semibold mb-4">Line Chart</h2>
        <Line data={data} options={options} />
      </div>
      <div className="w-3/4">
        <h2 className="text-xl font-semibold mb-4">Pie Chart</h2>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default ExpenseChart;
