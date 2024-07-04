import React, { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const Reservation = () => {
    const [screening, setScreening] = useState([]);
    const [selectedScreening, setSelectedScreening] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [seatsReserved, setSeatsReserved] = useState(1);

    useEffect(() => {
        const fetchScreenings = async () => {
            const response = await api.get('/screenings/');
            setScreening(response.data);
        };

        fetchScreenings();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/reservations/', {
                screening: selectedScreening,
                customer_name: customerName,
                customer_email: customerEmail,
                seats_reserved: seatsReserved
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            alert('Rezerwacja zakończona sukcesem!');
        } catch (error) {
            console.error('Błąd rezerwacji:', error);
            alert('Błąd rezerwacji');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Screening:</label>
                <select value={selectedScreening} onChange={(e) => setSelectedScreening(e.target.value)} required>
                    <option value="">Select Screening</option>
                    {screening.map(screening => (
                        <option key={screening.id} value={screening.id}>
                            {screening.movie.title} - {screening.screening_time}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Name:</label>
                <input type='text' value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
            </div>
            <div>
                <label>Email:</label>
                <input type='email' value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} required />
            </div>
            <div>
                <label>Seats:</label>
                <input type='number' value={seatsReserved} onChange={(e) => setSeatsReserved(e.target.value)} min="1" required />
            </div>
            <button type='submit'>Reserve</button>
        </form>
    );
    
};

export default Reservation;