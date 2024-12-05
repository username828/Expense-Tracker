import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getMovingAverage, getLinearRegressionPrediction } from '../../utils/PredictiveAnalysis'
const PredictiveAnalytics = () => {
  const expenses = useSelector((state) => state.expense.expenses);
  const [movingAverage, setMovingAverage] = useState(0);
  const [linearRegressionPrediction, setLinearRegressionPrediction] = useState(0);

  useEffect(() => {
    if (expenses.length > 0) {
      setMovingAverage(getMovingAverage(expenses, 3)); // Calculate 3-month moving average
      setLinearRegressionPrediction(getLinearRegressionPrediction(expenses)); // Predict next month's expenses
    }
  }, [expenses]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-3/4 mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Predictive Analytics</h1>
      {expenses.length > 0 ? (
        <>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Moving Average (Last 3 Months)</h2>
            <p className="text-lg">Rs. {movingAverage.toFixed(2)}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Linear Regression Prediction</h2>
            <p className="text-lg">
              Predicted Expense for Next Month: Rs. {linearRegressionPrediction.toFixed(2)}
            </p>
          </div>
        </>
      ) : (
        <p className="text-center text-lg">No expense data available to analyze.</p>
      )}
    </div>
  );
};

export default PredictiveAnalytics;
