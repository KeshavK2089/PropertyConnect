# Cheyyar Real Estate Platform

## Overview

Cheyyar Properties is a real estate listing platform focused on the Cheyyar region in Tamil Nadu, India. The platform enables users to browse, search, and filter three types of properties: land plots, rental spaces, and retail spaces. It features an interactive map view with clickable filter buttons, property favorites stored in localStorage, detailed property pages, and contact information for property owners and the business.

The application is built as a full-stack web application with a modern React frontend and Express.js backend, designed to provide a visual-first property browsing experience with robust search and filtering capabilities. Contact information is displayed as static text with click-to-call phone links - no forms or submission capabilities to keep costs minimal.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript using Vite as the build tool

**Routing**: wouter for lightweight client-side routing

**State Management**: 
- TanStack Query (React Query) for server state management and data fetching
- Local component state with React hooks
- LocalStorage for persisting user favorites

**UI Component Library**: 
- shadcn/ui components built on Radix UI primitives
- Tailwind CSS for styling with a custom design system
- Custom theme supporting light/dark modes with CSS variables

**Key Design Decisions**:
- Component-based architecture with reusable UI primitives
- Form handling with react-hook-form and zod validation
- Reference-based design approach drawing from modern real estate platforms (Zillow, Realtor.com, Redfin)
- Visual-first experience prioritizing property imagery and presentation
- Mobile-responsive design using Tailwind's responsive utilities

### Backend Architecture

**Framework**: Express.js with TypeScript

**API Design**: RESTful API with the following endpoints:
- GET `/api/properties` - List all properties with optional filtering
- GET `/api/properties/featured` - Get featured properties (5 newest available)
- GET `/api/properties/:id` - Get single property details

Note: The backend has no contact form submission endpoints. Contact information is displayed statically for users to call directly.

**Data Storage**:
- Drizzle ORM configured for PostgreSQL
- In-memory storage implementation (MemStorage) for development/testing
- Schema-first approach with TypeScript types generated from database schema

**Key Design Decisions**:
- Separation of storage interface (IStorage) allowing different implementations
- Request logging middleware for API endpoints
- Filter validation using Zod schemas
- Sample data initialization for development

### Data Models

**Property Schema**:
- Core fields: type (land/rental/retail), title, description, price, size, location
- Geographic data: latitude, longitude, address, city, state
- Media: images array, features array
- Metadata: status (available/pending/sold), date listed, views count
- Contact fields: contactName (property owner name), contactPhone (phone number for direct calls)
- Conditional fields: bedrooms/bathrooms for rental properties

Note: Contact information is displayed as static text with tel: links. No email field or contact forms to keep the platform simple.

**Filtering System**:
- Property type filtering
- Price range (min/max)
- Size range (min/max)
- Status filtering
- Bedroom/bathroom count for rentals
- Text search across title, description, and location
- Sorting options (price, size, date, relevance)

### Key Features

**Interactive Map Integration**:
- Leaflet.js for map rendering using OpenStreetMap tiles
- Color-coded markers by property type (land: green, rental: blue, retail: purple)
- Click-to-view property details
- Clickable filter buttons to toggle property types (Land, Rental, Retail)
- Select dropdown for type filtering
- Custom marker styling for selected properties
- Dynamic marker and sidebar filtering based on selected type

**Search and Filter**:
- Real-time client-side filtering
- URL parameter synchronization for shareable searches
- Multi-criteria filtering with compound queries
- Saved favorites in localStorage

**Property Display**:
- Grid and list view options
- Image galleries with navigation
- Property card components with badges (New, Status, Type)
- Related property suggestions
- View count tracking

## External Dependencies

### Core Dependencies

**Frontend Libraries**:
- `@tanstack/react-query` - Data fetching and caching
- `react-hook-form` + `@hookform/resolvers` - Form handling
- `zod` - Schema validation
- `wouter` - Routing
- `leaflet` + `@types/leaflet` - Map functionality

**UI Components**:
- `@radix-ui/*` - Accessible UI primitives (20+ components)
- `tailwindcss` - Utility-first CSS framework
- `class-variance-authority` - Component variant management
- `cmdk` - Command palette
- `embla-carousel-react` - Carousel functionality
- `lucide-react` - Icon library

**Backend Libraries**:
- `express` - Web server framework
- `drizzle-orm` + `drizzle-kit` - Database ORM and migrations
- `@neondatabase/serverless` - PostgreSQL driver for Neon
- `drizzle-zod` - Zod schema generation from Drizzle schemas

**Development Tools**:
- `vite` - Build tool and dev server
- `typescript` - Type safety
- `@vitejs/plugin-react` - React support for Vite
- Replit-specific plugins for development environment integration

### Database

**PostgreSQL** (configured via Drizzle):
- Connection via `DATABASE_URL` environment variable
- Schema migrations in `./migrations` directory
- Single table: `properties` (using in-memory MemStorage for development)

### External Services

**Map Tiles**:
- OpenStreetMap tile server for map rendering
- No API key required

**Fonts**:
- Google Fonts (Inter) for typography
- Preconnect configured for performance

### Asset Management

**Images**:
- Unsplash for sample property images
- Local asset storage in `attached_assets` directory
- Generated images for hero, property types

### Configuration Files

- `tailwind.config.ts` - Custom theme with HSL color system
- `components.json` - shadcn/ui configuration
- `drizzle.config.ts` - Database connection and migration settings
- `vite.config.ts` - Build configuration with path aliases
- `tsconfig.json` - TypeScript compiler options with path mapping

## Recent Changes (November 2025)

**Contact Information Display (Latest):**
- Added contactName and contactPhone fields back to Property schema
- All 18 sample properties include property owner contact information
- Property detail pages display owner name and phone with click-to-call tel: links
- Created static Contact page with business phone number and information
- Added "Contact Us" link to navbar
- NO contact forms or submission endpoints - display only with tel: links for direct calling

**Map Filtering Enhancement:**
- Converted legend badges into clickable filter toggle buttons
- Added visual highlighting for active filter state
- Improved UX with both button and dropdown filtering options
- Verified filtering works correctly via e2e tests (5 land, 6 rental, 7 retail properties)

**Current Platform Scope:**
- Real estate listings with property owner contact information for direct calls
- Static business contact page with phone number (no forms)
- In-memory storage with 18+ sample Cheyyar properties
- Client-side favorites using localStorage
- Free OpenStreetMap tiles for zero API costs
- Minimal backend footprint - no form submissions or contact endpoints