import React from "react";
import { useSelector } from "react-redux";
import { generatePDF } from "../../utils/PDF";

const ExportButton = () => {
  const { expenses, groupedExpenses } = useSelector((state) => state.expense);
  console.log("Expenses",expenses)
  console.log("Grouped",groupedExpenses)


  const totalExpense = expenses.reduce((acc, exp) => acc + exp.amount, 0);

  const handleExport = () => {
    // Only read the data, do not modify the Redux state
    generatePDF([...expenses], [...groupedExpenses], totalExpense);
  };
  

  return (
    <>
    <button
      onClick={handleExport}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      Export Report
    </button>
    </>

  );
};

export default ExportButton;
