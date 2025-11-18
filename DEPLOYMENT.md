# Deployment Guide for Cheyyar Properties

This guide provides step-by-step instructions for deploying the Cheyyar Properties full-stack application to Netlify.

## Important Note

**GitHub Pages** only supports static websites (HTML/CSS/JS files) and **cannot run the Express.js backend**. Therefore, we use **Netlify**, which supports serverless functions for the backend.

---

## Deploy to Netlify (Recommended)

### Prerequisites
- GitHub account with your code pushed to a repository
- Netlify account (free tier available)

### Step 1: Push Latest Changes to GitHub

If you haven't already pushed the Netlify configuration files:

```bash
git add .
git commit -m "Add Netlify deployment configuration"
git push
```

### Step 2: Create Netlify Account

1. Go to https://netlify.com
2. Click "Sign up" (or "Log in" if you have an account)
3. Choose "Sign up with GitHub" for easiest integration
4. Authorize Netlify to access your GitHub repositories

### Step 3: Deploy from GitHub

1. **In Netlify Dashboard:**
   - Click "Add new site" → "Import an existing project"
   
2. **Connect to Git Provider:**
   - Select "GitHub"
   - Authorize Netlify if prompted
   - Search for and select your `cheyyar-properties` repository

3. **Configure Build Settings:**
   
   Netlify should auto-detect the settings from `netlify.toml`, but verify:
   
   - **Branch to deploy:** `main` (or `master`)
   - **Build command:** `vite build`
   - **Publish directory:** `dist/public`
   - **Functions directory:** `netlify/functions`
   
   These are already configured in `netlify.toml`, so you can leave them as detected.

4. **Environment Variables (if needed):**
   
   If you were using a real database:
   - Click "Show advanced"
   - Click "New variable"
   - Add `DATABASE_URL`, `SESSION_SECRET`, etc.
   
   For this project with in-memory storage, **no environment variables are needed**.

5. **Deploy:**
   - Click "Deploy site"
   - Wait 2-3 minutes for the build to complete

### Step 4: Access Your Live Site

Once deployment is complete:

1. You'll see a randomly generated URL like: `https://random-name-123.netlify.app`
2. Click on it to view your live site
3. Test the following:
   - Home page loads correctly
   - Properties page shows all listings
   - Map view works with property markers
   - Search and filters work
   - Individual property details pages load
   - Contact page displays correctly

### Step 5: Configure Custom Domain (Optional)

1. In Netlify Dashboard → Site settings → Domain management
2. Click "Add custom domain"
3. Enter your domain (e.g., `cheyyarproperties.com`)
4. Follow DNS configuration instructions
5. Netlify provides free SSL/HTTPS automatically

---

## Automatic Deployments

Once connected to GitHub, Netlify will automatically:
- Deploy when you push to the `main` branch
- Show deploy previews for pull requests
- Run builds and show logs

To push updates:
```bash
git add .
git commit -m "Your update message"
git push
```

Netlify will automatically rebuild and deploy within 2-3 minutes.

---

## Local Testing with Netlify Dev

To test the serverless functions locally before deploying:

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Run local dev server
netlify dev
```

This simulates the Netlify environment on your local machine.

---

## Troubleshooting

### Build Fails

1. Check the deploy logs in Netlify dashboard
2. Common issues:
   - Missing dependencies in `package.json`
   - TypeScript errors
   - Build command incorrect

### Site Loads but API Doesn't Work

1. Check Functions tab in Netlify dashboard
2. Click on the `api` function
3. View function logs for errors
4. Verify redirect rules in `netlify.toml`

### Map Doesn't Load

1. Check browser console for errors
2. Verify OpenStreetMap tiles are loading (no API key needed)
3. Check that property data with coordinates is being fetched

### 404 Errors

1. Make sure `dist/public` folder is being published
2. Check that build completed successfully
3. Verify routes are configured correctly in `netlify.toml`

---

## Cost

**Netlify Free Tier Includes:**
- 300 build minutes/month
- 100GB bandwidth/month
- 125,000 serverless function invocations/month
- Automatic SSL/HTTPS
- Custom domains

This is more than enough for small to medium-sized projects. The Cheyyar Properties app will run perfectly on the free tier.

---

## Alternative: Keep Running on Replit

If you prefer to keep the app on Replit:

1. Click "Publish" button in Replit workspace
2. Choose "Autoscale Deployments"
3. Configure settings and click "Publish"
4. Your app will be live at `https://your-repl-name.repl.co`

Replit is excellent for development but may have cost implications for production traffic.

---

## Support

- **Netlify Docs:** https://docs.netlify.com
- **Netlify Community:** https://answers.netlify.com
- **GitHub Issues:** Create an issue in your repository

---

## Summary

✅ Netlify supports full-stack apps (React + Express)  
✅ Free tier is generous for most projects  
✅ Automatic deployments from GitHub  
✅ Free SSL and custom domains  
✅ Serverless functions for backend API  
✅ Easy to set up and maintain  

❌ GitHub Pages only works for static sites (frontend-only)
