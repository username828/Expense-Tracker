import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ExpenseHome from '../Expenses/ExpenseHome';
import ExpenseSummary from '../Expenses/ExpenseSummary';
import UserProfile from '../Profile/Profile';
import ExpenseChart from '../Reports/Charts';
import BudgetManager from '../Budget/BudgetMain';
import ExportButton from '../Reports/ExportPDF';
import PredictiveAnalytics from '../Analytics/Analytics';



const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error,setError]=useState('')
  const [activeComponent, setActiveComponent] = useState('Home');
  const navigate = useNavigate();

  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      
        const response = await fetch('http://localhost:5000/api/users/me', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        console.log(data);
        if (response.ok ) {
          setUser(data.user);
        } else {
          setError(data.message || 'Login Failed');
        }
      
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true });
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!user) return <p>Loading...</p>;

  const renderContent = () => {
    switch (activeComponent) {
      case 'Profile':
        return <UserProfile user={user} />;
      case 'Expenses':
        return <ExpenseHome />;
      case 'Reports':
        return <ExpenseChart />;
      case 'Budget Management':
        return <BudgetManager />;
      case 'Generate PDF':
        return <ExportButton />;
      case 'Expense Overview':
        return <ExpenseSummary />
        case 'Analytics':
          return <PredictiveAnalytics />
      default:
        return <UserProfile user={user} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden ${
          sidebar ? 'block' : 'hidden'
        }`}
        onClick={() => setSidebar(false)}
      ></div>
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-green-600 text-white flex flex-col items-center py-6 transform transition-transform duration-300 ${
          sidebar ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 z-50`}
      >
        {/* Close Menu Button */}
        <button
          className="absolute top-4 right-4 p-2 bg-green-600 text-white rounded-md md:hidden"
          onClick={() => setSidebar(false)}
        >
          X
        </button>

        <div className="mb-6">
          <h2 className="text-xl font-bold mt-2">{user.name}</h2>
        </div>
        <nav className="flex flex-col gap-4 w-full px-4">
          {[ 'Profile', 'Expenses', 'Reports', 'Budget Management', 'Generate PDF','Expense Overview','Analytics'].map((item) => (
            <button
              key={item}
              className={`py-2 px-4 rounded text-left ${
                activeComponent === item ? 'bg-green-800' : 'hover:bg-green-800'
              }`}
              onClick={() => {
                setActiveComponent(item);
                setSidebar(false);
              }}
            >
              {item}
            </button>
          ))}
          <button
            className="py-2 px-4 hover:bg-green-700 rounded text-left"
            onClick={handleLogout}
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      
      <div
        className={`flex-1 p-6 overflow-auto transition-all duration-300 ${
          sidebar ? 'ml-0' : 'ml-0'
        } md:ml-64`}
      >
        {/* Mobile Menu Toggle */}
        <div className="flex justify-between py-4 md:hidden">
          <button
            className="p-2 bg-green-600 text-white rounded-md"
            onClick={() => setSidebar(!sidebar)}
          >
           Menu
          </button>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
