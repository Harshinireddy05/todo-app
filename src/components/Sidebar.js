import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaListAlt, FaRegCalendarAlt, FaStar, FaClock, FaUserAlt, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import { selectTaskStats } from '../redux/reducers';

const Sidebar = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const stats = useSelector(selectTaskStats);
    const currentView = useSelector(state => state.currentView);
    const userName = useSelector(state => state.user?.name || 'User');
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    const navItems = [
        { id: 'all', icon: <FaListAlt />, label: 'All Tasks' },
        { id: 'today', icon: <FaRegCalendarAlt />, label: 'Today' },
        { id: 'important', icon: <FaStar />, label: 'Important' },
        { id: 'planned', icon: <FaClock />, label: 'Planned' },
        { id: 'assigned', icon: <FaUserAlt />, label: 'Assigned to me' }
    ];

    return (
        <>
            <div 
                className={`sidebar-overlay ${isOpen ? 'show' : ''}`} 
                onClick={onClose}
            />
            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                <button 
                    className="sidebar-close"
                    onClick={onClose}
                    aria-label="Close sidebar"
                >
                    <FaTimes />
                </button>
                <div className="user-profile" onClick={() => setShowProfileMenu(!showProfileMenu)}>
                    <img 
                        src="https://ui-avatars.com/api/?name=User&background=4CAF50&color=fff" 
                        alt="User" 
                        className="user-avatar" 
                    />
                    <h3>Hey, {userName}</h3>
                    {showProfileMenu && (
                        <div className="profile-menu">
                            <button onClick={handleLogout}>
                                <FaSignOutAlt />
                                Logout
                            </button>
                        </div>
                    )}
                </div>

                <nav className="nav-menu">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            className={`nav-item ${currentView === item.id ? 'active' : ''}`}
                            onClick={() => dispatch({ type: 'SET_VIEW', payload: item.id })}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="stats-section">
                    <h4>Today Tasks</h4>
                    <div className="stats-circle">
                        <div className="stats-percentage">{stats.percentage}%</div>
                        <div className="stats-label">Completed</div>
                    </div>
                    <div className="stats-details">
                        <div className="stats-item">
                            <span className="stats-dot pending"></span>
                            <span>Pending ({stats.pending})</span>
                        </div>
                        <div className="stats-item">
                            <span className="stats-dot completed"></span>
                            <span>Completed ({stats.completed})</span>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar; 