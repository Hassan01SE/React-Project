import { useAuth } from "./auth";
import { useHistory } from "react-router-dom"

const RequireAuth = ({ children }) => {
    const auth = useAuth();
    const history = useHistory();

    if (!auth.user) {
        history.push('/')
    }

    return children;
}

export default RequireAuth;