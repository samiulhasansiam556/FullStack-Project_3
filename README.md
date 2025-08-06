# Fullstack Blogging Platform
A modern full-stack blogging platform built with Next.js 15 and React 19, featuring user authentication, content management, social interactions, and cloud-based image storage.

🚀 Features

## User Features

### Authentication System
- User registration and login
- JWT-based authentication  
- Secure password hashing with bcryptjs
- Profile management with image upload
- Username and email uniqueness validation

### Blogging Experience
- Create, edit, and delete blog posts
- Rich text content support
- Image upload via Cloudinary integration
- Category-based content organization
- Blog discovery and browsing

### Social Interactions
- Like and unlike blog posts
- Comment system on blog posts
- User profile viewing
- Follow user activities through dashboard

### User Dashboard
- Personal blog management
- Profile editing with address details
- View personal blog statistics
- Category management for organizing content

## Content Management Features

### Blog Management
- Create new blog posts with title, content, and images
- Edit existing blog posts
- Delete blog posts
- Category assignment for better organization
- Timestamp tracking for all posts

### Category System
- Create and manage custom categories
- Organize blogs by categories
- Category-based blog filtering
- User-specific category management

### Interactive Features
- Real-time like/unlike functionality
- Comment system with user references
- Blog engagement tracking
- User interaction analytics

🛠️ Tech Stack

## Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with modern features
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Modal** - Modal components for UI interactions
- **Turbopack** - Ultra-fast bundler for development

## Backend
- **Next.js API Routes** - Serverless backend functions
- **Node.js** - Runtime environment
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - MongoDB ODM for data modeling

## Authentication & Security
- **JWT (jsonwebtoken)** - Token-based authentication
- **bcryptjs** - Password hashing and security
- **Cookie** - Secure cookie management
- **CORS** - Cross-origin resource sharing

## Cloud Services
- **Cloudinary** - Image storage and optimization
- **Next-Cloudinary** - Next.js Cloudinary integration

## Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Axios** - HTTP client for API requests

📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication pages
│   │   │   ├── SignIn/        # User login page
│   │   │   └── SignUp/        # User registration page
│   │   ├── (user)/            # Protected user pages
│   │   │   ├── Dashboard/     # User dashboard
│   │   │   ├── blog-details/  # Individual blog view
│   │   │   ├── create-blog/   # Blog creation form
│   │   │   ├── edit-blog/     # Blog editing form
│   │   │   ├── find-user/     # User search functionality
│   │   │   └── profile-edit/  # Profile management
│   │   ├── api/               # Backend API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── blog/          # Blog CRUD operations
│   │   │   ├── comment/       # Comment management
│   │   │   ├── like/          # Like/unlike functionality
│   │   │   ├── get-category/  # Category retrieval
│   │   │   ├── profile-update/ # Profile updates
│   │   │   └── cloudinary-sign/ # Image upload signatures
│   │   ├── middleware/        # Route protection middleware
│   │   ├── globals.css        # Global styles
│   │   ├── layout.js          # Root layout component
│   │   └── page.js            # Home page
│   ├── components/            # Reusable UI components
│   │   └── nav/               # Navigation components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility functions and configs
│   ├── models/                # Database schemas
│   │   ├── userModel.js       # User data model
│   │   ├── blogModel.js       # Blog post model
│   │   ├── categoryModel.js   # Category model
│   │   ├── commentModel.js    # Comment model
│   │   └── likeModel.js       # Like model
│   ├── action/                # Server actions
│   └── middleware.js          # Global middleware
├── public/                    # Static assets
├── package.json               # Dependencies and scripts
├── next.config.mjs           # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

🚦 Getting Started

## Prerequisites
- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun
- MongoDB database (local or MongoDB Atlas)
- Cloudinary account for image storage

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd fullstake-project-3
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/blogplatform
# or MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blogplatform

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

## Running the Application

1. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

2. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

3. **Access the application**
   - **Home Page**: Browse all blog posts
   - **Sign Up**: Create a new account at `/SignUp`
   - **Sign In**: Login at `/SignIn`
   - **Dashboard**: Access personal dashboard at `/Dashboard`
   - **Create Blog**: Start writing at `/create-blog`

📱 Usage

## For Users

