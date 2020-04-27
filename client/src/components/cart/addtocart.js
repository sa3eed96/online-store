import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const addToCart = (props)=>{
    const [quantity, setQuantity] = useState(props.location.state.quantity || 1);
    const [product, setProduct] = useState(props.location.state);

    const handleAdd = async(e)=> {
        try{
            e.preventDefault();
            const cartProduct = {
                productId: product.id,
                productName: product.name,
                quantity,
                price: product.price,
                op: 1
            };
            await axios.put('/api/cart', cartProduct);
            props.history.replace('/cart');
        }catch(err){ 
            alert(err);
        }
    };

    const handleQuantityChange = (e)=> {
        setQuantity(e.target.value);
    };

    return(
            <div>
                <h1>add to cart</h1>
                <h6><Link to={{pathname: `/product/${product.id}`}}>{product.name}</Link></h6>
                <p>price: {product.price}</p>
                <h6>total: {product.price * quantity}</h6>
                <form onSubmit={handleAdd}>
                    <label htmlFor="cartQuantity">quantity:</label>
                    <input id="cartQuantity" value={quantity} onChange={handleQuantityChange} />
                    <button>Add to Cart</button>
                </form>
            </div>
    );
};

export default addToCart;