import React from 'react'
import { Link } from 'react-router-dom'
import GetProperties from './GetProperties'
import Footer from './Footer';

function Home() {
  return (
    <div>
      <nav className=''>
        <ul className='flex justify-around m-[2rem]'>
          <p>Villa-Stay</p>
          <Link href='#'>Home</Link>
          <Link href='#'>About</Link>
          <Link href='#'>Contacts</Link>
          <Link href='#'>HelpCenter</Link>
        </ul>
      </nav>
  <GetProperties />
  <Footer />
    </div>
  )
}

export default Home;