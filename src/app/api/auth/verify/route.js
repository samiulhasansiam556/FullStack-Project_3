

import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import cookie from 'cookie';
import { NextResponse } from 'next/server';
import DBConnection from '@/lib/Db';
import User from '@/models/userModel';


export async function GET(req) {
  //  const token = cookies().get('token')?.value;
      const cookies = cookie.parse(req.headers.get('cookie') || '');
       const token = cookies.token;
       // console.log("token",token)
      // console.log(process.env.NEXT_PUBLIC_JWT_SECRET)

     if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    try {
        const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
        //console.log(decoded)
        await DBConnection();
        const user = await User.findById(decoded.id).select("-password");
        if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });
        // console.log(user)
        // Remove password from user object before sending response
        user.password = undefined; 
        return NextResponse.json({ user:user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Invacblid token" }, { status: 401 });
    }
}
