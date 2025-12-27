// Replace the existing Home component with this (add auth buttons)
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    api.get('/')
      .then(res => console.log('Backend:', res.data.message))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <div className="mb-12 text-center">
        <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
          IT Developer Blog
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Welcome to the ultimate blogging platform
        </p>
        
        {user ? (
          <Link 
            to="/dashboard" 
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-full hover:bg-blue-700 shadow-xl transform hover:-translate-y-1 transition-all duration-200"
          >
            Create New Post
            <span className="ml-2">→</span>
          </Link>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register" 
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white text-lg font-semibold rounded-full hover:from-green-600 hover:to-green-700 shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            >
              Get Started
            </Link>
            <Link 
              to="/login" 
              className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-800 text-lg font-semibold rounded-full hover:bg-gray-50 shadow-lg transform hover:-translate-y-1 transition-all duration-200"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
            <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500"></div>
            <div className="p-8">
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Published
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                Welcome to Blogging Platform
              </h3>
              <p className="text-gray-600 mb-6 line-clamp-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <Link 
                to={`/post/${i}`}
                className="text-blue-600 font-semibold hover:text-blue-800 flex items-center"
              >
                Read More <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
