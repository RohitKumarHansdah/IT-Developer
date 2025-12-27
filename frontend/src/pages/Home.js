import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    api.get('/api/posts')
      .then(res => setPosts(res.data.posts || []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading posts...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Latest Blog Posts
        </h1>
        {user && (
          <Link 
            to="/dashboard" 
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            Create New Post
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <div key={post._id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span>By {post.author?.username || 'Unknown'}</span>
              </div>
              <h2 className="text-2xl font-bold mb-4">
                <Link to={`/post/${post.slug}`} className="hover:text-blue-600">
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-6">{post.excerpt}</p>
              <Link 
                to={`/post/${post.slug}`}
                className="text-blue-600 font-semibold hover:text-blue-800"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No posts yet. {user ? 'Create the first one!' : 'Stay tuned!'}
        </div>
      )}
    </div>
  );
};

export default Home;
