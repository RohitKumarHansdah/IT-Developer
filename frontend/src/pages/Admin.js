import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Admin = () => {
  const { user } = useAuth();

  if (user?.role !== 'admin') {
    return <div className="text-center py-20 text-red-600 text-2xl">Admin access required</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8 rounded-2xl shadow-xl">
          <h3 className="text-3xl font-bold mb-2">Published</h3>
          <p className="text-4xl font-black">12</p>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-8 rounded-2xl shadow-xl">
          <h3 className="text-3xl font-bold mb-2">Pending</h3>
          <p className="text-4xl font-black">3</p>
        </div>
        <div className="bg-gradient-to-r from-gray-500 to-gray-600 text-white p-8 rounded-2xl shadow-xl">
          <h3 className="text-3xl font-bold mb-2">Draft</h3>
          <p className="text-4xl font-black">8</p>
        </div>
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-8 rounded-2xl shadow-xl">
          <h3 className="text-3xl font-bold mb-2">Rejected</h3>
          <p className="text-4xl font-black">1</p>
        </div>
      </div>
      
      <div className="bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-semibold mb-6">Pending Posts for Approval</h2>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">Post Title {i + 1}</h3>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  Pending
                </span>
              </div>
              <p className="text-gray-600 mb-4">Post excerpt goes here...</p>
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Approve
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
