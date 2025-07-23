// middleware.js (correct location: root or src folder)
import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get('token')?.value
  
  if (!token) {
    return NextResponse.redirect(new URL('/SignIn', request.url))
  }
  
  // ✅ CORRECT: This is how you use next() in middleware
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard', '/profile-edit', '/create-blog']
}