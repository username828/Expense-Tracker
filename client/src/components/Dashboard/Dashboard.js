import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import ExpenseHome from '../Expenses/ExpenseHome';
import UserProfile from '../Profile/Profile';
import ExpenseChart from '../Reports/Charts';
import BudgetManager from '../Budget/BudgetForm';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [activeComponent, setActiveComponent] = useState('Home');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users/me', {
          method: 'GET',
          credentials: 'include'
        });
        const data = await response.json();
        console.log(data)
        if (response.ok) {
          setUser(data.user);
        } else {
          throw new Error(data.message || 'Failed to fetch user');
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
        alert('Error fetching user data. Please try again.');
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async() => {
    try{
      const response=await axios.post('http://localhost:5000/api/logout',{},{withCredentials:true});
        
      navigate('/login');
      
    } catch(error){
      console.error("Logout failed:", error);
    }

    
  };

  if (!user) return <p>Loading...</p>;

  const renderContent = () => {
    switch (activeComponent) {
      case 'Profile':
        return <UserProfile user={user}/>;
      case 'Expenses':
        return <ExpenseHome/>;
      case 'Reports':
        return <ExpenseChart/>
      case 'Budget':
        return <BudgetManager/>
      case 'Settings':
        return ;
      default:
        return <ExpenseHome/>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-600 text-white flex flex-col items-center py-6">
        <div className="mb-6">
          <img
            src={user.avatar || "https://via.placeholder.com/100"}
            alt="User Avatar"
            className="rounded-full w-24 h-24"
          />
          <h2 className="text-xl font-bold mt-2">{user.name}</h2>
        </div>
        <nav className="flex flex-col gap-4 w-full px-4">
          {['Profile', 'Expenses', 'Reports','Budget','Settings'].map((item) => (
            <button
              key={item}
              className={`py-2 px-4 rounded text-left ${
                activeComponent === item ? 'bg-blue-800' : 'hover:bg-blue-700'
              }`}
              onClick={() => setActiveComponent(item)}
            >
              {item}
            </button>
          ))}
          <button
            className="py-2 px-4 hover:bg-red-700 rounded text-left"
            onClick={handleLogout}
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-auto">{renderContent()}</div>
    </div>
  );
};

export default Dashboard;

