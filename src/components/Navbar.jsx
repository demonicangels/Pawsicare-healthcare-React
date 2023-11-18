import { NavLink } from 'react-router-dom';
import '../css/Navbar.css'
import DarkModeToggle from "react-dark-mode-toggle";
import { useState } from 'react';

const links = [
    {
        id: 1,
        path: '/',
        text: "Home"
    },
    {
        id: 2,
        path: '/doctors',
        text: "Doctors"
    },
    {
        id: 3,
        path: '/aboutus',
        text: "About us"
    },
    {
        id: 4,
        path: '/contacts',
        text: "Contacts"
    }
]

const Navbar = ({isDarkMode,setIsDarkMode}) => {

    const navStyle = {
        background: isDarkMode ? 'white' : '#B7C9E2',
    };

    const liStyle = {
        color: isDarkMode ? 'black' : 'white',
    }
    

    return ( 
        <nav className="navbar">
            <div className="nav" style={navStyle}>
                <ul>
                    {links.map(link => {
                        return (
                            <li key={link.id}>
                                {
                                    <NavLink to={link.path} style={liStyle}>
                                        {link.text}
                                    </NavLink>
                                }
                            </li>
                        );
                    })}
                <DarkModeToggle
                    onChange={setIsDarkMode}
                    checked={isDarkMode}
                    size={70}   
                />
                </ul>
            </div>
        </nav>
     );
}

export default Navbar;