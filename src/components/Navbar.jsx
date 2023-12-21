import { NavLink } from 'react-router-dom';
import '../css/Navbar.css'
import DarkModeToggle from "react-dark-mode-toggle";
import React, { useState } from 'react';
import TokenService from '../services/TokenService';

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

    const isLoggedIn = TokenService.getAccessToken() !== null;

    let userRole = null;
    if(isLoggedIn){
        const claims = TokenService.getClaims();
        userRole = claims.role;
    }

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

                    { isLoggedIn !== null && userRole === 'Client' ? (
                        <React.Fragment>
                            <li>
                                <NavLink to="/appointments" style={liStyle}>
                                    My Appointments 
                                </NavLink>
                            </li> 
                            <li>
                                <NavLink to="/mypets" style={liStyle}>
                                    My Pets 
                                </NavLink>
                            </li>
                        </React.Fragment> ) : (
                        
                        <React.Fragment>
                            <li>
                                <NavLink to="/appointments" style={liStyle}>
                                    My Appointments 
                                </NavLink>
                            </li> 
                        </React.Fragment> )
                    }

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