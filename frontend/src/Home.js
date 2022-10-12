import { useState, useEffect } from 'react';
import Products from './Products';
import io from 'socket.io-client';
import { useAuth } from './auth';
import { useHistory } from 'react-router-dom';

const Home = () => {

    const auth = useAuth();
    //const [name, setname] = useState(auth.user)
    const [name, setname] = useState(() => {
        // getting stored value
        const saved = sessionStorage.getItem("name");
        const initialValue = JSON.parse(saved);
        return initialValue || auth.user;
    });




    const history = useHistory();
    const socket = io.connect("http://localhost:5000");

    const [message, setmessage] = useState("You have no notifications")
    const [count, setcount] = useState(0)




    useEffect(() => {
        document.title = "Farm Products";

        sessionStorage.setItem("name", JSON.stringify(name));



        socket.on('message', (message) => {
            if (message.uname === name) {
                setmessage(message.notify);
                setcount(1);
            }
        })


    }, [])

    const notify = () => {
        const x = document.querySelector('#trigger');
        if (x.classList.contains('badge')) {
            x.classList.replace('badge', 'badge2');
            x.textContent = message;
        }
        else if (x.classList.contains('badge2')) {
            x.classList.replace('badge2', 'badge');
            x.textContent = count;
        }

    }

    /* const notify = () => {
        const x = document.querySelector('#trigger');
        if (x.classList.contains('badge2')) {
            x.textContent = "";
            x.classList.remove('badge2');
        } else {
            x.classList.add('badge2');
            x.textContent = "User1 shared a product";
        }
    } */

    return (
        <div className="homepage">

            <a onClick={notify} href="#" className="notification">

                <span style={{ color: 'white' }}>Notification</span>
                <span id='trigger' className="badge">{count}</span>

            </a>
            <br />
            <h1>All Products</h1>
            <p><b>{name}'s Products</b></p>
            <Products />

        </div>

    );
}

export default Home;