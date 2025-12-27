import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({});
  const [pendingPosts, setPendingPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const [statsResponse, pendingResponse] = await Promise.all([
        axios.get('/api/posts/admin/stats'),
        axios.get('/api/posts/admin/pending')
      ]);

      setStats(statsResponse.data);
      setPendingPosts(pendingResponse.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostAction = async (postId, status, adminNotes = '') => {
    try {
      await axios.patch(`/api/posts/admin/${postId}/status`, {
        status,
        adminNotes
      });

      // Refresh data
      fetchDashboardData();
    } catch (error) {
      console.error('Error updating post status:', error);
    }
  };

  if (!user || user.role !== 'admin') {
    return <div>Access denied. Admin privileges required.</div>;
  }

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div className="admin-dashboard">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-500 text-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold">Published Posts</h3>
            <p className="text-3xl font-bold">{stats.published}</p>
          </div>
          <div className="bg-yellow-500 text-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold">Pending Approval</h3>
            <p className="text-3xl font-bold">{stats.pending}</p>
          </div>
          <div className="bg-gray-500 text-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold">Draft Posts</h3>
            <p className="text-3xl font-bold">{stats.draft}</p>
          </div>
          <div className="bg-red-500 text-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold">Rejected Posts</h3>
            <p className="text-3xl font-bold">{stats.rejected}</p>
          </div>
        </div>

        {/* Pending Posts */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-semibold">Posts Pending Approval</h2>
          </div>
          
          <div className="p-6">
            {pendingPosts.length === 0 ? (
              <p className="text-gray-500">No posts pending approval</p>
            ) : (
              <div className="space-y-6">
                {pendingPosts.map(post => (
                  <div key={post._id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">{post.title}</h3>
                        <p className="text-gray-600">
                          by {post.author.username} • {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">
                        {post.status}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{post.excerpt}</p>
                    
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handlePostAction(post._id, 'published')}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => {
                          const notes = prompt('Rejection reason (optional):');
                          handlePostAction(post._id, 'rejected', notes);
                        }}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => window.open(`/post/${post.slug}`, '_blank')}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                      >
                        Preview
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
