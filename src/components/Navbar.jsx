import { NavLink } from 'react-router-dom';
import '../Navbar.css'

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
    },

    
]

const Navbar = () => {
    return ( 
        <nav className="navbar">
            <div className="nav">
                <ul>
                    {links.map(link => {
                        return (
                            <li key={link.id}>
                                {
                                    <NavLink to={link.path}>
                                        {link.text}
                                    </NavLink>
                                }
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
     );
}

export default Navbar;