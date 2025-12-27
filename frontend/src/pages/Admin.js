import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Admin = () => {
  const { user } = useAuth();
  if (user?.role !== 'admin') {
    return <div className="text-center p-20 text-red-500 text-xl">Admin access required</div>;
  }
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-blue-100 p-6 rounded-lg text-center">
          <h3 className="text-lg font-semibold">Published</h3>
          <p className="text-3xl font-bold text-blue-600">12</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg text-center">
          <h3 className="text-lg font-semibold">Pending</h3>
          <p className="text-3xl font-bold text-yellow-600">3</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg text-center">
          <h3 className="text-lg font-semibold">Draft</h3>
          <p className="text-3xl font-bold text-gray-600">8</p>
        </div>
        <div className="bg-red-100 p-6 rounded-lg text-center">
          <h3 className="text-lg font-semibold">Rejected</h3>
          <p className="text-3xl font-bold text-red-600">1</p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
