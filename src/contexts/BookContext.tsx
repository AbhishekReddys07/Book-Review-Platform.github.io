import React, { createContext, useContext, useReducer } from 'react';

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  genre: string;
  isbn: string;
  publishedDate: string;
  coverImage: string;
  rating: number;
  reviewCount: number;
  pages?: number;
  publisher?: string;
}

export interface Review {
  id: string;
  bookId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface BookState {
  books: Book[];
  currentBook: Book | null;
  reviews: Review[];
  searchQuery: string;
  selectedGenre: string;
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

type BookAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_BOOKS'; payload: { books: Book[]; pagination: BookState['pagination'] } }
  | { type: 'SET_CURRENT_BOOK'; payload: Book | null }
  | { type: 'SET_REVIEWS'; payload: Review[] }
  | { type: 'ADD_REVIEW'; payload: Review }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_SELECTED_GENRE'; payload: string }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'ADD_BOOK'; payload: Book }
  | { type: 'UPDATE_BOOK'; payload: Book };

const initialState: BookState = {
  books: [],
  currentBook: null,
  reviews: [],
  searchQuery: '',
  selectedGenre: '',
  isLoading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  },
};

const bookReducer = (state: BookState, action: BookAction): BookState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_BOOKS':
      return { 
        ...state, 
        books: action.payload.books, 
        pagination: action.payload.pagination,
        isLoading: false 
      };
    case 'SET_CURRENT_BOOK':
      return { ...state, currentBook: action.payload };
    case 'SET_REVIEWS':
      return { ...state, reviews: action.payload };
    case 'ADD_REVIEW':
      return { ...state, reviews: [action.payload, ...state.reviews] };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_SELECTED_GENRE':
      return { ...state, selectedGenre: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'ADD_BOOK':
      return { ...state, books: [action.payload, ...state.books] };
    case 'UPDATE_BOOK':
      return {
        ...state,
        books: state.books.map(book => 
          book.id === action.payload.id ? action.payload : book
        ),
        currentBook: state.currentBook?.id === action.payload.id ? action.payload : state.currentBook,
      };
    default:
      return state;
  }
};

interface BookContextType extends BookState {
  fetchBooks: (page?: number, search?: string, genre?: string) => Promise<void>;
  fetchBook: (id: string) => Promise<void>;
  fetchReviews: (bookId: string) => Promise<void>;
  addReview: (bookId: string, rating: number, comment: string) => Promise<void>;
  addBook: (book: Omit<Book, 'id' | 'rating' | 'reviewCount'>) => Promise<void>;
  updateBook: (id: string, book: Partial<Book>) => Promise<void>;
  setSearchQuery: (query: string) => void;
  setSelectedGenre: (genre: string) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const useBooks = () => {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};

export const BookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(bookReducer, initialState);

  const fetchBooks = async (page = 1, search = '', genre = '') => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: state.pagination.limit.toString(),
        ...(search && { search }),
        ...(genre && { genre }),
      });

      const response = await fetch(`/api/books?${params}`);
      const data = await response.json();

      if (response.ok) {
        dispatch({ 
          type: 'SET_BOOKS', 
          payload: { 
            books: data.books, 
            pagination: data.pagination 
          } 
        });
      } else {
        dispatch({ type: 'SET_ERROR', payload: data.message });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch books' });
    }
  };

  const fetchBook = async (id: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await fetch(`/api/books/${id}`);
      const data = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_CURRENT_BOOK', payload: data });
      } else {
        dispatch({ type: 'SET_ERROR', payload: data.message });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch book' });
    }
  };

  const fetchReviews = async (bookId: string) => {
    try {
      const response = await fetch(`/api/reviews?bookId=${bookId}`);
      const data = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_REVIEWS', payload: data });
      } else {
        dispatch({ type: 'SET_ERROR', payload: data.message });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch reviews' });
    }
  };

  const addReview = async (bookId: string, rating: number, comment: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ bookId, rating, comment }),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch({ type: 'ADD_REVIEW', payload: data });
      } else {
        dispatch({ type: 'SET_ERROR', payload: data.message });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add review' });
    }
  };

  const addBook = async (book: Omit<Book, 'id' | 'rating' | 'reviewCount'>) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(book),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch({ type: 'ADD_BOOK', payload: data });
      } else {
        dispatch({ type: 'SET_ERROR', payload: data.message });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add book' });
    }
  };

  const updateBook = async (id: string, book: Partial<Book>) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(book),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch({ type: 'UPDATE_BOOK', payload: data });
      } else {
        dispatch({ type: 'SET_ERROR', payload: data.message });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update book' });
    }
  };

  const setSearchQuery = (query: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  };

  const setSelectedGenre = (genre: string) => {
    dispatch({ type: 'SET_SELECTED_GENRE', payload: genre });
  };

  const value: BookContextType = {
    ...state,
    fetchBooks,
    fetchBook,
    fetchReviews,
    addReview,
    addBook,
    updateBook,
    setSearchQuery,
    setSelectedGenre,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};