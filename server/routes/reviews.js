import express from 'express';
import Joi from 'joi';
import { supabase } from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Validation schema
const reviewSchema = Joi.object({
  bookId: Joi.string().uuid().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().min(10).max(1000).required(),
});

// Get reviews for a book
router.get('/', async (req, res) => {
  try {
    const { bookId, page = 1, limit = 10 } = req.query;

    if (!bookId) {
      return res.status(400).json({ message: 'bookId is required' });
    }

    const offset = (parseInt(page) - 1) * parseInt(limit);

    const { data: reviews, error } = await supabase
      .from('reviews_with_users')
      .select('*')
      .eq('bookId', bookId)
      .order('createdAt', { ascending: false })
      .range(offset, offset + parseInt(limit) - 1);

    if (error) {
      console.error('Error fetching reviews:', error);
      return res.status(500).json({ message: 'Failed to fetch reviews' });
    }

    res.json(reviews || []);
  } catch (error) {
    console.error('Error in reviews route:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add new review
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { error: validationError } = reviewSchema.validate(req.body);
    if (validationError) {
      return res.status(400).json({ message: validationError.details[0].message });
    }

    const { bookId, rating, comment } = req.body;

    // Check if user already reviewed this book
    const { data: existingReview } = await supabase
      .from('reviews')
      .select('id')
      .eq('bookId', bookId)
      .eq('userId', req.user.id)
      .single();

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this book' });
    }

    // Verify book exists
    const { data: book, error: bookError } = await supabase
      .from('books')
      .select('id')
      .eq('id', bookId)
      .single();

    if (bookError || !book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Create review
    const { data: review, error } = await supabase
      .from('reviews')
      .insert([
        {
          bookId,
          userId: req.user.id,
          rating,
          comment: comment.trim(),
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating review:', error);
      return res.status(500).json({ message: 'Failed to create review' });
    }

    // Fetch the complete review with user info
    const { data: completeReview, error: fetchError } = await supabase
      .from('reviews_with_users')
      .select('*')
      .eq('id', review.id)
      .single();

    if (fetchError) {
      console.error('Error fetching complete review:', fetchError);
      return res.status(500).json({ message: 'Review created but failed to fetch complete data' });
    }

    res.status(201).json(completeReview);
  } catch (error) {
    console.error('Error in create review route:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update review
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    // Validate input
    const updateSchema = Joi.object({
      rating: Joi.number().integer().min(1).max(5).optional(),
      comment: Joi.string().min(10).max(1000).optional(),
    });

    const { error: validationError } = updateSchema.validate({ rating, comment });
    if (validationError) {
      return res.status(400).json({ message: validationError.details[0].message });
    }

    // Check if review exists and belongs to user
    const { data: existingReview, error: fetchError } = await supabase
      .from('reviews')
      .select('*')
      .eq('id', id)
      .eq('userId', req.user.id)
      .single();

    if (fetchError || !existingReview) {
      return res.status(404).json({ message: 'Review not found or unauthorized' });
    }

    // Update review
    const updateData = {};
    if (rating !== undefined) updateData.rating = rating;
    if (comment !== undefined) updateData.comment = comment.trim();

    const { data: review, error } = await supabase
      .from('reviews')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating review:', error);
      return res.status(500).json({ message: 'Failed to update review' });
    }

    res.json(review);
  } catch (error) {
    console.error('Error in update review route:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete review
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if review exists and belongs to user (or user is admin)
    const { data: existingReview, error: fetchError } = await supabase
      .from('reviews')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !existingReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Allow deletion if user owns the review or is admin
    if (existingReview.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized to delete this review' });
    }

    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting review:', error);
      return res.status(500).json({ message: 'Failed to delete review' });
    }

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error in delete review route:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;