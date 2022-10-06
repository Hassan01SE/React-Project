import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Link } from "react-router-dom";

const Live = () => {

    useEffect(() => {
        document.title = "Live Updates";
    }, [])

    const socket = io.connect("http://localhost:5000");


    const [products, setProduct] = useState([""])


    useEffect(() => {
        socket.on("products", (payload) => {
            setProduct(payload);

        })

    })


    return (
        <div style={{ marginBottom: '70%' }} className="title">
            <h1>Products updated appear here!</h1>

            <div className="productlist">


                {products.map((payload) => (
                    <div className="product-preview" key={payload.id} >
                        <Link id="flex" to={`/products/${payload.id}`}>
                            <div>
                                {/* {payload.title && payload.change == '1' && <h4 style={{
                                    color: 'green', backgroundColor: 'yellow', padding: '5px 7px',
                                    borderRadius: '10px'
                                }}>Changes Made</h4>} */}
                                <h2>{payload.title}</h2>
                                {payload.seller && <p>Sold by {payload.seller}</p>} </div>

                        </Link>
                    </div>
                ))}

            </div>
        </div>
    );


}

export default Live;