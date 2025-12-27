import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Welcome, {user?.username}!</h2>
        <p className="text-gray-600 mb-6">Role: <span className="font-semibold text-blue-600">{user?.role}</span></p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <h3 className="text-3xl font-bold text-blue-600 mb-2">Create Post</h3>
            <p className="text-blue-700">Write your first blog post</p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg text-center">
            <h3 className="text-3xl font-bold text-green-600 mb-2">My Posts</h3>
            <p className="text-green-700">Manage your published posts</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg text-center">
            <h3 className="text-3xl font-bold text-purple-600 mb-2">Profile</h3>
            <p className="text-purple-700">Update your profile</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
