import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const VerifyEmail = () => {
    const { uidb64, token } = useParams();

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                await api.get(`/verify/${uidb64}/${token}/`);
                alert('Email verified successfully!');
            } catch (error) {
                console.error('Error verifying email:', error);
                alert('Error verifying email');
            }
        };

        verifyEmail();
    }, [uidb64, token]);

    return (
        <div>
            <h2>Verifying your email...</h2>
        </div>
    );
};

export default VerifyEmail;
