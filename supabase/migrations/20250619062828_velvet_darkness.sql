/*
  # Initial Schema for Book Review Platform

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text, unique)
      - `password` (text)
      - `role` (text, default 'user')
      - `avatar` (text, optional)
      - `createdAt` (timestamp)
      - `updatedAt` (timestamp)
    
    - `books`
      - `id` (uuid, primary key)
      - `title` (text)
      - `author` (text)
      - `description` (text)
      - `genre` (text)
      - `isbn` (text, optional)
      - `publishedDate` (date)
      - `coverImage` (text)
      - `pages` (integer, optional)
      - `publisher` (text, optional)
      - `createdAt` (timestamp)
      - `updatedAt` (timestamp)
    
    - `reviews`
      - `id` (uuid, primary key)
      - `bookId` (uuid, foreign key)
      - `userId` (uuid, foreign key)
      - `rating` (integer, 1-5)
      - `comment` (text)
      - `createdAt` (timestamp)
      - `updatedAt` (timestamp)

  2. Views
    - `books_with_ratings` - Books with calculated average ratings
    - `reviews_with_users` - Reviews with user information
    - `reviews_with_books` - Reviews with book information

  3. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add admin-only policies for book management
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  role text DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  avatar text,
  createdAt timestamptz DEFAULT now(),
  updatedAt timestamptz DEFAULT now()
);

-- Create books table
CREATE TABLE IF NOT EXISTS books (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  author text NOT NULL,
  description text NOT NULL,
  genre text NOT NULL,
  isbn text,
  publishedDate date NOT NULL,
  coverImage text NOT NULL,
  pages integer CHECK (pages > 0),
  publisher text,
  createdAt timestamptz DEFAULT now(),
  updatedAt timestamptz DEFAULT now()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bookId uuid NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  userId uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  createdAt timestamptz DEFAULT now(),
  updatedAt timestamptz DEFAULT now(),
  UNIQUE(bookId, userId)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_books_genre ON books(genre);
CREATE INDEX IF NOT EXISTS idx_books_author ON books(author);
CREATE INDEX IF NOT EXISTS idx_books_published_date ON books(publishedDate);
CREATE INDEX IF NOT EXISTS idx_reviews_book_id ON reviews(bookId);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(userId);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Create view for books with ratings
CREATE OR REPLACE VIEW books_with_ratings AS
SELECT 
  b.*,
  COALESCE(AVG(r.rating), 0) as rating,
  COUNT(r.id) as reviewCount
FROM books b
LEFT JOIN reviews r ON b.id = r.bookId
GROUP BY b.id, b.title, b.author, b.description, b.genre, b.isbn, 
         b.publishedDate, b.coverImage, b.pages, b.publisher, 
         b.createdAt, b.updatedAt;

-- Create view for reviews with user information
CREATE OR REPLACE VIEW reviews_with_users AS
SELECT 
  r.*,
  u.name as userName,
  u.avatar as userAvatar
FROM reviews r
JOIN users u ON r.userId = u.id;

-- Create view for reviews with book information
CREATE OR REPLACE VIEW reviews_with_books AS
SELECT 
  r.*,
  u.name as userName,
  u.avatar as userAvatar,
  b.title as bookTitle,
  b.author as bookAuthor,
  b.coverImage as bookCoverImage
FROM reviews r
JOIN users u ON r.userId = u.id
JOIN books b ON r.bookId = b.id;

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = id::text);

-- Books policies (public read, admin write)
CREATE POLICY "Anyone can read books"
  ON books
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can insert books"
  ON books
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update books"
  ON books
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role = 'admin'
    )
  );

CREATE POLICY "Admins can delete books"
  ON books
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role = 'admin'
    )
  );

-- Reviews policies
CREATE POLICY "Anyone can read reviews"
  ON reviews
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert reviews"
  ON reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = userId::text);

CREATE POLICY "Users can update own reviews"
  ON reviews
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = userId::text);

CREATE POLICY "Users can delete own reviews"
  ON reviews
  FOR DELETE
  TO authenticated
  USING (
    auth.uid()::text = userId::text 
    OR EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role = 'admin'
    )
  );

-- Function to update updatedAt timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updatedAt = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updatedAt
CREATE TRIGGER update_users_updated_at 
  BEFORE UPDATE ON users 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_books_updated_at 
  BEFORE UPDATE ON books 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at 
  BEFORE UPDATE ON reviews 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();