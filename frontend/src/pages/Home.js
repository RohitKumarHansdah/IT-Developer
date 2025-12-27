import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { user } = useAuth();

  const demoPosts = [
    {
      id: 1,
      title: "Getting Started with MERN Stack Development",
      excerpt: "Learn how to build full-stack applications using MongoDB, Express, React, and Node.js. Complete beginner guide.",
      author: "John Doe",
      date: "Dec 25, 2025"
    },
    {
      id: 2,
      title: "Deploying React Apps to Vercel - Step by Step",
      excerpt: "Master the art of deploying your React applications to Vercel with CI/CD pipelines and environment variables.",
      author: "Jane Smith",
      date: "Dec 26, 2025"
    },
    {
      id: 3,
      title: "Building RESTful APIs with Express.js",
      excerpt: "Comprehensive guide to creating scalable REST APIs with authentication, validation, and error handling.",
      author: "Admin User",
      date: "Dec 27, 2025"
    }
  ];

  return (
    <div>
      <div className="mb-12 text-center">
        <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
          IT Developer Blog
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Welcome to the ultimate blogging platform built with MERN stack
        </p>
        
        {user ? (
          <Link 
            to="/dashboard" 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-lg font-semibold rounded-full hover:from-blue-600 hover:to-blue-700 shadow-xl transform hover:-translate-y-1 transition-all duration-200"
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
        {demoPosts.map(post => (
          <div key={post.id} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer">
            <div className="h-48 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"></div>
            <div className="p-8">
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                {post.date}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <span className="font-semibold text-gray-900 mr-2">{post.author}</span>
                <span className="ml-auto text-indigo-600 font-semibold group-hover:text-indigo-700">
                  Read More →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
