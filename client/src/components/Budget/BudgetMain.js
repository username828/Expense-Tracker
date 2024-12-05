import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BudgetForm from './BudgetForm';
import EditBudgetForm from "./EditBudgetForm";
import { deleteBudget, setBudgets } from "../../redux/BudgetSlice";
import axios from "axios";


const BudgetManager = () => {
    const budgets = useSelector((state) => state.budget.budgets) || [];
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [viewBudgets, setViewBudgets] = useState(false);

    const fetchBudgets = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/get-budgets', { withCredentials: true });
            dispatch(setBudgets(response.data));
        } catch (error) {
            console.error("Failed to fetch budgets:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBudgets();
    }, []);

    const [editBudget, setEditBudget] = useState(null); // To track the budget being edited

    const handleDelete=async(id)=>{
        try{
            await axios.delete(`http://localhost:5000/api/delete-budget/${id}`,
                {withCredentials:true}
                
            )
            dispatch(deleteBudget(id))
        }catch(error){
            console.error("Error deleting budget:", error);
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-emerald-900">Budget Management</h2>
            
            {loading ? (
                <p className="text-center text-gray-600">Loading...</p>
            ) : (
                <div className="flex flex-wrap justify-center gap-4 w-full"> 
                    {/* Using gap-4 ensures space between buttons */}
                    <button
                        className="px-4 py-2 text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg text-sm sm:text-base md:text-lg"
                        onClick={() => setShowForm((prev) => !prev)}
                        aria-label="Add Budget"
                    >
                        {showForm ? "Close Form" : "Add Budget"}
                    </button>
                    <button
                        className="px-4 py-2 text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg text-sm sm:text-base md:text-lg"
                        onClick={() => setViewBudgets((prev) => !prev)}
                        aria-label="View Budgets"
                    >
                        {viewBudgets ? "Hide Budgets" : "View Budgets"}
                    </button>
                </div>
            )}
    
            {showForm && (
                <div className="p-4 rounded-lg">
                    <BudgetForm />
                </div>
            )}
    
            {viewBudgets && (
                <div className="p-4 space-y-2 bg-white rounded-lg shadow-inner">
                    <h3 className="text-lg font-semibold text-emerald-800 text-center">Budgets</h3>
                    {budgets.length > 0 ? (
                        budgets.map((budget) => (
                            <div key={budget._id} className="flex flex-wrap justify-between items-center p-2 bg-white rounded shadow-md">
                                <div className="flex-1">
                                    <span className="font-medium text-gray-800">{budget.category}</span>
                                    <span className="font-bold text-emerald-700 ml-4">
                                        Rs.{budget.amount}
                                    </span>
                                </div>
                                <div className="flex  gap-2 "> 
                                    <button
                                        className="max-w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors text-sm sm:text-base"
                                        onClick={() => setEditBudget(budget)}
                                    >
                                        Edit
                                    </button>
    
                                    <button
                                        className="max-w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors text-sm sm:text-base"
                                        onClick={() => handleDelete(budget._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">No budgets available.</p>
                    )}
                </div>
            )}
    
            {editBudget && (
                <EditBudgetForm
                    budget={editBudget}
                    onClose={() => setEditBudget(null)}
                />
            )}
        </div>
    );
    
    
    
};

export default BudgetManager;

