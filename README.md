# Fullstack Project 3

A full-stack Next.js application with user authentication, database integration, and cloud-based image management.

## 🚀 Features

- **User Authentication**: Secure login/signup with JWT tokens
- **Database Integration**: MongoDB with Mongoose ODM
- **Image Management**: Cloudinary integration for image upload and optimization
- **Modern UI**: Built with Tailwind CSS for responsive design
- **API Routes**: RESTful API endpoints for backend functionality
- **Middleware**: Custom authentication and request handling

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, bcryptjs
- **Image Storage**: Cloudinary
- **HTTP Client**: Axios
- **Development**: ESLint, Turbopack

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun
- MongoDB database
- Cloudinary account for image management

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## 🚀 Getting Started

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

3. **Set up environment variables**
   - Copy `.env.example` to `.env.local`
   - Fill in your database and API credentials

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── (auth)/         # Authentication pages
│   ├── (user)/         # User-specific pages
│   ├── api/            # API routes
│   └── middleware/     # Route middleware
├── components/         # Reusable React components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
├── models/             # Database models
├── action/             # Server actions
└── middleware.js       # Global middleware
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code linting

## 📚 Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [React Documentation](https://react.dev/) - Learn about React
- [Tailwind CSS](https://tailwindcss.com/docs) - Learn about Tailwind CSS
- [MongoDB](https://docs.mongodb.com/) - Learn about MongoDB
- [Cloudinary](https://cloudinary.com/documentation) - Learn about Cloudinary

## 🚀 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Make sure to set up your environment variables in your deployment platform.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and not licensed for public use.
