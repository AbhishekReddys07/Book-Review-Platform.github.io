import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Calendar, User } from 'lucide-react';
import { Book } from '../../contexts/BookContext';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Link
      to={`/books/${book.id}`}
      className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
    >
      <div className="aspect-w-2 aspect-h-3 relative overflow-hidden bg-gray-100">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6">
        <div className="mb-2">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 mb-1">
            {book.title}
          </h3>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <User className="h-4 w-4 mr-1" />
            <span>{book.author}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {book.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            {renderStars(book.rating)}
            <span className="text-sm text-gray-600 ml-2">
              ({book.reviewCount} reviews)
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{new Date(book.publishedDate).getFullYear()}</span>
          </div>
          <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
            {book.genre}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;