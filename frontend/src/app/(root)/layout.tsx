import Navbar from '@/components/NavbarV2'
import React from 'react'

const RootLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <>
    
    <Navbar/>
    <main className='flex justify-center items-center mt-4 container w-full mx-auto'>
        {children}
    </main>
    </>
  )
}

export default RootLayout