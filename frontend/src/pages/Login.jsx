import React, {useState} from 'react'
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [ formData, setFormData ] = useState({ email: '', password: '' });
    const [ message, setMessage ] = useState('');
    const navigate = useNavigate();
    // handling input changes

    const handleChanges = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    // handle form submission
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/auth/login", formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            localStorage.setItem('token', response.data.token)
            setMessage('Login Successfull');
            setTimeout(() => {
                navigate('/expense')
            },1000)
        } catch (error) {
            setMessage('Invalid Username or Password');
            console.error('Login error', error.response?.data || error.message)

        }
    }
  return (
    <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" onChange={handleChanges} required/>
            <input type="password" name="password" placeholder="Password" onChange={handleChanges} required/>
            <button type="submit">Login</button>
        </form>
        {message && <p>{message}</p>}
    </div>
  )
}

export default Login