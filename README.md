# Innovixus IT Services & Consultancy

A professional, full-stack website for Innovixus IT Services, a tech startup based in Surat, Gujarat, specializing in backend development, DevOps consulting, and cloud architecture solutions.

## Features

- **Multi-page Layout**: Home, About, Services, Blog, and Contact pages
- **Blog System**: Public blog listing with individual post views and admin management
- **Admin Dashboard**: Secure admin panel with hardcoded authentication
- **Contact Form**: Collect inquiries from potential clients
- **Dark Mode**: Automatic light/dark theme switching with system preference sync
- **SEO Optimized**: Proper meta tags, structured data, and Open Graph tags
- **Responsive Design**: Mobile-first design that works on all devices
- **Google Maps**: Embedded map showing Surat location
- **File-based Storage**: JSON-based data persistence (no database required)

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Build tool and dev server
- **Wouter** - Lightweight client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Pre-built component library
- **React Hook Form** - Form state management
- **TanStack Query** - Server state management
- **Lucide React** - Icon library

### Backend
- **Express.js** - Node.js web framework
- **TypeScript** - Type safety
- **Express-session** - Session management
- **Memorystore** - In-memory session storage
- **Zod** - Schema validation

### Storage
- **File-based JSON storage** - No external database required
- Data stored in `.data/` directory

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd innovixus
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Project Structure

```
├── client/                          # Frontend React application
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   │   ├── ui/                # Shadcn components
│   │   │   ├── HTMLEditor.tsx      # HTML content editor for blog
│   │   │   └── SEO.tsx             # SEO meta tag component
│   │   ├── pages/                  # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Blog.tsx
│   │   │   ├── BlogPost.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── admin/
│   │   │       ├── Blog.tsx        # Admin blog management
│   │   │       └── Dashboard.tsx   # Admin dashboard
│   │   ├── hooks/                  # Custom React hooks
│   │   ├── lib/                    # Utility functions
│   │   ├── App.tsx                 # Main app component
│   │   └── index.css               # Global styles
│   └── vite.config.ts              # Vite configuration
│
├── server/                          # Backend Express application
│   ├── index.ts                    # Entry point
│   ├── routes.ts                   # API routes
│   ├── replitAuth.ts               # Authentication setup
│   ├── storage.ts                  # File-based storage layer
│   └── vite.ts                     # Vite middleware integration
│
├── shared/                          # Shared types and schemas
│   └── schema.ts                   # Zod schemas for validation
│
├── .data/                           # Data directory (created at runtime)
│   ├── blog-posts.json            # Blog post storage
│   └── contact-submissions.json    # Contact form submissions
│
└── package.json                    # Project dependencies
```

## Admin Dashboard

Access the admin dashboard at `http://localhost:5000/admin`

### Credentials
- **Email**: `admin@innovixus.com`
- **Password**: `innovixus123`

### Admin Features
- **Blog Management**: Create, edit, and delete blog posts
- **HTML Editor**: Write blog content with HTML formatting
- **Contact Management**: View and manage contact form submissions
- **Post Publishing**: Control whether posts are published or in draft

## API Endpoints

### Public Endpoints
- `GET /api/blog` - List all published blog posts
- `GET /api/blog/:slug` - Get a specific blog post
- `POST /api/contact` - Submit contact form
- `POST /api/auth/login` - Login to admin

### Protected Endpoints (Requires Authentication)
- `GET /api/admin/blog` - List all blog posts (including drafts)
- `POST /api/admin/blog` - Create a new blog post
- `PATCH /api/admin/blog/:id` - Update a blog post
- `DELETE /api/admin/blog/:id` - Delete a blog post
- `GET /api/admin/contact` - List contact submissions
- `GET /api/auth/user` - Get current logged-in user

## Data Schemas

### Blog Post
```typescript
{
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // HTML content
  category: string;
  author: string;
  authorAvatar: string | null;
  imageUrl: string | null;
  isPublished: boolean;
  publishedAt: Date;
}
```

### Contact Submission
```typescript
{
  id: number;
  name: string;
  email: string;
  company: string | null;
  message: string;
  isRead: boolean;
  submittedAt: Date;
}
```

## Customization

### Colors & Styling
Edit `client/src/index.css` to customize the color scheme. The application uses CSS variables for theming.

### Site Content
- **Home Page**: `client/src/pages/Home.tsx`
- **About Page**: `client/src/pages/About.tsx`
- **Services Page**: `client/src/pages/Services.tsx`
- **Contact Page**: `client/src/pages/Contact.tsx`

### Admin Credentials
Change credentials in `server/replitAuth.ts`:
```typescript
const ADMIN_EMAIL = "admin@innovixus.com";
const ADMIN_PASSWORD = "innovixus123";
```

## Deployment

The application is ready to deploy to any Node.js hosting platform:

1. Build the frontend
2. The Express server serves the built frontend
3. Data files are stored in `.data/` directory

For production deployment, consider:
- Using persistent storage for `.data/` directory
- Migrating to a proper database (PostgreSQL, MongoDB)
- Setting strong `SESSION_SECRET` environment variable
- Configuring HTTPS

## Database Migration

The application is structured to easily migrate from file-based storage to PostgreSQL using Drizzle ORM. Drizzle dependencies are already included in `package.json`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Static site generation for public pages
- Optimized image loading
- Efficient caching with TanStack Query
- Minimal bundle size with tree-shaking

## License

All rights reserved © Innovixus IT Services

## Contact

For inquiries, visit the contact page or email the Innovixus team through the website.
