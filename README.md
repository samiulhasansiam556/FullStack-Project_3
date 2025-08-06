# Fullstack Project 3

A comprehensive full-stack web application built with Next.js 15 and React 19, featuring complete user authentication system, database integration with MongoDB, cloud-based image management through Cloudinary, and modern responsive UI design. This project demonstrates advanced full-stack development capabilities with secure authentication, API development, and cloud services integration.

## 🚀 Features

### User Features
**Authentication System**
- User registration and login with JWT tokens
- Secure password hashing with bcryptjs
- Session management and protected routes
- User profile management

**User Experience**
- Modern responsive design with Tailwind CSS
- Image upload and management via Cloudinary
- Real-time updates and interactions
- Optimized performance with Next.js features

### Developer Features
**Full-Stack Architecture**
- Next.js App Router with server-side rendering
- API routes for backend functionality
- Custom middleware for authentication and request handling
- MongoDB integration with Mongoose ODM

**Modern Development Stack**
- React 19 with latest features
- Tailwind CSS 4 for styling
- ESLint for code quality
- Turbopack for fast development builds

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with new features
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Modal** - Modal component library

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Node.js** - Runtime environment
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

### Cloud Services
- **Cloudinary** - Image storage and optimization
- **Next Cloudinary** - Cloudinary integration for Next.js

### Development Tools
- **ESLint** - Code linting and formatting
- **Turbopack** - Fast build tool
- **Axios** - HTTP client for API requests

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication pages
│   │   │   ├── login/         # Login page
│   │   │   └── register/      # Registration page
│   │   ├── (user)/            # User-specific pages
│   │   │   ├── profile/       # User profile
│   │   │   └── dashboard/     # User dashboard
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── users/         # User management
│   │   │   └── upload/        # File upload endpoints
│   │   ├── middleware/        # Route middleware
│   │   ├── globals.css        # Global styles
│   │   ├── layout.js          # Root layout
│   │   └── page.js            # Home page
│   ├── components/            # Reusable UI components
│   │   ├── auth/              # Authentication components
│   │   ├── ui/                # UI components
│   │   └── layout/            # Layout components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility functions
│   │   ├── auth.js            # Authentication utilities
│   │   ├── db.js              # Database connection
│   │   └── cloudinary.js      # Cloudinary configuration
│   ├── models/                # Database models
│   │   ├── User.js            # User model
│   │   └── index.js           # Model exports
│   ├── action/                # Server actions
│   └── middleware.js          # Global middleware
├── public/                    # Static assets
├── package.json              # Dependencies and scripts
├── next.config.mjs           # Next.js configuration
├── tailwind.config.js        # Tailwind configuration
└── README.md                 # Project documentation
```

## 🚦 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm, yarn, pnpm, or bun** - Package manager
- **MongoDB** (local installation or MongoDB Atlas)
- **Cloudinary Account** - For image management

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
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

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/fullstack-project-3
# or MongoDB Atlas connection string
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# Authentication
JWT_SECRET=your_super_secure_jwt_secret_key_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Running the Application

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

## 📱 Usage

### For Users
1. **Registration**: Create a new account with email and password
2. **Authentication**: Sign in to access protected features
3. **Profile Management**: Update profile information and upload images
4. **Dashboard**: Access personalized user dashboard

### For Developers
1. **API Development**: Use Next.js API routes for backend functionality
2. **Database Operations**: Leverage Mongoose for MongoDB interactions
3. **Authentication**: Implement JWT-based authentication system
4. **Image Management**: Integrate Cloudinary for image uploads

## 🔐 Authentication

The application uses a robust authentication system:

- **JWT Tokens**: Secure token-based authentication
- **Password Security**: bcryptjs for password hashing
- **Protected Routes**: Middleware for route protection
- **Session Management**: Persistent user sessions

## 🖼️ Image Management

Cloudinary integration provides:

- **Image Upload**: Direct upload to Cloudinary
- **Automatic Optimization**: Image compression and formatting
- **Responsive Images**: Multiple size variants
- **Secure URLs**: Protected image access

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks

## 🚀 Deployment

### Frontend & Backend (Vercel - Recommended)
1. **Build the project**: `npm run build`
2. **Deploy to Vercel**: Connect your repository to Vercel
3. **Environment Variables**: Set up environment variables in Vercel dashboard
4. **Custom Domain**: Configure custom domain if needed

### Database (MongoDB Atlas)
1. **Create MongoDB Atlas account**
2. **Set up cluster and database**
3. **Configure network access and database user**
4. **Update MONGODB_URI in environment variables**

### Image Storage (Cloudinary)
1. **Create Cloudinary account**
2. **Get API credentials from dashboard**
3. **Configure environment variables**
4. **Set up upload presets if needed**

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/verify` - Verify JWT token

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/upload` - Upload profile image

### Utility
- `POST /api/upload` - File upload to Cloudinary
- `GET /api/health` - Health check endpoint

## 📚 Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [React Documentation](https://react.dev/) - Learn about React 19 features
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS framework
- [MongoDB Documentation](https://docs.mongodb.com/) - NoSQL database
- [Mongoose Documentation](https://mongoosejs.com/docs/) - MongoDB ODM
- [Cloudinary Documentation](https://cloudinary.com/documentation) - Image and video management

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow ESLint configuration for code quality
- Write descriptive commit messages
- Test your changes thoroughly
- Update documentation as needed

## 🐛 Known Issues

- Environment setup may require additional configuration for some systems
- Image upload size limits depend on Cloudinary plan
- Development server may need restart after environment variable changes

## 📞 Support

For support and questions:
- Open an issue in the repository
- Check existing issues for similar problems
- Review documentation and setup guides

## 📄 License

This project is private and not licensed for public use.

---

**Built with ❤️ using Next.js, React, MongoDB, and Cloudinary**
