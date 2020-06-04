import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

const Cart = (props)=> {
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(()=>{
        const getCart = async()=>{
            try{
                const {data} = await axios.get('/api/cart');
                setCart(data.cart);
                let total = 0;
                data.cart.forEach(prod => {
                    total+= prod.quantity*prod.price;
                });
                setCartTotal(total);
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
            <div className="row justify-content-start">
                <div className="col-md-1">
                    <h4>Cart</h4>
                    <h6>cart total: {cartTotal}</h6>
                </div>
                {cart.length > 0 &&
                    <div className="col-md-11">
                        <Link className="btn btn-sm btn-success m-2" to={{pathname:'/purchase', state: cartTotal}}>checkout</Link>
                        <button className="btn btn-sm btn-danger m-2" onClick={handleEmptyCart}>Empty Cart</button>
                    </div>
                }
            </div>
            <hr />
            <div className="row">
                {cart.map((product, index) =>
                    (
                        <div className="col-12" key={product.productId}>
                            <h6><Link to={{pathname: `/product/${product.productId}`}}>{product.productName}</Link></h6>
                            <h6>quantity: {product.quantity}</h6>
                            <h6>total price: {product.price * product.quantity}</h6>
                            <button className="btn btn-outline-danger mr-2" onClick={(e) => handleRemoveProduct(product, index, e)}>Remove Product</button>
                            <Link className="btn btn-outline-primary mr-2" to={{pathname:"/addtocart", state:{
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
        </div>
    );
};

export default Cart;