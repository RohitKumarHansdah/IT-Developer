import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../api';

const Dashboard = () => {
  const { user } = useAuth();
  const [userPosts, setUserPosts] = useState([]);
  const [stats, setStats] = useState({ total: 0, published: 0, draft: 0, pending: 0 });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      // Demo data
      const demoData = [
        {
          _id: '1',
          title: 'My First Blog Post',
          status: 'draft',
          createdAt: new Date('2025-12-27'),
          views: 0
        },
        {
          _id: '2',
          title: 'React Tips and Tricks',
          status: 'pending',
          createdAt: new Date('2025-12-26'),
          views: 0
        }
      ];
      setUserPosts(demoData);
      setStats({
        total: demoData.length,
        published: 1,
        draft: 1,
        pending: demoData.filter(p => p.status === 'pending').length
      });
    } catch (error) {
      console.error('Error loading dashboard:', error);
    }
  };

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black mb-2">
          Welcome back, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{user?.username}</span>!
        </h1>
        <p className="text-gray-600">Manage your blog posts and content</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white transform hover:-translate-y-2 transition-all duration-200">
          <h3 className="text-sm font-semibold opacity-90">Total Posts</h3>
          <p className="text-4xl font-black mt-2">{stats.total}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white transform hover:-translate-y-2 transition-all duration-200">
          <h3 className="text-sm font-semibold opacity-90">Published</h3>
          <p className="text-4xl font-black mt-2">{stats.published}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white transform hover:-translate-y-2 transition-all duration-200">
          <h3 className="text-sm font-semibold opacity-90">Pending</h3>
          <p className="text-4xl font-black mt-2">{stats.pending}</p>
        </div>
        <div className="bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl shadow-lg p-6 text-white transform hover:-translate-y-2 transition-all duration-200">
          <h3 className="text-sm font-semibold opacity-90">Draft</h3>
          <p className="text-4xl font-black mt-2">{stats.draft}</p>
        </div>
      </div>

      {/* Create Post Button */}
      <div className="mb-12">
        <Link
          to="/create-post"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
        >
          ✍️ Create New Post
        </Link>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Your Posts</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Title</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Created</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userPosts.map(post => (
                <tr key={post._id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-gray-900 font-medium">{post.title}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      post.status === 'published' ? 'bg-green-100 text-green-800' :
                      post.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">Edit</button>
                      <button className="text-red-600 hover:text-red-800 font-medium text-sm">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {userPosts.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-gray-600 text-lg mb-4">No posts yet</p>
            <Link
              to="/create-post"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Create Your First Post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
