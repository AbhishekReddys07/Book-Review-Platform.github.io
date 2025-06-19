import express from 'express';
import Joi from 'joi';
import { supabase } from '../config/database.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Validation schema
const bookSchema = Joi.object({
  title: Joi.string().min(1).max(200).required(),
  author: Joi.string().min(1).max(100).required(),
  description: Joi.string().min(10).max(2000).required(),
  genre: Joi.string().min(1).max(50).required(),
  isbn: Joi.string().optional(),
  publishedDate: Joi.date().required(),
  coverImage: Joi.string().uri().required(),
  pages: Joi.number().integer().min(1).optional(),
  publisher: Joi.string().max(100).optional(),
});

// Get all books with pagination and filtering
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      search = '',
      genre = '',
      featured = false,
      sortBy = 'title',
      sortOrder = 'asc'
    } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(limit);

    let query = supabase
      .from('books_with_ratings')
      .select('*', { count: 'exact' });

    // Apply search filter
    if (search) {
      query = query.or(`title.ilike.%${search}%,author.ilike.%${search}%,description.ilike.%${search}%`);
    }

    // Apply genre filter
    if (genre) {
      query = query.eq('genre', genre);
    }

    // Apply featured filter
    if (featured === 'true') {
      query = query.gte('rating', 4.0);
    }

    // Apply sorting
    const validSortFields = ['title', 'author', 'rating', 'publishedDate', 'reviewCount'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'title';
    const order = sortOrder === 'desc' ? false : true;
    
    query = query.order(sortField, { ascending: order });

    // Apply pagination
    query = query.range(offset, offset + parseInt(limit) - 1);

    const { data: books, error, count } = await query;

    if (error) {
      console.error('Error fetching books:', error);
      return res.status(500).json({ message: 'Failed to fetch books' });
    }

    const totalPages = Math.ceil(count / parseInt(limit));

    res.json({
      books: books || [],
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count || 0,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Error in books route:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get single book by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { data: book, error } = await supabase
      .from('books_with_ratings')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add new book (admin only)
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { error: validationError } = bookSchema.validate(req.body);
    if (validationError) {
      return res.status(400).json({ message: validationError.details[0].message });
    }

    const bookData = {
      ...req.body,
      publishedDate: new Date(req.body.publishedDate).toISOString(),
    };

    const { data: book, error } = await supabase
      .from('books')
      .insert([bookData])
      .select()
      .single();

    if (error) {
      console.error('Error creating book:', error);
      return res.status(500).json({ message: 'Failed to create book' });
    }

    res.status(201).json(book);
  } catch (error) {
    console.error('Error in create book route:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update book (admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate only provided fields
    const updateSchema = bookSchema.fork(Object.keys(bookSchema.describe().keys), (schema) => schema.optional());
    const { error: validationError } = updateSchema.validate(req.body);
    
    if (validationError) {
      return res.status(400).json({ message: validationError.details[0].message });
    }

    const updateData = { ...req.body };
    if (updateData.publishedDate) {
      updateData.publishedDate = new Date(updateData.publishedDate).toISOString();
    }

    const { data: book, error } = await supabase
      .from('books')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating book:', error);
      return res.status(500).json({ message: 'Failed to update book' });
    }

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    console.error('Error in update book route:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete book (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('books')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting book:', error);
      return res.status(500).json({ message: 'Failed to delete book' });
    }

    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error in delete book route:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;