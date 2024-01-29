import React from 'react'

function Footer() {
  return (
    <div>
        <div>
            <h1 className="text-xl font-bold">Contact Us</h1>
            <form
            action="https://formspree.io/f/xnqeqael"
            method="POST"
            className="max-w-md mx-auto"
        >
          <div className="mb-4 ">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
            <input
              type="email"
              name="email"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message:</label>
            <textarea
              name="message"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-500"
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline animate-pulse"
            >
              Send Message
            </button>
          </div>
        </form>  
        </div>
        <footer className='flex mt-[2rem] justify-around bg-[#0e542e] h-[5rem] text-white p-[2rem]'>
            <p>Website Author: Prince Hope</p>
            <a href='mailto:wkurts247@gmail.com'>Email: wkurts247@gmail.com</a>
            <p>© {new Date().getFullYear()} VillaStay<br/></p>
            <p>Terms and Conditions apply</p>
            <a href='https://www.linkedin.com/in/prince-hope-a38114239/' target='_blank' rel='noopener noreferrer'>
                <img alt='LinkedIn' src='/linkedin.png' className='w-10 h-10 cursor-pointer hover:opacity-70' />
            </a> 
            <a href='https://github.com/gokkuu100' target='_blank' rel='noopener noreferrer'>
                <img alt='GitHub' src='/github.png' className='w-10 h-10 cursor-pointer hover:opacity-70' />
            </a>
        </footer>
    </div>
  )
}

export default Footer