import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/villas/guest/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        alert("Sign up successful!");
        navigate("/"); 
      } else {
        alert("SignUp failed!");
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className=''>
        <label>First Name</label><br />
        <input placeholder='first' name="fname" value={formData.fname} onChange={handleChange} className='w-[10rem] border border-box' required></input><br />
        <label>Last Name</label>
        <input placeholder='last' name='lname' value={formData.lname} onChange={handleChange} className='   ' required></input><br />
        <label>Email</label>
        <input placeholder='email' name='email' value={formData.email} onChange={handleChange} className='' required></input><br />
        <label>Password</label>
        <input placeholder='password' name='password' value={formData.password} onChange={handleChange} className='' required></input><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SignUp;
