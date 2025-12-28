import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const BlogDetail = () => {
  const { slug } = useParams();
  const { user } = useAuth();
  const [comments, setComments] = useState([
    {
      _id: '1',
      author: { username: 'Jane Doe' },
      content: 'Great post! Very informative.',
      createdAt: new Date('2025-12-27')
    }
  ]);
  const [newComment, setNewComment] = useState('');

  const post = {
    _id: '1',
    title: 'Getting Started with MERN Stack',
    content: `
      ## Introduction to MERN Stack

      The MERN stack is a powerful combination of technologies that allows you to build full-stack web applications using JavaScript across the entire stack.

      ### What is MERN?
      - **M**ongoDB: NoSQL database
      - **E**xpress: Backend framework
      - **R**eact: Frontend library
      - **N**ode.js: Runtime environment

      ### Benefits of MERN Stack
      1. Single language for frontend and backend
      2. Excellent community support
      3. Easy to learn for JavaScript developers
      4. Scalable and flexible architecture

      The MERN stack is perfect for building modern web applications.
    `,
    author: { username: 'John Doe', _id: '1' },
    createdAt: new Date('2025-12-27'),
    updatedAt: new Date('2025-12-27'),
    status: 'published',
    likes: 24,
    viewCount: 156
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please log in to comment');
      return;
    }
    if (!newComment.trim()) return;

    const comment = {
      _id: Date.now().toString(),
      author: { username: user.username },
      content: newComment,
      createdAt: new Date()
    };

    setComments([...comments, comment]);
    setNewComment('');
  };

  return (
    <article className="max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center space-x-2 text-sm">
        <Link to="/" className="text-blue-600 hover:text-blue-700">Home</Link>
        <span className="text-gray-400">/</span>
        <span className="text-gray-600">{post.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-12">
        <div className="mb-6">
          <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-4">
            {post.status}
          </span>
        </div>
        
        <h1 className="text-5xl font-black text-gray-900 mb-6">
          {post.title}
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b-2 border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500"></div>
            <div>
              <p className="font-semibold text-gray-900">{post.author.username}</p>
              <p className="text-sm text-gray-600">
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <span>👁️ {post.viewCount} views</span>
            <span>❤️ {post.likes} likes</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="prose prose-lg max-w-none mb-12">
        <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>
      </div>

      {/* Comments Section */}
      <section className="border-t-2 border-gray-200 pt-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Comments ({comments.length})
        </h2>

        {/* Comment Form */}
        {user ? (
          <form onSubmit={handleCommentSubmit} className="mb-10 bg-gray-50 rounded-lg p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Add a comment
            </label>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
              placeholder="Share your thoughts..."
            />
            <button
              type="submit"
              className="mt-3 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Post Comment
            </button>
          </form>
        ) : (
          <div className="mb-10 p-6 bg-blue-50 border border-blue-200 rounded-lg text-center">
            <p className="text-blue-800">
              <Link to="/login" className="font-semibold hover:underline">Sign in</Link> to comment
            </p>
          </div>
        )}

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map(comment => (
            <div key={comment._id} className="pb-6 border-b border-gray-200">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900">{comment.author.username}</h4>
                    <p className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-gray-700 mt-2">{comment.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related Posts */}
      <section className="mt-20 pt-12 border-t-2 border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map(i => (
            <Link key={i} to="/" className="group">
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
                <div className="h-40 bg-gradient-to-br from-blue-400 to-purple-500"></div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition line-clamp-2">
                    Related Blog Post {i}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    Short excerpt of the related post...
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
};

export default BlogDetail;
