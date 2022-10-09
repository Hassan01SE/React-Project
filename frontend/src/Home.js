import { useEffect } from 'react';
import Products from './Products';


const Home = () => {

    useEffect(() => {
        document.title = "Farm Products";
    }, [])

    return (
        <div className="homepage">
            <h1>All Products</h1>

            <Products />

        </div>

    );
}

export default Home;