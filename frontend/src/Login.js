import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import Home from "./Home";
import Products from "./Products";
import Navbar from "./Navbar";
import { useAuth } from "./auth";

const Login = () => {

    sessionStorage.clear();

    document.title = "Login Page";

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState([''])
    const [confirm, setConfirm] = useState(false)
    const history = useHistory();

    const auth = useAuth();

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:8000/user')
                .then((res) => {

                    return res.json();
                })
                .then((data) => {
                    setUser(data);
                })


        }, 100);


    }, [])



    const handlelogin = (e) => {
        e.preventDefault();
        const msg = document.querySelector('#incorrect');
        msg.textContent = "";
        msg.style.backgroundColor = "lightBlue";

        // const profile = { name, password };

        /*  const found = user.some((profile) => {
             return user.name === profile.name && user.password === profile.password
 
 
         }); */
        const found = user.find((profile) =>
            profile.name === name && profile.password === password
        )

        console.log(found);

        if (found) {
            alert("Login Successful");
            msg.textContent = "Successful Login";
            msg.style.backgroundColor = "lightBlue";
            setConfirm(true);
            auth.login(name);
            history.push('/home');

            //history.push('/');
        } else {
            msg.textContent = "Credentials Entered are Incorrect!";
            msg.style.backgroundColor = "#B73E3E";
            setName('');
            setPassword('');
            setConfirm(false);
        }

        /*     user.forEach((profile) => {
                if (profile.name === name && profile.password === password) {
                    alert("Login Successful");
                    msg.textContent = "Successful Login";
                    msg.style.backgroundColor = "lightBlue";
                    setConfirm(true);
    
    
                } else {
                    //alert("Credentials Entered are Incorrect!");
    
                    msg.textContent = "Credentials Entered are Incorrect!";
                    msg.style.backgroundColor = "#B73E3E";
                    setName('');
                    setPassword('');
                    setConfirm(false);
                }
            })
    
     */
        /* 
                if (confirm) {
                    <Home name={name} />
                    history.push('/');
                } */

    }



    return (

        <div className="login" style={{ marginBottom: '65%' }}>
            <div className="loginhead">
                <h1>Account Login</h1>
                <br />
                <br />
                <div id="incorrect" style={{
                    color: 'white', backgroundColor: 'lightBlue', padding: '5px 7px',
                    borderRadius: '10px'
                }}></div>
                <br /> <br />
            </div>

            <form onSubmit={handlelogin}>
                <label>User Name: <input style={{ marginLeft: '1.1em' }} type="text" required placeholder="username" value={name}
                    onChange={(e) => { setName(e.target.value) }} /> </label> <br /> <br />
                <label>Password: <input style={{ marginLeft: '1.9em' }} type="password" required placeholder="password" value={password}
                    onChange={(e) => { setPassword(e.target.value) }} /> </label>
                <br /> <br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button>Login</button>
                </div>
            </form>
            <br />

            <div>
                <p>Don't have an account? Click <Link activeClass="active" smooth spy to="/register"><u style={{ marginTop: '90%' }}> <b>SignUp</b></u></Link> to register an account!  </p>
            </div>

            {/* {confirm && <Products name={name} />} */}

        </div >

    );
}

export default Login;


