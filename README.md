# Cheyyar Properties - Real Estate Listing Platform

A modern, mobile-responsive real estate platform for the Cheyyar region in Tamil Nadu, India, featuring interactive maps, advanced search capabilities, and streamlined property browsing.

## Features

### Property Listings
- **Three Property Types**: Land plots, rental spaces, and retail properties
- **Interactive Map View**: Leaflet.js-powered map with color-coded markers
- **Advanced Search & Filtering**: Multi-criteria search by type, price, size, location, and features
- **Favorites System**: Save properties using localStorage for quick access
- **Property Details**: Comprehensive property pages with image galleries and owner contact information

### User Experience
- **Mobile-First Design**: Fully responsive across all devices
- **Zillow-Inspired Interface**: Clean, modern design inspired by leading real estate platforms
- **Contact Information**: Click-to-call phone numbers for direct owner contact
- **No Forms Required**: Simple browse-and-call model to minimize complexity

### Technical Highlights
- **Real-time Filtering**: Client-side filtering for instant results
- **SEO Optimized**: Meta tags and structured data for better search visibility
- **Scroll-to-Top Navigation**: Automatic scroll reset on page changes
- **Dark Mode Support**: Theme switching with persistent preferences
- **Performance Optimized**: Lazy loading images and efficient rendering

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Wouter** for routing
- **TanStack Query** (React Query v5) for data fetching
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **Leaflet.js** for interactive maps

### Backend
- **Express.js** with TypeScript
- **Drizzle ORM** for database management
- **PostgreSQL** (configured, using in-memory storage for development)
- **Zod** for validation

### Development Tools
- **Vite** for blazing-fast builds
- **TypeScript** for type safety
- **ESBuild** for fast transpilation

## Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/KeshavK2089/cheyyar-properties.git
   cd cheyyar-properties
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional for development)
   
   Create a `.env` file if you need custom configuration:
   ```env
   DATABASE_URL=your_postgresql_url
   SESSION_SECRET=your_session_secret
   NODE_ENV=development
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5000`

## Pushing to GitHub

### Initial Setup

1. **Create a new repository on GitHub**
   - Go to https://github.com/KeshavK2089
   - Click "New repository"
   - Name it `cheyyar-properties`
   - Do NOT initialize with README (we already have one)

2. **Push your code from Replit**
   
   Using Replit's Git pane:
   - Open the Git pane in your Replit workspace
   - Stage all changes
   - Commit with message: "Initial commit - Cheyyar Properties platform"
   - Add remote: `https://github.com/KeshavK2089/cheyyar-properties.git`
   - Push to GitHub

   Or using the Shell:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Cheyyar Properties platform"
   git branch -M main
   git remote add origin https://github.com/KeshavK2089/cheyyar-properties.git
   git push -u origin main
   ```

3. **For subsequent updates**
   ```bash
   git add .
   git commit -m "Description of your changes"
   git push
   ```

## Project Structure

```
cheyyar-properties/
├── client/                    # Frontend React application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page components
│   │   ├── lib/              # Utility functions and config
│   │   └── hooks/            # Custom React hooks
│   └── public/               # Static assets
├── server/                    # Backend Express application
│   ├── routes.ts             # API routes
│   ├── storage.ts            # Data storage interface
│   └── index.ts              # Server entry point
├── shared/                    # Shared code between frontend and backend
│   └── schema.ts             # Data models and validation
└── attached_assets/          # Generated images and assets
```

## Key Features Explained

### Interactive Map
- Built with Leaflet.js using free OpenStreetMap tiles
- Color-coded markers: Green (Land), Blue (Rental), Purple (Retail)
- Clickable markers with property details
- Filter buttons to show/hide property types

### Property Search
- Search across title, description, and location
- Multi-criteria filtering:
  - Property type (Land/Rental/Retail)
  - Price range
  - Size range
  - Number of bedrooms/bathrooms
  - Status (Available/Pending/Sold)
- Real-time results without page reload

### Favorites
- Heart icon on each property card
- Favorites stored in browser localStorage
- Dedicated favorites page
- Persistent across sessions

### Contact System
- Property owner names and phone numbers displayed
- Click-to-call tel: links for mobile devices
- Business contact page with office hours
- No forms or backend submission (minimizes costs)

## Design Philosophy

The design draws inspiration from leading real estate platforms like Zillow while maintaining a unique identity:

- **Clean & Modern**: Minimal clutter, focus on property visuals
- **Mobile-First**: Optimized for smartphones where most users browse
- **Accessibility**: High contrast, proper ARIA labels, keyboard navigation
- **Performance**: Fast loading, lazy images, optimized assets

## Mobile Optimization

- Responsive breakpoints at 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- Touch-friendly buttons and controls
- Optimized image sizes for mobile networks
- Collapsible mobile navigation menu
- Stack layout on small screens

## Security & Privacy

- No user authentication required (browse-only platform)
- Contact information displayed as text (no email collection)
- Environment variables for sensitive config
- CORS protection on API endpoints
- Input validation on all forms

## Deployment

### Replit Deployment (Recommended)
This project is deployed on Replit. To publish:

1. Click the "Publish" button in Replit
2. Choose deployment type (Autoscale recommended)
3. Configure domain and settings
4. Click "Publish" to go live

Your app will be accessible at `https://your-repl-name.repl.co`

### Alternative Deployment Options

This is a full-stack application (Express backend + React frontend) that requires:
- Node.js runtime for the backend
- PostgreSQL database support (or in-memory storage)
- Support for both frontend and backend deployment

**Recommended platforms for full-stack deployment:**

1. **Vercel** - Free tier available, excellent for full-stack apps
   - Supports Express backend via serverless functions
   - Automatic deployments from GitHub
   - Custom domains included

2. **Render** - Free tier available
   - Supports full Express apps
   - PostgreSQL database hosting
   - Direct GitHub integration

3. **Railway** - Free tier with usage limits
   - Full backend support
   - Database hosting included
   - Simple GitHub deployment

4. **Fly.io** - Free tier available
   - Full control over backend
   - Global deployment
   - Dockerfile or buildpack support

**Note:** GitHub Pages only supports static frontend files and cannot run the Express backend, so it's not suitable for this application.

## Configuration

### Environment Variables

The following environment variables can be configured (all optional for development):

```env
DATABASE_URL=your_postgresql_url        # PostgreSQL connection string
SESSION_SECRET=your_session_secret      # Secret for session management
NODE_ENV=development                     # Environment mode
```

### Data Management

Currently using in-memory storage. To add/edit properties:

1. Open `server/storage.ts`
2. Find the `sampleProperties` array
3. Add/edit property objects following the schema
4. Restart the server

For production, consider migrating to PostgreSQL for persistent data.

## Sample Data

The project includes 18 sample properties:
- 5 Land plots
- 6 Rental properties
- 7 Retail spaces

All located in Cheyyar region with realistic Indian pricing and contact information.

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Map tiles by [OpenStreetMap](https://www.openstreetmap.org/)
- UI components by [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Sample images from [Unsplash](https://unsplash.com/)

## Support

For questions or support, please contact:
- Email: support@cheyyarproperties.com
- Phone: +91 98765 43210

## Roadmap

Future features planned:
- PostgreSQL integration for production data
- Admin dashboard for property management
- Email notifications for new listings
- Property comparison feature
- Virtual tours/360 degree images
- User accounts and saved searches

---

Built for the Cheyyar community
