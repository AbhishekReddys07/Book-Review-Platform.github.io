# 📚 Book Review Platform

A comprehensive full-stack web application for book lovers to discover, review, and rate books. Built with React, Node.js, Express, and Supabase.

## 🌟 Features

### Frontend Features
- **Home Page** - Showcases featured books and platform statistics
- **Book Discovery** - Browse books with advanced search and filtering
- **Book Details** - Comprehensive book information with reviews
- **User Authentication** - Secure registration and login system
- **User Profiles** - Personalized user profiles with activity tracking
- **Review System** - Write, edit, and manage book reviews
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Admin Panel** - Book management for administrators

### Backend Features
- **RESTful API** - Well-structured API endpoints
- **User Management** - Authentication and authorization
- **Book Management** - CRUD operations for books
- **Review System** - Full review management
- **Data Validation** - Input validation and sanitization
- **Error Handling** - Comprehensive error management
- **Database Integration** - PostgreSQL with Supabase
- **Security** - JWT authentication and row-level security

## 🛠 Technology Stack

### Frontend
- **React 18** - UI library with hooks
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Context** - State management
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Supabase** - Backend-as-a-Service with PostgreSQL
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **Joi** - Data validation
- **Cors** - Cross-origin resource sharing

### Database
- **PostgreSQL** - Relational database (via Supabase)
- **Row Level Security** - Database-level security
- **Views** - Optimized data queries

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v16.0.0 or higher)
- **npm** or **yarn** package manager
- **Supabase account** (free tier available)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd book-review-platform
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Copy `.env.example` to `.env`
3. Update the environment variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# JWT Secret (generate a secure random string)
JWT_SECRET=your_jwt_secret_here

# Server Configuration
PORT=3001
```

### 4. Database Setup

The database migrations are already included in the `supabase/migrations` folder:

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Run the migration files in order:
   - `20250619062828_velvet_darkness.sql` (schema)
   - `20250619062855_twilight_delta.sql` (sample data)

### 5. Run the Application

Start both frontend and backend:

```bash
npm run dev
```

This will start:
- Frontend on `http://localhost:5173`
- Backend on `http://localhost:3001`

## 📁 Project Structure

```
book-review-platform/
├── public/                 # Static assets
├── src/                   # Frontend source code
│   ├── components/        # Reusable React components
│   │   ├── books/        # Book-related components
│   │   ├── common/       # Shared components
│   │   └── reviews/      # Review-related components
│   ├── contexts/         # React Context providers
│   ├── pages/            # Main application pages
│   │   └── Auth/         # Authentication pages
│   └── main.tsx          # Application entry point
├── server/               # Backend source code
│   ├── config/          # Database configuration
│   ├── middleware/      # Express middleware
│   ├── routes/          # API route handlers
│   └── index.js         # Server entry point
├── supabase/
│   └── migrations/      # Database migrations
└── package.json         # Project dependencies
```

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token

### Books
- `GET /api/books` - Get all books (with pagination, search, filters)
- `GET /api/books/:id` - Get specific book
- `POST /api/books` - Add new book (admin only)
- `PUT /api/books/:id` - Update book (admin only)
- `DELETE /api/books/:id` - Delete book (admin only)

### Reviews
- `GET /api/reviews?bookId=:bookId` - Get reviews for a book
- `POST /api/reviews` - Submit new review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `GET /api/users/:id/reviews` - Get user's reviews

## 🎨 Design Features

### UI/UX Design
- **Modern Design** - Clean, professional interface
- **Responsive Layout** - Mobile-first approach
- **Smooth Animations** - Hover effects and transitions
- **Accessible Design** - WCAG compliant
- **Loading States** - User-friendly loading indicators
- **Error Handling** - Clear error messages

### Color Scheme
- **Primary**: Warm golden tones (#eab537)
- **Secondary**: Neutral browns (#a18862)
- **Accent**: Vibrant orange (#f97316)
- **Background**: Clean grays and whites

## 👥 User Roles

### Regular Users
- Browse and search books
- Read book details and reviews
- Write and manage their own reviews
- Update their profile information

### Administrators
- All regular user permissions
- Add, edit, and delete books
- Manage all reviews
- Access admin features

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - Bcrypt for password security
- **Input Validation** - Joi validation for all inputs
- **SQL Injection Prevention** - Parameterized queries
- **Row Level Security** - Database-level access control
- **CORS Protection** - Configured for security

## 📊 Database Schema

### Users Table
- User authentication and profile information
- Role-based access control (user/admin)

### Books Table
- Comprehensive book information
- Cover images, descriptions, metadata

### Reviews Table
- User reviews and ratings
- Linked to users and books
- Unique constraint per user/book

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting platform

### Backend Deployment (Railway/Render/Heroku)

1. Set environment variables on your hosting platform
2. Deploy the server folder
3. Update CORS settings for your frontend domain

### Database
- Supabase handles hosting automatically
- Configure environment variables for production

## 🧪 Testing

### Manual Testing Checklist

- [ ] User registration and login
- [ ] Book browsing and searching
- [ ] Review submission and editing
- [ ] Profile management
- [ ] Admin book management
- [ ] Responsive design across devices
- [ ] Error handling scenarios

## 📈 Performance Optimizations

- **Code Splitting** - React lazy loading
- **Image Optimization** - Compressed images from Pexels
- **Database Indexing** - Optimized queries
- **Caching** - Browser caching strategies
- **Pagination** - Efficient data loading

## 🛠 Development Scripts

```bash
# Development
npm run dev              # Start both frontend and backend
npm run dev:frontend     # Start only frontend
npm run dev:backend      # Start only backend

# Production
npm run build           # Build for production
npm run preview         # Preview production build

# Code Quality
npm run lint           # Run ESLint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- **Supabase** - Backend infrastructure
- **Pexels** - Book cover images
- **Lucide** - Beautiful icons
- **Tailwind CSS** - Styling framework

## 📞 Support

If you have any questions or need help setting up the project, please:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Contact the maintainer

---

Made with ❤️ for book lovers everywhere