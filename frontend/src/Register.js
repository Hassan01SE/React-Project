import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";


const Register = () => {

    document.title = "Registration";

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState([''])
    const history = useHistory();

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:8000/user')
                .then((res) => {

                    return res.json();
                })
                .then((data) => {
                    setUser(data);
                })


        }, 1000);


    }, [])

    const handleregister = (e) => {
        e.preventDefault();
        const msg = document.querySelector('#incorrect');
        msg.textContent = "";
        msg.style.backgroundColor = "lightGreen";


        const found = user.find((profile) =>
            profile.name === name
        )

        if (!found) {
            const profile = { name, password };
            fetch('http://localhost:8000/user', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(profile)
            })
                .then(() => {
                    msg.textContent = "Your Account has been Registered, redirecting to Login Page!";
                    msg.style.backgroundColor = "cyanBright";
                    setName('');
                    setPassword('');
                    //history.push('/login');
                    setTimeout(() => {
                        history.push('/login');
                    }, 1000)
                })
        } else {
            msg.textContent = "UserName is already taken, use another user name";
            msg.style.backgroundColor = "#ef6900";
            setName('');
            setPassword('');
        }



        /* user.forEach((profile) => {
            if (profile.name === name) {
                msg.textContent = "UserName is already taken, use another user name";
                msg.style.backgroundColor = "#ef6900";
                setName('');
                setPassword('');

            } else {    
                const profile = { name, password };
                fetch('http://localhost:8000/user', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(profile)
                })
                    .then(() => {
                        msg.textContent = "Your Account has been Registered, please sign in again!";
                        msg.style.backgroundColor = "cyanBright";
                        setName('');
                        setPassword('');
                        //history.push('/login');
                    })


            
        }) */

    }



    return (

        <div className="register" style={{ marginBottom: '65%' }}>
            <div className="registerhead">
                <h1>Account Registration</h1>
                <br />
                <br />
                <div id="incorrect" style={{
                    color: 'white', backgroundColor: 'lightGreen', padding: '5px 7px',
                    borderRadius: '10px'
                }}></div>
                <br /> <br />
            </div>

            <form onSubmit={handleregister}>
                <label>User Name: <input style={{ marginLeft: '1.1em' }} type="text" required placeholder="enter username you want" value={name}
                    onChange={(e) => { setName(e.target.value) }} /> </label> <br /> <br />
                <label>Password: <input style={{ marginLeft: '1.9em' }} type="password" required placeholder="set your password" value={password}
                    onChange={(e) => { setPassword(e.target.value) }} /> </label>
                <br /> <br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button>Register</button>
                </div>
            </form>
            <br />

            <div>
                <p>Already have an account? Click <Link activeClass="active" smooth spy to="/"><u style={{ marginTop: '90%' }}> <b>Login</b></u></Link> </p>
            </div>

        </div >





    );
}

export default Register;