# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a comprehensive modern retail warehouse management system with both an interactive infographic frontend and a full web application backend. The project consists of:

1. **Static Infographic** (`index.html`) - Interactive educational content about warehouse SOP
2. **Web Application** - Full-featured warehouse management system with Laravel backend

The current implementation includes a static infographic showcasing warehouse optimization, with plans for a complete web application featuring user management, purchase orders, goods receiving, inventory tracking, and reporting.

## Technology Stack

### Frontend (Current Static Site)
- **Frontend**: Pure HTML5, CSS3, JavaScript
- **Styling**: Tailwind CSS (CDN)
- **Charts**: Chart.js (CDN) 
- **Fonts**: Google Fonts (Inter)
- **No build system** - runs directly in browser

### Planned Web Application Stack
- **Frontend**: HTML5, CSS3, JavaScript, Tailwind CSS, Chart.js
- **Backend**: PHP 8.0+, Laravel 9.x
- **Database**: MySQL 8.0+
- **Tools**: Composer, NPM, Git, Docker (optional)

## Project Structure

### Core Files
- `index.html` - Main application entry point with complete infographic content
- `css/styles.css` - Custom styles complementing Tailwind CSS
- `js/main.js` - Navigation functionality and utility functions
- `js/charts.js` - Chart.js configurations and data visualization

### Documentation
- `docs-html/` - HTML versions of document templates (faktur, purchase orders, etc.)
- `docs/` - Markdown versions of the same documents
- `images/` - Static chart images (grafik_1.png through grafik_4.png)

## Development Commands

### Current Static Site
Since the infographic is a static website with no build process:

```bash
# Open in browser - no server required
open index.html
# OR serve locally if needed
python -m http.server 8000
# OR
npx serve .
```

### Planned Laravel Application
For future web application development:

```bash
# Install dependencies
composer install
npm install

# Environment setup
cp .env.example .env
php artisan key:generate

# Database setup
php artisan migrate --seed

# Development server
php artisan serve

# Asset compilation
npm run dev        # Development
npm run production # Production build
```

### Code Formatting
No specific linting/formatting tools configured. Follow existing code style and Laravel conventions.

## Architecture Notes

### Navigation System
- Uses Intersection Observer API for automatic section highlighting
- Sticky navigation with smooth scrolling between sections
- Section IDs correspond to navigation links: #pendahuluan, #sop, #aktor, etc.

### Chart Implementation
- Static images used in KPI section (images/grafik_*.png)
- Chart.js code exists but charts are conditionally rendered only if specific canvas elements exist
- Chart colors follow design system: #2A6EBC, #559BD8, #80C9F3, #004299

### Design System
- Color palette: "Brilliant Blues" theme
- Primary: #004299 (dark blue)
- Secondary: #2A6EBC (medium blue) 
- Tertiary: #559BD8 (light blue)
- Background: #F0F4F8 (light gray-blue)
- Text: #1E293B (dark slate), #475569 (medium slate)

### Content Sections
1. Pendahuluan - Introduction with key principles
2. SOP - 6-step standard operating procedure
3. Aktor - Key personnel roles and responsibilities  
4. Teknologi - Technology integration (WMS, ERP, scanners)
5. Alur Proses - Detailed flowchart visualization
6. KPI - Performance indicators with charts/images
7. Dokumen - Important document types with links to detailed views
8. Kesimpulan - Summary and future outlook

## File Conventions

- Indonesian language content throughout
- Responsive design using Tailwind CSS classes
- No external dependencies beyond CDN resources
- Document templates follow consistent HTML structure in docs-html/
- Images stored in images/ directory with descriptive names

## Database Schema (Planned)

The web application will include comprehensive database structure with 15 main tables:

### Core Entities
- **Users & Roles** - Authentication and role-based access control
- **Suppliers** - Vendor management
- **Products & Categories** - Inventory items with categorization
- **Warehouses & Storage Locations** - Physical storage management

### Process Entities
- **Purchase Orders** - PO creation and management
- **Goods Receipts (GRN/BPB)** - Receiving process documentation
- **Discrepancy Reports** - Quality control and issue tracking
- **Inventories & Transactions** - Real-time stock tracking

### Key Features (Planned)
- Role-based access (Admin Gudang, Staf Gudang, Kepala Gudang, Tim Pembelian, Super Admin)
- Complete SOP workflow from PO creation to putaway
- Real-time inventory tracking
- Barcode/QR code integration
- Mobile responsive design
- Supplier portal (optional)

## Maintenance Notes

### Current Static Site
- Charts can be either static images (current) or dynamic Chart.js (code prepared)
- All external resources loaded via CDN (Tailwind, Chart.js, Google Fonts)
- No package.json or dependency management required
- HTML comments contain detailed planning notes and color specifications

### Future Development
- Follow Laravel conventions and best practices
- Use Eloquent ORM for database interactions
- Implement proper validation and security measures
- Consider API-first approach for mobile integration