### Getting Started
1. **Registration**: Create a new account with username, email, and password
2. **Profile Setup**: Add profile image and address details
3. **Create Content**: Start writing your first blog post
4. **Organize**: Create categories to organize your content

### Blogging
1. **Write Posts**: Use the rich editor to create engaging content
2. **Add Images**: Upload images directly to your posts via Cloudinary
3. **Categorize**: Assign categories to make content discoverable
4. **Edit**: Update your posts anytime with the edit functionality

### Social Features
1. **Engage**: Like and comment on other users' posts
2. **Discover**: Browse posts by categories
3. **Connect**: View other users' profiles and their content
4. **Track**: Monitor your blog's engagement through the dashboard

🔐 Authentication

The application uses a robust authentication system:

- **JWT Tokens**: Secure token-based authentication
- **Password Security**: bcryptjs hashing for password protection
- **Route Protection**: Middleware-based route protection
- **Session Management**: Secure cookie-based session handling
- **User Validation**: Email and username uniqueness validation

🖼️ Image Management

Cloudinary integration provides:

- **Automatic Upload**: Direct image upload to cloud storage
- **Optimization**: Automatic image compression and optimization
- **Responsive Images**: Multiple size variants for different devices
- **Secure URLs**: Protected image URLs with transformation capabilities

🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks

📝 API Endpoints

## Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info

## Blog Management
- `GET /api/blog` - Get all blogs
- `POST /api/blog` - Create new blog post
- `PUT /api/edit-blog/:id` - Update blog post
- `DELETE /api/blog/:id` - Delete blog post
- `GET /api/blog/:id` - Get specific blog post

## Categories
- `GET /api/get-category` - Get all categories
- `POST /api/get-category` - Create new category
- `GET /api/get-categories-by-user` - Get user's categories
- `GET /api/get-blog-by-categories/:id` - Get blogs by category
- `DELETE /api/delete-category/:id` - Delete category

## Social Features
- `POST /api/like` - Like/unlike a blog post
- `POST /api/comment` - Add comment to blog post
- `GET /api/comment/:blogId` - Get blog comments

## User Management
- `GET /api/profile-update` - Get user profile
- `PUT /api/profile-update` - Update user profile
- `GET /api/find-user` - Search users

## Cloudinary
- `POST /api/cloudinary-sign` - Get upload signature for images

🚀 Deployment

## Frontend (Vercel - Recommended)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   npx vercel --prod
   ```

3. **Set environment variables** in Vercel dashboard
   - Add all variables from `.env.local`
   - Ensure MongoDB URI points to production database

## Alternative Platforms

### Netlify
1. Build command: `npm run build`
2. Publish directory: `.next`
3. Set environment variables in Netlify dashboard

### Railway/Heroku
1. Set up production environment variables
2. Configure build scripts
3. Deploy from GitHub repository

## Database Setup

### MongoDB Atlas (Recommended)
1. Create cluster at [MongoDB Atlas](https://cloud.mongodb.com)
2. Get connection string
3. Add to `MONGODB_URI` environment variable

### Local MongoDB
1. Install MongoDB locally
2. Use connection string: `mongodb://localhost:27017/blogplatform`

🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development Guidelines

- Follow ESLint configuration for code quality
- Use meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed
- Ensure responsive design compatibility

📚 Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [React Documentation](https://react.dev/) - Learn about React
- [Tailwind CSS](https://tailwindcss.com/docs) - Learn about Tailwind CSS
- [MongoDB](https://docs.mongodb.com/) - Learn about MongoDB
- [Mongoose](https://mongoosejs.com/) - Learn about Mongoose ODM
- [Cloudinary](https://cloudinary.com/documentation) - Learn about image management

🐛 Known Issues

- Profile image upload requires proper Cloudinary configuration
- Some responsive design improvements in progress
- Comment editing functionality to be implemented
- Advanced search and filtering features planned

📞 Support

For support and questions:
- Open an issue in the repository
- Check the documentation links above
- Review the API endpoints for integration help

🔮 Future Enhancements

- Rich text editor with markdown support
- Advanced search and filtering
- Email notifications for comments and likes  
- Blog analytics and insights
- Social media sharing integration
- Multi-language support
- Advanced user roles and permissions

📄 License

This project is private and not licensed for public use.

---

Built with ❤️ using Next.js, React, MongoDB, and Cloudinary
