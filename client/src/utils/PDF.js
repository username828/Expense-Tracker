import jsPDF from "jspdf";

export const generatePDF = (expenses, groupedExpenses, totalExpense) => {
    console.log("Expenses in PDF:", expenses);
    console.log("Grouped in PDF:", groupedExpenses);
    console.log("Total in PDF:", totalExpense);
    
  const doc = new jsPDF();

  // Title
  doc.setFontSize(16);
  doc.text("Expense Report", 10, 10);

  // Add grouped expenses
  doc.setFontSize(12);
  doc.text("Expenses by Category:", 10, 20);
  groupedExpenses.forEach((item, index) => {
    doc.text(
      `${index + 1}. ${item.category}: Rs.${item.amount}`,
      10,
      30 + index * 10
    );
  });

  // Total Expense
  doc.text(`Total Expense: Rs.${totalExpense}`, 10, 30 + groupedExpenses.length * 10);

  // Save the PDF
  doc.save("Expense_Report.pdf");
};
