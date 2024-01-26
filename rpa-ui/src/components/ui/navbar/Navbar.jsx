import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context';
import './Navbar.css';
import {
    ABOUT_ROUTE,
    USERS_ROUTE,
    MAIN_ROUTE,
    SUBSTATIONS_ROUTE,
    LOGIN_ROUTE,
} from '../../../utils/constants';

const Navbar = () => {
    const { host, setHost } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = () => {
        setHost(null);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate(LOGIN_ROUTE);
    };

    return host ? (
        <div className="navbar">
            <button onClick={logout}>Выйти</button>
            <div className="navbar__links">
                <Link to={MAIN_ROUTE}>Main</Link>
                <Link to={SUBSTATIONS_ROUTE}>Substations</Link>
                <Link to={USERS_ROUTE}>Users</Link>
                <Link to={ABOUT_ROUTE}>About</Link>
            </div>
        </div>
    ) : (
        <div className="navbar">
            <div className="navbar__links"></div>
        </div>
    );
};

export default Navbar;
