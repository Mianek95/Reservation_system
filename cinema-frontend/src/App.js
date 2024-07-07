import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Reservation from './components/Reservation';
import ChangePassword from './components/ChangePassword';
import VerifyEmail from './components/VerifyEmail';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/reserve" element={<Reservation />} />
                <Route path="/change_password" element={<ChangePassword />} />
                <Route path="/verify/:uidb64/:token" element={<VerifyEmail />} />
            </Routes>
        </Router>
    );
};

export default App;
