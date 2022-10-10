import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import io from 'socket.io-client';
import { LineWave } from 'react-loader-spinner';
import { useAuth } from "./auth";

const Products = () => {

    const socket = io.connect("http://localhost:5000");
    const [products, setProduct] = useState([""])
    const [user, setUser] = useState([""])
    const [current, setCurrent] = useState([""])
    const [error, setError] = useState(1)

    const auth = useAuth();
    const name = auth.user;

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:8000/user')
                .then((res) => {

                    return res.json();
                })
                .then((data) => {
                    setUser(data);
                    //socket.emit('send', data);
                    const found = data.find((profile) => profile.name === name);
                    setCurrent(found);
                    fetch('http://localhost:8000/products?uid=' + found.id)
                        .then((res) => {


                            return res.json();

                        })
                        .then((products) => {
                            if (!products) {
                                setError(1);
                            } else {
                                setProduct(products);
                                setError(0);
                                socket.emit('send', products);
                            }
                        })

                })

        }, 100);



    }, [])

    if (error == 1) {
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
        )
    }

    else if (error == 1 && !products[0].title) {
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
                        <div className="product-preview" key={product.pid} >
                            <Link id="flex" to={`/products/${current.id}/${product.pid}`}>
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
