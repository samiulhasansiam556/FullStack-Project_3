'use client'

import React from 'react'
import Link from 'next/link'
import {useRouter} from 'next/navigation'

export default function NavIn() {

    const router = useRouter();


    const handlelogout = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
   
        router.push("/SignIn");
    }


  return (
    <div className='flex justify-between items-center px-8 md:px-18 h-16 bg-blue-500 text-white relative shadow-sm font-mono'>
    <div>
        <h1 className='text-2xl'>MyBlog</h1>
    </div>

    <div className='flex space-x-4'>
        <Link href="/SignIn" className='bg-black text-white p-2 rounded-lg'
        onClick={handlelogout}
        >
            Logout  
         </Link>
         <Link href="/profile-edit" className='bg-black text-white p-2 rounded-lg'>
            Profile
         </Link>

    </div>
 </div>

  )
}
