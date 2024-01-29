import React from 'react'
import { Link } from 'react-router-dom'
import GetProperties from './GetProperties'
import Footer from './Footer';

function Home() {
  return (
    <div className='bg-[#0e542e] h-[5rem]'>
      <div className=''>
      <nav className=''>
        <ul className='flex justify-around p-[1rem] text-white mb-[4rem]'>
          <p>Villa-Stay</p>
          <Link href='#'>Home</Link>
          <Link href='#'>About</Link>
          <Link href='#'>Contacts</Link>
          <Link href='#'>HelpCenter</Link>
        </ul>
      </nav>
      </div>
    </div>
  )
}

export default Home;