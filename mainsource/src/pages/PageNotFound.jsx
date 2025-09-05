import React from 'react'
import { useEffect } from 'react';

export default function PageNotFound() {
    useEffect(() => {
      document.title = "Page not found - Innerpece";
    }, []); // Empty dependency array ensures it runs once on mount
  return (
    <div className='flex items-center justify-center h-screen w-screen'>

     <p className='text-3xl lg:text-4xl xl:text-6xl'>Page Not Found</p>

    </div>
  )
}
