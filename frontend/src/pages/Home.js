import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../api';

const Home = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      // For now, using demo data since backend might not have endpoints
      const demoPosts = [
        {
          _id: '1',
          slug: 'getting-started-mern',
          title: 'Getting Started with MERN Stack',
          excerpt: 'Learn how to build full-stack applications using MongoDB, Express, React, and Node.js.',
          content: 'Complete guide to MERN...',
          author: { username: 'John Doe' },
          createdAt: new Date('2025-12-27'),
          status: 'published',
          likes: 24
        },
        {
          _id: '2',
          slug: 'react-hooks-guide',
          title: 'React Hooks Complete Guide',
          excerpt: 'Master React Hooks and improve your React development skills.',
          content: 'Understanding useState, useEffect...',
          author: { username: 'Jane Smith' },
          createdAt: new Date('2025-12-26'),
          status: 'published',
          likes: 18
        },
        {
          _id: '3',
          slug: 'nodejs-best-practices',
          title: 'Node.js Best Practices 2025',
          excerpt: 'Industry-standard practices for building secure Node.js applications.',
          content: 'Security, performance, error handling...',
          author: { username: 'Admin User' },
          createdAt: new Date('2025-12-25'),
          status: 'published',
          likes: 32
        }
      ];
      setPosts(demoPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="text-center mb-16 py-12">
        <h1 className="text-5xl md:text-6xl font-black mb-6">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            IT Developer
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Welcome to our platform where developers share knowledge, learn from each other,
          and build amazing projects together.
        </p>
        {user ? (
          <Link
            to="/create-post"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
          >
            ✍️ Create Your First Post
          </Link>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white text-lg font-semibold rounded-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-800 text-lg font-semibold rounded-lg hover:bg-gray-50 transform hover:-translate-y-1 transition-all duration-200"
            >
              Sign In
            </Link>
          </div>
        )}
      </section>

      {/* Posts Grid */}
      <section>
        <h2 className="text-4xl font-bold text-gray-900 mb-12">Latest Blog Posts</h2>
        
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No posts yet. Be the first to share!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <Link key={post._id} to={`/post/${post.slug}`}>
                <article className="group h-full bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                  {/* Card Header */}
                  <div className="h-40 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                        {post.status}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500"></div>
                        <span className="text-sm font-medium text-gray-900">
                          {post.author?.username}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        ❤️ {post.likes || 0}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
