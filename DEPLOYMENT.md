# 🌐 Deployment Guide

This guide covers deploying your Book Review Platform to production.

## Frontend Deployment (Netlify - Recommended)

### Option 1: Netlify Drop (Quick)
1. Run `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag and drop the `dist` folder

### Option 2: Git Integration (Recommended)
1. Push your code to GitHub
2. Connect Netlify to your repository
3. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add environment variables in Netlify dashboard

### Environment Variables for Netlify
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Backend Deployment (Railway - Recommended)

### Railway Setup
1. Go to [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Select the root directory
4. Add environment variables:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
JWT_SECRET=your_jwt_secret
PORT=3001
NODE_ENV=production
```

5. Railway will automatically deploy on push

### Alternative: Render.com
1. Go to [render.com](https://render.com)
2. Create new Web Service
3. Connect your repository
4. Set build command: `npm install`
5. Set start command: `npm run dev:backend`
6. Add environment variables

## Database (Supabase)
- Already hosted on Supabase cloud
- No additional setup needed
- Ensure Row Level Security is enabled

## Domain Configuration

### Custom Domain (Optional)
1. Buy domain from provider (Namecheap, GoDaddy, etc.)
2. In Netlify: Site settings > Domain management
3. Add custom domain and follow DNS instructions

### HTTPS Certificate
- Netlify provides free SSL certificates
- Railway provides HTTPS by default

## Post-Deployment Setup

### Update CORS Settings
Update your backend CORS configuration for production:

```javascript
// In server/index.js
app.use(cors({
  origin: ['https://your-frontend-domain.netlify.app'],
  credentials: true
}));
```

### Update Frontend API URL
If using separate backend deployment, update API calls:

```javascript
// Create src/config/api.js
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-domain.railway.app'
  : 'http://localhost:3001';
```

## Environment-Specific Configurations

### Production Environment Variables
```env
# Frontend (.env.production)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=https://your-backend-domain.railway.app

# Backend (on hosting platform)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
JWT_SECRET=your_secure_jwt_secret
NODE_ENV=production
PORT=3001
```

## Performance Optimizations

### Frontend
- Enable Netlify's asset optimization
- Configure caching headers
- Enable Brotli compression

### Backend
- Enable gzip compression in Express
- Add rate limiting
- Implement caching strategies

## Monitoring and Analytics

### Recommended Tools
- **Sentry** - Error tracking
- **Google Analytics** - User analytics
- **Uptime Robot** - Uptime monitoring
- **Supabase Dashboard** - Database monitoring

## SSL and Security

### Security Headers
Add to your backend:

```javascript
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});
```

## Backup Strategy

### Database Backups
- Supabase provides automatic backups
- Consider additional backup strategies for critical data

### Code Backups
- Use Git with multiple remotes
- Regular pushes to GitHub/GitLab

## Troubleshooting Deployment

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are in package.json
   - Check for environment-specific code

2. **Database Connection Issues**
   - Verify environment variables
   - Check Supabase project status
   - Ensure RLS policies are correct

3. **CORS Errors**
   - Update backend CORS configuration
   - Add frontend domain to allowed origins

4. **API Not Found (404)**
   - Verify backend deployment status
   - Check API URL configuration
   - Ensure routes are properly defined

### Debug Commands
```bash
# Check deployment logs
# Railway: View in dashboard
# Netlify: Site > Functions/Deploys

# Test API endpoints
curl https://your-backend-domain.railway.app/api/health

# Test frontend build locally
npm run build && npm run preview
```

## Scaling Considerations

### When to Scale
- High traffic volumes
- Slow response times
- Database performance issues

### Scaling Options
- **Railway**: Automatic scaling available
- **Supabase**: Upgrade to Pro plan for more resources
- **CDN**: Add Cloudflare for global distribution

---

Your Book Review Platform is now ready for production! 🎉