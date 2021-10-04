import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/logo.png';

import './Logo.css';

export default function Logo(props) {
    return (
        <aside className="logo">
            <Link to="/home" className="logo">
                <img src={logo} alt="logo" />
            </Link>
        </aside>
    );
}