import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Calendar, User, BookOpen, ArrowLeft } from 'lucide-react';
import { useBooks } from '../contexts/BookContext';
import { useAuth } from '../contexts/AuthContext';
import ReviewCard from '../components/reviews/ReviewCard';
import ReviewForm from '../components/reviews/ReviewForm';
import LoadingSpinner from '../components/common/LoadingSpinner';

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { 
    currentBook, 
    reviews, 
    isLoading, 
    error, 
    fetchBook, 
    fetchReviews, 
    addReview 
  } = useBooks();

  useEffect(() => {
    if (id) {
      fetchBook(id);
      fetchReviews(id);
    }
  }, [id]);

  const handleReviewSubmit = async (rating: number, comment: string) => {
    if (id) {
      await addReview(id, rating, comment);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !currentBook) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-medium mb-4">
            {error || 'Book not found'}
          </p>
          <Link
            to="/books"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            ← Back to Books
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/books"
            className="flex items-center text-primary-600 hover:text-primary-700 font-medium mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Books
          </Link>
        </div>

        {/* Book Details */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="md:flex">
            {/* Book Cover */}
            <div className="md:w-1/3 lg:w-1/4">
              <img
                src={currentBook.coverImage}
                alt={currentBook.title}
                className="w-full h-96 md:h-full object-cover"
              />
            </div>

            {/* Book Info */}
            <div className="md:w-2/3 lg:w-3/4 p-8">
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {currentBook.title}
                </h1>
                
                <div className="flex items-center text-lg text-gray-600 mb-4">
                  <User className="h-5 w-5 mr-2" />
                  <span>{currentBook.author}</span>
                </div>

                <div className="flex items-center space-x-6 mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {renderStars(currentBook.rating)}
                    </div>
                    <span className="text-lg font-semibold text-gray-900">
                      {currentBook.rating.toFixed(1)}
                    </span>
                    <span className="text-gray-500">
                      ({currentBook.reviewCount} reviews)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>Published: {new Date(currentBook.publishedDate).getFullYear()}</span>
                  </div>
                  {currentBook.pages && (
                    <div className="flex items-center text-gray-600">
                      <BookOpen className="h-5 w-5 mr-2" />
                      <span>{currentBook.pages} pages</span>
                    </div>
                  )}
                  <div>
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                      {currentBook.genre}
                    </span>
                  </div>
                </div>

                <div className="prose max-w-none">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{currentBook.description}</p>
                </div>

                {currentBook.isbn && (
                  <div className="mt-4 text-sm text-gray-500">
                    <strong>ISBN:</strong> {currentBook.isbn}
                  </div>
                )}
                {currentBook.publisher && (
                  <div className="text-sm text-gray-500">
                    <strong>Publisher:</strong> {currentBook.publisher}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reviews Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Reviews ({reviews.length})
              </h2>

              {reviews.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No reviews yet. Be the first to review this book!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Review Form Sidebar */}
          <div className="lg:col-span-1">
            <ReviewForm bookId={currentBook.id} onSubmit={handleReviewSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;