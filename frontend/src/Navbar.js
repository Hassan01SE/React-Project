import { hover } from '@testing-library/user-event/dist/hover';
import { Link } from 'react-router-dom';
import { useAuth } from './auth';
import { useState, useEffect } from 'react';

const Navbar = () => {

    const auth = useAuth();
    //const name = auth.user;
    const [name, setname] = useState(() => {
        // getting stored value
        const saved = sessionStorage.getItem("name");
        const initialValue = JSON.parse(saved);

        return initialValue || "";
    });

    const [log, setlog] = useState(0)

    useEffect(() => {
        if (name === auth.user) {
            setlog(1);
        }
        if (name !== auth.user) {
            setlog(2);
        }

    })

    /* const [name,setname] = useState()
 */


    const logout = () => {
        localStorage.clear();
        sessionStorage.clear();
        auth.logout();
        window.location.reload(false);
    }

    return (

        <nav className="navbar">
            <h1>Farm Products</h1>
            <div className="links">
                <Link activeClass="active" smooth spy to="/home">Home</Link>

                {/* <Link activeClass="active" smooth spy to="/login">Login</Link> */}

                {auth.user && < Link onClick={logout} activeClass="active" smooth spy to="/">Sign Out</Link>}
                {!auth.user && log === 1 && < Link activeClass="active" smooth spy to="/">Login</Link>}
                {!auth.user && name && < Link onClick={logout} activeClass="active" smooth spy to="/" id='out'>Sign Out</Link>}
                {!auth.user && !name && < Link activeClass="active" smooth spy to="/">Login</Link>}


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
