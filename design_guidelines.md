# Design Guidelines: Cheyyar Real Estate Platform

## Design Approach
**Reference-Based Approach** drawing from modern real estate platforms (Zillow, Realtor.com, Redfin) with enhanced visual sophistication. This is a visual-first experience where property presentation drives engagement and trust.

## Typography System

**Font Families:**
- Primary: Inter (headings, UI elements)
- Secondary: System fonts (body text, descriptions)

**Hierarchy:**
- Hero Headline: text-5xl md:text-6xl lg:text-7xl, font-bold
- Section Headers: text-3xl md:text-4xl, font-bold
- Property Titles: text-2xl md:text-3xl, font-semibold
- Card Titles: text-xl, font-semibold
- Body: text-base, font-normal
- Captions/Meta: text-sm, text-gray-600

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16, 24
- Component padding: p-4 to p-8
- Section spacing: py-12 md:py-16 lg:py-24
- Card gaps: gap-4 to gap-6
- Element margins: mb-4, mb-6, mb-8

**Grid Structure:**
- Container: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
- Property Grid: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
- Featured Grid: grid-cols-1 lg:grid-cols-3 gap-8

## Component Library

### Homepage Components

**Hero Section:**
- Full-width with large background image (Cheyyar landscape/property view)
- Overlay: gradient from transparent to dark (bg-gradient-to-b from-transparent to-black/60)
- Centered content with h-[600px] lg:h-[700px]
- Primary search bar: Large input with category tabs (Land/Rental/Retail) and prominent search button
- Text: White with blur-backdrop buttons

**Property Type Cards:**
- Three-column grid on desktop, single on mobile
- Card structure: Image top, icon overlay, count badge, title, CTA
- Height: h-64, rounded-xl, shadow-lg
- Hover: transform scale-105 transition

**Featured Properties Carousel:**
- Horizontal scroll on mobile, grid on desktop
- Each card: Image (aspect-ratio-4/3), price badge, location pin, quick stats row
- "New" badge for listings < 7 days

**Statistics Section:**
- Four-column grid: Total properties, Avg land price, Avg rental, Properties sold
- Large numbers (text-4xl), descriptive labels (text-sm)
- Icon + number combination

### Property Listings Page

**Filter Sidebar:**
- Sticky on desktop (sticky top-24), drawer on mobile
- Collapsible sections: Price range slider, Size input, Bedrooms/Bathrooms, Date filters
- Apply/Reset buttons at bottom

**Property Cards:**
- Image gallery indicator (dots), favorite heart icon (top-right)
- Price (large, bold), property type badge
- Location with pin icon, size with ruler icon
- Feature tags (3-4 max): Pills with light background
- "View Details" button: Full-width, primary style

**View Toggle:**
- Grid/List icons, active state indication
- Grid: 3 columns desktop, 1 mobile
- List: Full-width cards with horizontal layout

### Property Detail Page

**Image Gallery:**
- Main image: aspect-ratio-16/9, large viewport (h-96 lg:h-[600px])
- Thumbnail strip below: horizontal scroll, 8-10 images visible
- Lightbox on click: Full-screen overlay with navigation arrows

**Information Layout:**
- Two-column: 2/3 property details, 1/3 contact card (sticky)
- Details sections: Overview, Features, Location, Description
- Each section: Bordered container with heading and organized content
- Key stats row: Price, Size, Type, Status as prominent badges

**Interactive Map:**
- Embedded map: h-96, rounded-lg
- Property marker centered with popup showing quick details
- Nearby properties markers (different color)

**Contact Card:**
- Agent photo (rounded-full, w-20 h-20)
- Name, phone, email
- CTA buttons stacked: "Schedule Viewing", "Send Message", "Call Now"
- Background: subtle gradient or light fill

### Map View Page

**Full-Screen Map Layout:**
- Map: Full height minus header (h-screen - header height)
- Property cards overlay: Slide-in panel from left (w-96), scrollable
- Selected property highlighted on map and in list
- Filters bar: Top of card panel, horizontally scrollable chips

## Images

**Homepage:**
- Hero: Wide panoramic shot of Cheyyar landscape or modern property development (1920x1080 minimum)
- Property Type Cards: Representative images for each category (Land: open plots, Rental: home exterior, Retail: commercial space)
- Featured Properties: 4-8 high-quality exterior/interior shots per property

**Listing Pages:**
- Thumbnail: 400x300 optimized images
- Detail Gallery: 1200x800 high-res images

**Image Treatment:**
- Rounded corners: rounded-lg to rounded-xl
- Subtle shadow: shadow-md
- Lazy loading with blur-up placeholder
- Aspect ratios maintained with object-cover

## Interactive Elements

**Buttons:**
- Primary: Large (px-8 py-3), bold text, full rounded
- Secondary: Outlined, same sizing
- Icon buttons: Square (w-10 h-10), centered icon
- Blur-backdrop for buttons on images: backdrop-blur-sm bg-white/20

**Cards:**
- Border: border border-gray-200
- Shadow on hover: shadow-md to shadow-xl transition
- Rounded: rounded-xl
- Padding: p-6

**Forms:**
- Input fields: border, rounded-lg, p-3
- Focus states: ring-2 ring-primary
- Labels: font-medium, mb-2
- Helper text: text-sm, text-gray-500

**Badges/Tags:**
- Pill shape: rounded-full px-3 py-1
- Text: text-xs font-medium
- Status indicators: Available (green), Pending (yellow), Sold (gray)

## Mobile Considerations

- Bottom navigation: Fixed bar with Home, Search, Favorites, Profile icons
- Hamburger menu: Slide-in drawer for main navigation
- Touch targets: Minimum 44x44 pixels
- Swipeable galleries: Touch-enabled horizontal scroll
- Collapsible filters: Accordion sections
- Map controls: Larger buttons, bottom-positioned

## Accessibility
- Semantic HTML throughout (nav, main, article, section)
- ARIA labels on icon buttons and interactive elements
- Keyboard navigation: Focus visible on all interactive elements
- Alt text descriptive for property images
- Contrast ratios WCAG AA compliant throughout