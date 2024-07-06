import React, { useState } from 'react';
import api from '../services/api';

const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await api.put('/change_password/', {
                password,
                password2
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Password changed successfully!');
        } catch (error) {
            console.error('Error changing password:', error);
            alert('Error changing password');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>New Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div>
                <label>Confirm Password:</label>
                <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} required />
            </div>
            <button type="submit">Change Password</button>
        </form>
    );
};

export default ChangePassword;
