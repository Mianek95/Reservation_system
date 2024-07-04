import React, { useState } from 'react';
import api from '../services/api';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/token/',{
                username,
                password
            });
            localStorage.setItem('token', response.data.access);
            alert('Logowanie zakończone sukcesem!');
        } catch (error) {
            console.error('Błąd logowania:', error);
            alert('Błąd logowania');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div>
                <label>Password:</label>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <button type='submit'>Login</button>
        </form>
    );
};

export default Login;