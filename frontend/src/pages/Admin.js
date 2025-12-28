import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../api';

const Admin = () => {
  const { user } = useAuth();
  const [pendingPosts, setPendingPosts] = useState([
    {
      _id: '1',
      title: 'Amazing React Tutorial',
      author: { username: 'user1' },
      createdAt: new Date('2025-12-26'),
      excerpt: 'Learn React from scratch with this comprehensive guide...'
    },
    {
      _id: '2',
      title: 'Node.js Performance Tips',
      author: { username: 'user2' },
      createdAt: new Date('2025-12-25'),
      excerpt: 'Optimize your Node.js applications for maximum performance...'
    },
    {
      _id: '3',
      title: 'Database Design Best Practices',
      author: { username: 'user3' },
      createdAt: new Date('2025-12-24'),
      excerpt: 'Master database design principles for scalable applications...'
    }
  ]);
  const [stats, setStats] = useState({
    pending: 3,
    approved: 24,
    rejected: 2,
    users: 15
  });

  if (user?.role !== 'admin') {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-red-600">Access Denied</h2>
        <p className="text-gray-600 mt-2">You don't have permission to access this page</p>
      </div>
    );
  }

  const handleApprove = (id) => {
    setPendingPosts(pendingPosts.filter(p => p._id !== id));
    setStats(prev => ({ ...prev, pending: prev.pending - 1, approved: prev.approved + 1 }));
    alert('Post approved!');
  };

  const handleReject = (id) => {
    setPendingPosts(pendingPosts.filter(p => p._id !== id));
    setStats(prev => ({ ...prev, pending: prev.pending - 1, rejected: prev.rejected + 1 }));
    alert('Post rejected!');
  };

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">Manage blog posts and moderate content</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white transform hover:-translate-y-2 transition-all duration-200">
          <h3 className="text-sm font-semibold opacity-90">Pending Posts</h3>
          <p className="text-4xl font-black mt-2">{stats.pending}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white transform hover:-translate-y-2 transition-all duration-200">
          <h3 className="text-sm font-semibold opacity-90">Approved</h3>
          <p className="text-4xl font-black mt-2">{stats.approved}</p>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg p-6 text-white transform hover:-translate-y-2 transition-all duration-200">
          <h3 className="text-sm font-semibold opacity-90">Rejected</h3>
          <p className="text-4xl font-black mt-2">{stats.rejected}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white transform hover:-translate-y-2 transition-all duration-200">
          <h3 className="text-sm font-semibold opacity-90">Total Users</h3>
          <p className="text-4xl font-black mt-2">{stats.users}</p>
        </div>
      </div>

      {/* Pending Posts */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-900">Pending Posts for Review</h2>
        </div>

        <div className="divide-y divide-gray-200">
          {pendingPosts.map(post => (
            <div key={post._id} className="p-6 hover:bg-gray-50 transition">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{post.title}</h3>
                  <p className="text-gray-600">{post.excerpt}</p>
                </div>
                <div className="text-sm text-gray-600">
                  <p><strong>Author:</strong> {post.author.username}</p>
                  <p><strong>Submitted:</strong> {new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 h-fit">
                  <button
                    onClick={() => handleApprove(post._id)}
                    className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                  >
                    ✓ Approve
                  </button>
                  <button
                    onClick={() => handleReject(post._id)}
                    className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
                  >
                    ✗ Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {pendingPosts.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-gray-600 text-lg">✓ All posts have been reviewed!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
