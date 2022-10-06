import { hover } from '@testing-library/user-event/dist/hover';
import { Link } from 'react-router-dom';

const Navbar = () => {


    return (

        <nav className="navbar">
            <h1>Farm Products</h1>
            <div className="links">
                <Link activeClass="active" smooth spy to="/">Home</Link>
                <Link activeClass="active" smooth spy to="/create">New Product</Link>
                <Link activeClass="active" target="_blank" smooth spy to="/live" style={{
                    backgroundColor: 'yellow', padding: '5px 7px',
                    borderRadius: '10px', color: 'green'
                }} >Live Updates</Link>
            </div>
        </nav>
    );
}

export default Navbar;