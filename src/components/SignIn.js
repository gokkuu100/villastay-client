import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/villas/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('id', data.id);  
                    localStorage.setItem('role', data.role);

                    console.log(data.token, data.role, data.id);

                    if (data.role === 'guest') {
                        navigate('/home');
                    } else if (data.role === 'admin') {
                        localStorage.setItem('admin_id', data.admin_id)
                        navigate('/home')
                    } else {
                        navigate("/signin")
                    }
                } else {
                    console.error('Authentication failed');
                }
            } else {
                console.error('Invalid credentials');
            }
        } catch (error) {
            alert(`An error occurred: ${error}`);
        }
    };

    return (
        <div>
            <h1>Sign In</h1>
            <form onSubmit={handleSignIn}>
                <label>Email:</label><br />
                <input
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
                <br />
                <label>Password:</label><br />
                <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />
                <br />
                <button type='submit'>Sign In</button>
            </form>
        </div>
    );
}

export default SignIn;
