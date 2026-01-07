import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";
import Login from "./components/Auth/LoginForm";
import SignUp from "./components/Auth/RegisterForm";
import Dashboard from "./components/Dashboard/Dashboard";
import LandingPage from "./components/Home/LandingPage";

function App() {
  const [cookies] = useCookies(["userToken"]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (cookies.userToken) {
      setIsAuthenticated(true);
    }
  }, [cookies]);

  console.log(isAuthenticated);
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
