import React, { useEffect, useState } from 'react';
import { Filter, SortAsc } from 'lucide-react';
import { useBooks } from '../contexts/BookContext';
import BookGrid from '../components/books/BookGrid';

const Books: React.FC = () => {
  const { 
    books, 
    isLoading, 
    error, 
    searchQuery, 
    selectedGenre,
    pagination,
    fetchBooks,
    setSelectedGenre 
  } = useBooks();

  const [sortBy, setSortBy] = useState('title');
  const [showFilters, setShowFilters] = useState(false);

  const genres = [
    'Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Science Fiction',
    'Fantasy', 'Biography', 'History', 'Self-Help', 'Poetry'
  ];

  useEffect(() => {
    fetchBooks(1, searchQuery, selectedGenre);
  }, [searchQuery, selectedGenre, sortBy]);

  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre === selectedGenre ? '' : genre);
  };

  const handlePageChange = (page: number) => {
    fetchBooks(page, searchQuery, selectedGenre);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Discover Books
          </h1>
          <p className="text-lg text-gray-600">
            {searchQuery ? `Search results for "${searchQuery}"` : 'Browse our collection of amazing books'}
          </p>
        </div>

        {/* Filters and Sorting */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center text-gray-700 hover:text-primary-600 transition-colors"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </button>

            {/* Genre Filters */}
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedGenre('')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${ 
                    selectedGenre === '' 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All Genres
                </button>
                {genres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => handleGenreChange(genre)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedGenre === genre
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <SortAsc className="h-5 w-5 text-gray-400 mr-2" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="title">Title A-Z</option>
                  <option value="author">Author A-Z</option>
                  <option value="rating">Highest Rated</option>
                  <option value="publishedDate">Newest First</option>
                  <option value="reviewCount">Most Reviewed</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        {!isLoading && (
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {books.length} of {pagination.total} books
              {selectedGenre && ` in ${selectedGenre}`}
            </p>
          </div>
        )}

        {/* Books Grid */}
        <BookGrid books={books} isLoading={isLoading} error={error} />

        {/* Pagination */}
        {!isLoading && pagination.totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg ${
                      page === pagination.page
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-700 bg-white border border-gray-300 hover:text-primary-600 hover:bg-primary-50'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;