import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions';
import '../styles/Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim()) {
            dispatch(login({ username }));
        }
    };

    const handleGuestLogin = () => {
        dispatch(login({ name: 'Guest User' }));
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Welcome to Do It</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your name"
                        className="login-input"
                    />
                    <button type="submit" className="login-button">
                        Get Started
                    </button>
                </form>
                <button className="guest-button" onClick={handleGuestLogin}>
                    Login as Guest
                </button>
            </div>
        </div>
    );
};

export default Login;