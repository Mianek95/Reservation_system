import React, {useState } from 'react';
import api from '../services/api';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/register', {
                username,
                email,
                password,
                password2
            });
            alert('Rejestracja zakończona sukcesem!');
        } catch (error) {
            console.error('Błąd rejestracji:', error);
            alert('Błąd rejestracji');
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} required/>
            </div>
            <div>
                <label>Email:</label>
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div>
                <label>Password:</label>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <div>
                <label>Confirm Password:</label>
                <input type='password' value={password2} onChange={(e) => setPassword2(e.target.value)} required/>
            </div>
            <button type='submit'>Register</button>
        </form>
    );
};

export default Register;