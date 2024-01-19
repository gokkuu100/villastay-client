import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <nav>
        <ul>
          <Link href='#'>Home</Link>
          <Link href='#'>About</Link>
          <Link href='#'>Contacts</Link>
          <Link href='#'>Help Center</Link>
        </ul>
      </nav>
    </div>
  )
}

export default Home