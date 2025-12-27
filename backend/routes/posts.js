const express = require('express');
const Post = require('../models/Post');
const { auth, admin } = require('../middleware/auth');

const router = express.Router();

// Get all published posts (public)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;
    
    let filter = { status: 'published' };
    
    if (category) filter.category = category;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    const posts = await Post.find(filter)
      .populate('author', 'username email profile')
      .sort({ publishedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Post.countDocuments(filter);

    res.json({
      posts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single post by slug
router.get('/:slug', async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug })
      .populate('author', 'username email profile');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Increment views
    post.views += 1;
    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new post (authenticated users)
router.post('/', auth, async (req, res) => {
  try {
    const { title, content, excerpt, category, tags, featuredImage } = req.body;

    const post = new Post({
      title,
      content,
      excerpt,
      category,
      tags,
      featuredImage,
      author: req.user.userId,
      status: req.user.role === 'admin' ? 'published' : 'pending'
    });

    if (post.status === 'published') {
      post.publishedAt = new Date();
    }

    await post.save();
    await post.populate('author', 'username email profile');

    res.status(201).json({
      message: 'Post created successfully',
      post
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update post (author or admin)
router.put('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check authorization
    if (post.author.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updates = req.body;
    
    // If regular user updates published post, set to pending
    if (req.user.role !== 'admin' && post.status === 'published') {
      updates.status = 'pending';
    }

    Object.assign(post, updates);
    await post.save();
    await post.populate('author', 'username email profile');

    res.json({
      message: 'Post updated successfully',
      post
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete post (author or admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.author.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's posts (authenticated)
router.get('/user/my-posts', auth, async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user.userId })
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;


// Get pending posts (admin only)
router.get('/admin/pending', [auth, admin], async (req, res) => {
  try {
    const posts = await Post.find({ status: 'pending' })
      .populate('author', 'username email profile')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Approve/Reject post (admin only)
router.patch('/admin/:id/status', [auth, admin], async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    
    if (!['published', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.status = status;
    post.adminNotes = adminNotes;
    
    if (status === 'published') {
      post.publishedAt = new Date();
    }

    await post.save();
    await post.populate('author', 'username email profile');

    res.json({
      message: `Post ${status} successfully`,
      post
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin dashboard stats
router.get('/admin/stats', [auth, admin], async (req, res) => {
  try {
    const stats = await Promise.all([
      Post.countDocuments({ status: 'published' }),
      Post.countDocuments({ status: 'pending' }),
      Post.countDocuments({ status: 'draft' }),
      Post.countDocuments({ status: 'rejected' })
    ]);

    res.json({
      published: stats[0],
      pending: stats[1],
      draft: stats[2],
      rejected: stats[3],
      total: stats.reduce((a, b) => a + b, 0)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
