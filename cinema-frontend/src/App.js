import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Reservation from './components/Reservation';
import PasswordReset from './components/PasswordReset';
import ChangePassword from './components/ChangePassword';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/reserve" element={<Reservation />} />
                <Route path="/password_reset" element={<PasswordReset />} />
                <Route path="/change_password" element={<ChangePassword />} />
            </Routes>
        </Router>
    );
};

export default App;
