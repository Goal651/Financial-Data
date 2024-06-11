/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import React from 'react';
import Login from './components/login';
import SignUp from './components/signup';
import HomePage from './components/home';
import Budget from './components/budget';
import AdminPage from './components/admin';
import BudgetForm from './components/budgetForm';
import './App.css';


function App() {
  const noMatchMessage = "Oops! Page not found.";

  const CheckTokenExpiry = () => {
    const token = localStorage.getItem('token');
    const loginTimestamp = localStorage.getItem('loginTimestamp');

    if (token && loginTimestamp) {
      const currentTime = Date.now();
      const timeElapsed = currentTime - parseInt(loginTimestamp, 10);

      // 12 hours in milliseconds
      const twelveHours = 12 * 60 * 60 * 1000;

      if (timeElapsed >= twelveHours) {
        localStorage.removeItem('token');
        localStorage.removeItem('loginTimestamp');
        window.location.href = '/'; // Redirect to login page
      }
    }
  };

  useEffect(() => {
    CheckTokenExpiry();
  }, []);
  return (
    <Router>
      <Routes>
        {/* <Route path="/login" element={<Login/>} /> */}
        <Route path="/create-account" element={<SignUp />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/budgets" element={<Budget />} />
        <Route path='/admin' element={<AdminPage />} />
        <Route path='budgets/edit-budget' element={<BudgetForm />} />
        <Route path='budgets/add-budget' element={<BudgetForm />} />
        <Route path='budgets/delete-budget' element={<BudgetForm />} />
        <Route path="*" element={<div>{noMatchMessage}</div>} />
      </Routes>
    </Router>
  );
}

export default App;
