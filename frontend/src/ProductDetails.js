import { useParams, useHistory, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from './auth';



const ProductDetails = () => {


    const { id, pid } = useParams();
    console.log(pid + " and id is" + id);

    const [product, setProduct] = useState([""])
    const [user, setUser] = useState([""])
    const [status, setstatus] = useState(0)

    const auth = useAuth();


    const [name, setname] = useState(() => {
        // getting stored value
        const saved = sessionStorage.getItem("name");
        const initialValue = JSON.parse(saved);
        return initialValue || auth.user;
    });

    document.title = "ProductDetails";

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:8000/user/' + id)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    setUser(data);
                    fetch(`http://localhost:8000/products/${pid}`)
                        .then((res) => {
                            return res.json();
                        })
                        .then((pro) => {
                            console.log(pro);
                            setProduct(pro);
                            //setstatus(1);

                        })

                    /* const pro = data.products;
                    const found = pro.find((profile) =>
                        profile.pid == pid
                    )
                    if (found) {
                        console.log(found);
                        setProduct(found);
                        setstatus(1);
                    } */

                    /* const found = data.products.find((product) => product.pid === pid);
                    if (found) { setProduct(found); }
 */
                    /* setProduct(pro.filter((item) => item.pid == pid)); */


                })

        }, 100);


    }, [id])


    const history = useHistory();

    const handleDelete = () => {
        fetch('http://localhost:8000/products/' + product.id, {
            method: 'DELETE'
        }).then((res) => {
            alert("Product Deleted!");
            history.push('/home');
        })
    }

    useEffect(() => {
        if (!product.title) { setstatus(0) } else { setstatus(1) }
    }, [product.title])



    if (status === 1 && user.name == name && product.uid == id) {
        return (


            <div className="prodetail">

                <h1>Product: {product.title} </h1>
                <h3>Seller: {product.seller}</h3>
                <br />
                <h4>Price: ${product.price} per {product.type}</h4>
                <h4>In Stock: {product.quantity} </h4>
                <br />
                <h4>Description</h4>
                <div dangerouslySetInnerHTML={{ __html: product.body }} />
                <br />
                <hr />
                <br />

                {product && <button className='delbtn' onClick={handleDelete}>DELETE</button>}
                <Link activeClass="active" smooth spy to={`/user/${id}/products/update/${product.pid}`}> <button id="updatebtn">UPDATE</button></Link>

                <Link activeClass="active" smooth spy to={`/share/${product.id}`}> <button className="sharebtn">SHARE</button></Link>


            </div >

        );
    }



    //for loading title document
    else {

        /* document.title = "Looking for product"; */
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
