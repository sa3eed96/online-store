import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

const Cart = (props)=> {
    const [cart, setCart] = useState([]);

    useEffect(()=>{
        const getCart = async()=>{
            try{
                const cart = await axios.get('/api/cart');
                setCart(cart.data.cart);
            }catch(err){
                alert(err);
            }
        };
        getCart();
    },[]);

    const handleEmptyCart = async()=>{
        try{
            await axios.delete('/api/cart');
            setCart([]);
        }catch(err){
            alert(err);
        }
    };

    const handleRemoveProduct = async(product,index, e)=> {
        try{
            product.op = "0";
            await axios.put('/api/cart', {...product});
            const tempCart = [...cart];
            tempCart.splice(index, 1);
            setCart(tempCart);
        }catch(err){
            alert(err);
        }
    };

    return (
        <div>
            <h1>Cart</h1>
            {cart.length > 0 &&
                <div>
                    <button onClick={handleEmptyCart}>Empty Cart</button>
                    <hr />
                </div>
            }
            {cart.map((product, index) =>
                (
                    <div key={product.productId}>
                        <h6><Link to={{pathname: `/product/${product.productId}`}}>{product.productName}</Link></h6>
                        <h6>quantity: {product.quantity}</h6>
                        <h6>total price: {product.price * product.quantity}</h6>
                        <button onClick={(e) => handleRemoveProduct(product, index, e)}>Remove Product</button>
                        <Link to={{pathname:"/addtocart", state:{
                            id: product.productId,
                            name: product.productName,
                            quantity: product.quantity,
                            price: product.price,
                        }}}>Edit</Link>
                        <hr />
                    </div>   
                )
            )

            }
        </div>
    );
};

export default Cart;