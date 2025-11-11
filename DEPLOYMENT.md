# Deployment Guide - Vercel

## Prerequisites
- A GitHub account
- A Vercel account (sign up at vercel.com with GitHub)
- Your PayPal Client ID for production

## Steps to Deploy

### 1. Push to GitHub

The code is ready to be pushed. Run these commands in your terminal:

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit - Ready for deployment"

# Create a new repository on GitHub (github.com/new)
# Name it something like: digital-products-store

# Add your GitHub repository as remote (replace YOUR_USERNAME and YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to https://vercel.com/new
2. Click "Import Project" or "Add New Project"
3. Select "Import Git Repository"
4. Choose your GitHub repository
5. Vercel will auto-detect Next.js settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `next build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

6. **Add Environment Variables** (IMPORTANT):
   - Click "Environment Variables"
   - Add: `NEXT_PUBLIC_PAYPAL_CLIENT_ID`
   - Value: Your production PayPal Client ID
   - Select all environments (Production, Preview, Development)

7. Click **Deploy**

### 3. After Deployment

- Vercel will give you a URL like: `your-project.vercel.app`
- Your site will be live in ~2 minutes
- SSL is automatically configured

### 4. Add Custom Domain (Optional)

1. In Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. SSL will auto-configure

### 5. Test Your Site

- Visit your Vercel URL
- Test adding products to cart
- Test PayPal payment flow (use sandbox first, then switch to live)
- Test downloads from My Orders page

## Environment Variables You Need

### Required:
- `NEXT_PUBLIC_PAYPAL_CLIENT_ID` - Your PayPal production client ID

### How to Get PayPal Production Client ID:
1. Log in to https://developer.paypal.com/
2. Go to Dashboard → Apps & Credentials
3. Switch to "Live" mode (toggle at top)
4. Create a new app or use existing one
5. Copy the "Client ID"
6. Add it to Vercel environment variables

## Continuous Deployment

- Every push to `main` branch will automatically deploy to production
- Pull requests create preview deployments
- You can see build logs in Vercel dashboard

## Troubleshooting

### Build Fails
- Check Vercel build logs
- Ensure all dependencies are in package.json
- Check for any linting errors

### PayPal Not Working
- Verify `NEXT_PUBLIC_PAYPAL_CLIENT_ID` is set in Vercel
- Redeploy after adding environment variables
- Switch from sandbox to live credentials

### Downloads Not Working
- Ensure `/public/WEBSITE SOURCE/` folder is committed to git
- If files are too large for GitHub, consider:
  - Using Git LFS (Large File Storage)
  - Moving to CDN storage (Cloudflare R2 or AWS S3)

## Performance Optimization (Later)

If your site gets high traffic:
1. Move large files from `/public` to CDN (Cloudflare R2, AWS S3)
2. Update `lib/download-helper.ts` to point to CDN URLs
3. Consider Vercel Pro plan for better bandwidth limits
4. Enable Vercel Analytics for insights

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- PayPal SDK: https://developer.paypal.com/docs/checkout/

## Costs

- **Vercel Hobby (Free)**: 
  - 100GB bandwidth/month
  - Unlimited websites
  - Custom domains
  - Automatic SSL
  
- **Vercel Pro ($20/month)**:
  - 1TB bandwidth/month
  - Priority support
  - Advanced analytics
  - Team features

Start with Hobby plan and upgrade only if needed!

