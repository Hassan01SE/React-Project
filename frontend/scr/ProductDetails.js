import { useParams, useHistory, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';



const ProductDetails = () => {


    const { id } = useParams();

    const [product, setProduct] = useState([""])
    const [status, setstatus] = useState(0)
    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:8000/products/' + id)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    setProduct(data);
                    if (data) {
                        document.title = data.title;
                    }


                })

        }, 100);


    }, [id])


    const history = useHistory();

    const handleDelete = () => {
        fetch('http://localhost:8000/products/' + product.id, {
            method: 'DELETE'
        }).then((res) => {
            alert("Product Deleted!");
            history.push('/');
        })
    }

    useEffect(() => {
        if (!product.title) { setstatus(0) } else { setstatus(1) }
    }, [product.title])



    if (status === 1) {
        return (


            <div className="prodetail">

                <h1>Product: {product.title} </h1>
                <h3>Seller: {product.seller}</h3>
                <br />
                <h4>Price: ${product.price} per {product.type}</h4>
                <h4>In Stock: {product.quantity} </h4>
                <br />

                <div dangerouslySetInnerHTML={{ __html: product.body }} />
                <br />
                <hr />
                <br />

                {product && <button className='delbtn' onClick={handleDelete}>DELETE</button>}
                <Link activeClass="active" smooth spy to={`/products/update/${product.id}`}> <button id="updatebtn">UPDATE</button></Link>




            </div >

        );
    } else {

        document.title = "Looking for product";
        setTimeout(() => {
            let text = document.querySelector('#loader');
            text.classList.add('load');
            text.textContent = "Product not Found! :(";
            document.title = "Not Found"

        }, 2000)
        return (
            <div id='loader' style={{ marginBottom: '60%' }}>Loading ...</div>
        );

    }
}

export default ProductDetails;