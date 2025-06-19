# 🚀 Quick Setup Guide

This guide will help you get the Book Review Platform running in minutes.

## Step-by-Step Setup

### 1. Prerequisites Check
- [ ] Node.js 16+ installed
- [ ] Git installed
- [ ] Code editor (VS Code recommended)

### 2. Clone and Install
```bash
# Clone the repository
git clone <your-repo-url>
cd book-review-platform

# Install dependencies
npm install
```

### 3. Supabase Setup
1. Go to [supabase.com](https://supabase.com) and create account
2. Create new project
3. Copy your project URL and anon key
4. Go to Settings > API to find your keys

### 4. Environment Configuration
```bash
# Copy the example file
cp .env.example .env

# Edit .env with your values
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
JWT_SECRET=any_random_string_here
PORT=3001
```

### 5. Database Setup
1. Open Supabase dashboard
2. Go to SQL Editor
3. Copy and run `supabase/migrations/20250619062828_velvet_darkness.sql`
4. Copy and run `supabase/migrations/20250619062855_twilight_delta.sql`

### 6. Start the Application
```bash
npm run dev
```

Visit `http://localhost:5173` and you're ready!

## Test Accounts

### Admin Account
- Email: `admin@bookreview.com`
- Password: `admin123`

### Regular User
- Email: `sarah@example.com`
- Password: `admin123`

## Quick Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3001
npx kill-port 3001

# Or change PORT in .env file
PORT=3002
```

### Database Connection Issues
1. Double-check your Supabase URL and keys
2. Ensure migrations were run successfully
3. Check Supabase project status

### Build Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Next Steps
- Customize the design
- Add more books via admin panel
- Deploy to production
- Add new features

Need help? Check the main README.md or create an issue!