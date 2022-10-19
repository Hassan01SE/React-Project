import { Link } from "react-router-dom";
import ohno from './ohno.jpg'
const Nopage = () => {
    document.title = "Not Found";
    return (
        <div style={{ marginBottom: '70%' }}>

            <h1>The Page you requested is not found!</h1> <br />
            <marquee behavior="center" direction="right"><img src={ohno} alt="a potato saying oh no" style={{ width: '50%' }} /></marquee> <br />
            <h3>You might have mistyped a keyword in the url ^_^</h3> <br />
            <p>Navigate back to homepage by clicking <Link to='/home'><b><u>ME!</u></b></Link></p>

        </div>
    );
}

export default Nopage;
