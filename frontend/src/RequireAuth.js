import { useAuth } from "./auth";
import { useHistory } from "react-router-dom"
import { useEffect, useState } from "react";

const RequireAuth = ({ children }) => {
    const auth = useAuth();
    const history = useHistory();

    //const [name, setname] = useState(auth.user)

    /* useEffect(() => {
        const logged = localStorage.getItem("user");
        if (logged) {
            setname(logged);
            console.log(logged);
        }
    }, []) */

    const [name, setname] = useState(() => {
        // getting stored value
        const saved = sessionStorage.getItem("name");
        const initialValue = JSON.parse(saved);
        return initialValue || auth.user;
    });



    if (!name) {
        history.push('/login')
    }

    return children;
}

export default RequireAuth;