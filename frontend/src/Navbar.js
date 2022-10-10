import { hover } from '@testing-library/user-event/dist/hover';
import { Link } from 'react-router-dom';
import { useAuth } from './auth';

const Navbar = () => {

    const auth = useAuth();

    const logout = () => {
        auth.logout();

    }

    return (

        <nav className="navbar">
            <h1>Farm Products</h1>
            <div className="links">
                <Link activeClass="active" smooth spy to="/home">Home</Link>

                {/* <Link activeClass="active" smooth spy to="/login">Login</Link> */}
                {auth.user && < Link onClick={logout} activeClass="active" smooth spy to="/">Sign Out</Link>}
                {!auth.user && < Link activeClass="active" smooth spy to="/">Login</Link>}
                <Link activeClass="active" smooth spy to="/create">New Product</Link>
                <Link activeClass="active" smooth spy to="/live" style={{
                    backgroundColor: 'yellow', padding: '5px 7px',
                    borderRadius: '10px', color: 'green'
                }} >Live Updates</Link>
            </div>
        </nav >
    );
}

export default Navbar;