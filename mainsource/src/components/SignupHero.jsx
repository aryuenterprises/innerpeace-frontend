import React from 'react'
import { useNavigate } from 'react-router-dom'

function Hero() {
  let navigate=useNavigate()

  return (
    <div className="bg-[url('././assets/Signuphero.png')] h-[30vh] md:h-[50vh] w-full bg-no-repeat bg-center bg-cover">
      
      <div className='flex flex-col h-full items-center justify-center gap-5'>
        <p className='text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold'>User Sign Up</p>
        <div className='flex gap-5'>
          <p className='text-sky-300 cursor-pointer hover:text-white' onClick={()=>navigate('/')}>Home</p>
          <p className='text-white'>User Registration</p>

        </div>


      </div>
    </div>
  )
}

export default Hero