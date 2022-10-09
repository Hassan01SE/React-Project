import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import io from 'socket.io-client';
import { LineWave } from 'react-loader-spinner';

const Products = () => {

    const socket = io.connect("http://localhost:5000");
    const [products, setProduct] = useState([""])

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:8000/products')
                .then((res) => {

                    return res.json();
                })
                .then((data) => {
                    setProduct(data);
                    socket.emit('send', data)
                })


        }, 100);


    }, [])

    if (!products[0].title) {
        return (
            <div style={{ marginBottom: '80%' }}>
                <LineWave
                    height="100"
                    width="100"
                    color="#4D7298"
                    ariaLabel="line-wave"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    firstLineColor=""
                    middleLineColor=""
                    lastLineColor=""
                />
            </div>
        );
    } else {



        return (
            <div className="title">


                <div className="productlist">

                    {products.map(product => (
                        <div className="product-preview" key={product.id} >
                            <Link id="flex" to={`/products/${product.id}`}>
                                <div>
                                    <h2>{product.title}</h2>
                                    {product && <p>Sold by {product.seller}</p>} </div>

                            </Link>
                        </div>
                    ))}

                </div>
            </div>
        );
    }
}

export default Products
