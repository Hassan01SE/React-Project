import { useEffect } from 'react';
import Products from './Products';


const Home = ({ name }) => {

    useEffect(() => {
        document.title = "Farm Products";
    }, [])

    return (
        <div className="homepage">
            <h1>All Products</h1>

            <Products name={name} />

        </div>

    );
}

export default Home;