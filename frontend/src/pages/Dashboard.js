import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Welcome, {user?.username}!</h2>
        <p>Role: <span className="font-bold text-blue-600">{user?.role}</span></p>
      </div>
    </div>
  );
};

export default Dashboard;
