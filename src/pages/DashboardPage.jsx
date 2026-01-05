import React, { useState,useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import SummaryCard from '../components/Dashboard/SummaryCard';
import EmployeeTable from '../components/Dashboard/EmployeeTable';

export default function DashboardPage() {
  const { logout } = useAuth();
  const [employees, setEmployees] = useState([]);

  const handleEmployeeChange = useCallback((updatedEmployees) => {
    setEmployees(updatedEmployees);
  }, []);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout();
    }
  };

  return (
    <div className="dashboard">
      <div className="header">
        <h1>Employee Management Dashboard</h1>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <SummaryCard employees={employees} />
      <EmployeeTable onEmployeeChange={handleEmployeeChange} />
    </div>
  );
}