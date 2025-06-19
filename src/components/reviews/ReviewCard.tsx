import React from 'react';
import { Star, Calendar } from 'lucide-react';
import { Review } from '../../contexts/BookContext';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
          {review.userAvatar ? (
            <img
              src={review.userAvatar}
              alt={review.userName}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <span className="text-primary-700 font-semibold text-sm">
              {review.userName.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{review.userName}</h4>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {renderStars(review.rating)}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{new Date(review.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-gray-700 leading-relaxed">{review.comment}</p>
    </div>
  );
};

export default ReviewCard;