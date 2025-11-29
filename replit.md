# Innovixus IT Services and Consultancy

## Overview

Innovixus is a professional IT services website for a tech startup based in Surat, Gujarat, specializing in backend development, DevOps consulting, and cloud architecture solutions. The application is built as a full-stack TypeScript project with a React frontend and Express.js backend, featuring a blog system, contact forms, and an admin panel for content management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite

**Design Decisions:**
- Uses a component-based architecture with reusable UI components in `client/src/components/ui/`
- Implements a custom theme system supporting light/dark modes via CSS variables
- SEO-optimized with dynamic meta tags and structured data
- Responsive design following mobile-first principles
- Analytics integration with Google Analytics for tracking

**Key Features:**
- Public-facing pages: Home, About, Services, Blog, Contact
- Blog listing and individual blog post pages
- Admin dashboard for content management
- Form validation using Zod schemas shared between client and server
- Toast notifications for user feedback

### Backend Architecture

**Technology Stack:**
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Session Management**: Express-session with MemoryStore
- **Validation**: Zod schemas shared with frontend
- **Development**: tsx for TypeScript execution, esbuild for production builds

**Design Decisions:**
- RESTful API architecture with clear endpoint separation
- File-based storage system using JSON files in `.data/` directory (no traditional database)
- Session-based authentication with hardcoded admin credentials
- Middleware for request logging and error handling
- Development mode integrates Vite middleware for hot module replacement

**Authentication & Authorization:**
- Hardcoded admin credentials (email: admin@innovixus.com, password: innovixus123)
- Session-based authentication using express-session
- Protected admin routes with `isAuthenticated` middleware
- Session stored in memory (MemoryStore) with 7-day TTL

**API Structure:**
- `/api/auth/*` - Authentication endpoints (login, logout, user session)
- `/api/blog` - Public blog post retrieval (published posts only)
- `/api/blog/:slug` - Individual blog post by slug
- `/api/contact` - Contact form submission
- `/api/admin/*` - Protected admin endpoints for blog and contact management

### Data Storage Solutions

**Storage Implementation:**
- Custom file-based storage system (`server/storage.ts`)
- JSON files stored in `.data/` directory
- Two primary data files: `blog-posts.json` and `contact-submissions.json`
- In-memory caching of data with file synchronization
- Helper functions for CRUD operations

**Data Models:**
- **BlogPost**: id, title, slug, excerpt, content (HTML), category, author, images, timestamps, publication status
- **ContactSubmission**: id, name, email, company, message, timestamps, read status
- **User**: id, email, firstName, lastName (authentication only)

**Rationale:**
- File-based storage chosen for simplicity and zero-setup deployment
- Suitable for low-traffic startup website with limited content updates
- Easy to migrate to a proper database (PostgreSQL/MongoDB) when needed
- Shared Zod schemas ensure type safety between frontend and backend

### External Dependencies

**UI & Styling:**
- Radix UI - Accessible component primitives (dialogs, dropdowns, tooltips, etc.)
- Tailwind CSS - Utility-first CSS framework
- shadcn/ui - Pre-built component library
- Lucide React - Icon library

**State & Data Fetching:**
- TanStack Query - Server state management and caching
- React Hook Form - Form state management
- Zod - Schema validation and TypeScript type inference

**Development Tools:**
- Vite - Build tool and dev server
- TypeScript - Type safety across the stack
- tsx - TypeScript execution for development
- esbuild - Production bundling

**Analytics:**
- Google Analytics 4 - Page view tracking and event analytics

**Session Management:**
- express-session - Session middleware
- memorystore - In-memory session store (development/small-scale use)

**Fonts & Assets:**
- Google Fonts (Poppins) - Typography
- Unsplash - Stock imagery for blog posts and pages

**Note on Future Migrations:**
- The application is structured to easily migrate from file-based storage to PostgreSQL using Drizzle ORM
- Drizzle dependencies are present in package.json for future database integration
- Shared schema definitions enable smooth transition to database models