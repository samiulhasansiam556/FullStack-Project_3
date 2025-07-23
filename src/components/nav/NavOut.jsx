import Link from 'next/link'
import React from 'react'

export default function NavOut() {
  return (
    <div>


          <div className='flex justify-between items-center px-8 md:px-18 h-16 bg-blue-500 text-white relative shadow-sm font-mono'>
             <div>
                 <h1 className='text-2xl'>MyBlog</h1>
             </div>

             <div className='flex space-x-4'>
                 <Link href="/SignIn" className='bg-black text-white p-2 rounded-lg'>
                     SignIn    
                  </Link>
                  <Link href="/SignUp" className='bg-black text-white p-2 rounded-lg'>
                     SignUp  
                  </Link>

             </div>
          </div>
      
    </div>
  )
}
