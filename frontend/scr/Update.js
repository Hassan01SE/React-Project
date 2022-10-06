import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';



const Update = () => {

    const history = useHistory();


    const { id } = useParams();

    const [product, setProduct] = useState([""])
    const [title, setName] = useState("")
    const [seller, setSeller] = useState()
    const [price, setPrice] = useState()
    const [quantity, setQuantity] = useState()
    const [type, setType] = useState("")
    const [body, setText] = useState("")


    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:8000/products/' + id)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    setProduct(data);
                    setName(data.title);
                    setPrice(data.price);
                    setSeller(data.seller);
                    setQuantity(data.quantity);
                    setType(data.type);
                    setText(data.body);
                })

        }, 100);


    }, [id])





    const update = (e) => {
        e.preventDefault();


        const newproduct = { title, body, seller, price, quantity, type };

        fetch('http://localhost:8000/products/' + product.id, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newproduct)
        })
            .then((res) => {

                alert("Product Updated!");

                history.push('/');

            })
    }



    return (
        <div className="newproduct">
            {!title && <h1>Updating Product: {product.title}</h1>}
            {title && <h1>Updating Product: {title}</h1>}

            <form onSubmit={update}>


                <div >
                    <label>Product Name: <input style={{ marginLeft: '1.2em' }} type="text" name='' placeholder="Enter Product name here!" value={title}
                        onChange={(e) => {
                            setName(e.target.value);
                        }} /></label>

                    <br /><br />
                    <label>Seller: <input style={{ marginLeft: '1.2em' }} type="text" name='' required placeholder="Enter Seller name here!" value={seller}
                        onChange={(e) => {
                            setSeller(e.target.value);
                        }} /></label>

                    <br /><br />
                    <label>Price per unit ($): <input style={{ marginLeft: '1.2em' }} type="number" min={0} required placeholder="Enter Price here!" value={price}
                        onChange={(e) => {
                            setPrice(e.target.value);
                        }} /></label>

                    <br /><br />
                    <label>Quantity: <input style={{ marginLeft: '1.2em' }} type="number" min={0} required placeholder="Enter Quantity here!" value={quantity}
                        onChange={(e) => {
                            setQuantity(e.target.value);
                        }} /></label>

                    <br /><br />
                    <label>Type (unit): <input style={{ marginLeft: '1.2em' }} type="text" required placeholder="Enter Unit here!" value={type}
                        onChange={(e) => {
                            setType(e.target.value);
                        }} /></label>
                    <br /> <br />


                    <div className="editor">
                        <h5>Description of Product</h5>
                        <CKEditor
                            editor={ClassicEditor}
                            data={body}
                            onChange={(event, editor) => {
                                const data = editor.getData()
                                setText(data);

                            }}
                        />
                    </div>


                </div>
                <br />
                <button type="submit"><b>Update Product</b></button>
            </form>



        </div>
    );
}

export default Update;