import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaBars, FaMoon, FaSun } from 'react-icons/fa';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import './styles/App.css';

const App = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
    const dispatch = useDispatch();
    const theme = useSelector(state => state.theme);
    const isAuthenticated = useSelector(state => state.isAuthenticated);

    const toggleTheme = () => {
        dispatch({ type: 'TOGGLE_THEME' });
    };

    if (!isAuthenticated) {
        return <Login />;
    }

    return (
        <div className={`app-container ${theme}`}>
            <button 
                className="menu-toggle"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open menu"
            >
                <FaBars />
            </button>

            <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
            <main className="main-content">
                <header className="app-header">
                    <button 
                        className="theme-toggle" 
                        onClick={toggleTheme}
                        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
                    </button>
                </header>
                <TaskInput />
                <TaskList />
            </main>
        </div>
    );
};

export default App;