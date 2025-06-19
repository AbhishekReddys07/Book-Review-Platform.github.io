import express from 'express';
import Joi from 'joi';
import { supabase } from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Validation schema
const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(50).optional(),
  email: Joi.string().email().optional(),
  avatar: Joi.string().uri().optional(),
});

// Get user profile
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Users can only access their own profile unless they're admin
    if (req.user.id !== id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('id, name, email, role, avatar, createdAt')
      .eq('id', id)
      .single();

    if (error || !user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update user profile
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Users can only update their own profile unless they're admin
    if (req.user.id !== id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const { error: validationError } = updateUserSchema.validate(req.body);
    if (validationError) {
      return res.status(400).json({ message: validationError.details[0].message });
    }

    const { name, email, avatar } = req.body;
    const updateData = {};

    if (name !== undefined) updateData.name = name.trim();
    if (email !== undefined) {
      // Check if email is already taken by another user
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('email', email.toLowerCase())
        .neq('id', id)
        .single();

      if (existingUser) {
        return res.status(400).json({ message: 'Email already taken' });
      }
      updateData.email = email.toLowerCase();
    }
    if (avatar !== undefined) updateData.avatar = avatar;

    const { data: user, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', id)
      .select('id, name, email, role, avatar, createdAt')
      .single();

    if (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ message: 'Failed to update user' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error in update user route:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get user's reviews
router.get('/:id/reviews', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;

    // Users can only access their own reviews unless they're admin
    if (req.user.id !== id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const offset = (parseInt(page) - 1) * parseInt(limit);

    const { data: reviews, error } = await supabase
      .from('reviews_with_books')
      .select('*')
      .eq('userId', id)
      .order('createdAt', { ascending: false })
      .range(offset, offset + parseInt(limit) - 1);

    if (error) {
      console.error('Error fetching user reviews:', error);
      return res.status(500).json({ message: 'Failed to fetch reviews' });
    }

    res.json(reviews || []);
  } catch (error) {
    console.error('Error in user reviews route:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;