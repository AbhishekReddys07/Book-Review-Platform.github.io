import React from 'react';
import { BookOpen, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold">BookReview</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Discover your next great read. Join our community of book lovers and share your thoughts on the latest releases.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary-400">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="/books" className="text-gray-300 hover:text-white transition-colors">Browse Books</a></li>
              <li><a href="/genres" className="text-gray-300 hover:text-white transition-colors">Genres</a></li>
              <li><a href="/reviews" className="text-gray-300 hover:text-white transition-colors">Reviews</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary-400">Popular Genres</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/books?genre=fiction" className="text-gray-300 hover:text-white transition-colors">Fiction</a></li>
              <li><a href="/books?genre=mystery" className="text-gray-300 hover:text-white transition-colors">Mystery</a></li>
              <li><a href="/books?genre=romance" className="text-gray-300 hover:text-white transition-colors">Romance</a></li>
              <li><a href="/books?genre=science-fiction" className="text-gray-300 hover:text-white transition-colors">Sci-Fi</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary-400">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="h-4 w-4" />
                <span>hello@bookreview.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>123 Book Street, Reading City</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 BookReview Platform. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="/cookies" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;