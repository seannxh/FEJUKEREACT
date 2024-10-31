// components/NavBar/NavBar.js
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/tracks">Tracks</Link>
                </li>
                <li>
                    <Link to="/tracks/new">New Track</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
