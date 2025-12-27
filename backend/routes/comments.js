const express = require('express');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const { auth, admin } = require('../middleware/auth');

const router = express.Router();

// Get comments for a post
router.get('/post/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ 
      post: req.params.postId,
      parentComment: null,
      status: 'approved'
    })
    .populate('author', 'username profile')
    .populate({
      path: 'replies',
      populate: {
        path: 'author',
        select: 'username profile'
      }
    })
    .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add comment
router.post('/', auth, async (req, res) => {
  try {
    const { content, postId, parentCommentId } = req.body;

    // Spam detection (simple word filter)
    const spamWords = ['spam', 'advertisement', 'promotion'];
    const hasSpam = spamWords.some(word => 
      content.toLowerCase().includes(word)
    );

    const comment = new Comment({
      content,
      author: req.user.userId,
      post: postId,
      parentComment: parentCommentId || null,
      status: hasSpam ? 'pending' : 'approved'
    });

    await comment.save();

    // If it's a reply, add to parent's replies array
    if (parentCommentId) {
      await Comment.findByIdAndUpdate(parentCommentId, {
        $push: { replies: comment._id }
      });
    }

    await comment.populate('author', 'username profile');

    res.status(201).json({
      message: 'Comment added successfully',
      comment
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update comment (author only)
router.put('/:id', auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    comment.content = req.body.content;
    comment.isEdited = true;
    comment.editedAt = new Date();

    await comment.save();
    await comment.populate('author', 'username profile');

    res.json({
      message: 'Comment updated successfully',
      comment
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete comment (author or admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.author.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Delete replies as well
    await Comment.deleteMany({ parentComment: comment._id });
    await Comment.findByIdAndDelete(req.params.id);

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Flag comment for moderation
router.post('/:id/flag', auth, async (req, res) => {
  try {
    const { reason } = req.body;
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if user already flagged this comment
    const alreadyFlagged = comment.flaggedBy.some(
      flag => flag.user.toString() === req.user.userId
    );

    if (alreadyFlagged) {
      return res.status(400).json({ message: 'Comment already flagged by you' });
    }

    comment.flaggedBy.push({
      user: req.user.userId,
      reason
    });

    // Auto-hide if flagged by multiple users
    if (comment.flaggedBy.length >= 3) {
      comment.status = 'flagged';
    }

    await comment.save();

    res.json({ message: 'Comment flagged successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
