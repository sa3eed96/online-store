import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import Spinner from '../common/spinner';
import axios from 'axios';

const Cart = (props)=> {
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const getCart = async()=>{
            try{
                const {data} = await axios.get('/api/cart');
                setCart(data.cart);
                console.log(data.cart);
                let total = 0;
                data.cart.forEach(prod => {
                    total+= prod.quantity*prod.price;
                });
                setCartTotal(total);
                setLoading(false);
            }catch(err){
                props.showNotification(err, 'bg-danger','Error');
            }
        };
        getCart();
    },[]);

    const handleEmptyCart = async()=>{
        try{
            await axios.delete('/api/cart');
            setCart([]);
            setCartTotal(0);
        }catch(err){
            props.showNotification(err, 'bg-danger','Error');
        }
    };

    const handleRemoveProduct = async(product,index, e)=> {
        try{
            product.op = "0";
            await axios.put('/api/cart', {...product});
            const tempCart = [...cart];
            tempCart.splice(index, 1);
            setCart(tempCart);
            let total = 0;
            tempCart.forEach(prod => {
                total+= prod.quantity*prod.price;
            });
            setCartTotal(total);
        }catch(err){
            props.showNotification(err, 'bg-danger','Error');
        }
    };

    return (
        <div>
            <Spinner loading={loading}>
                <div style={{minHeight: window.screen.height/3}} className="row mt-4">
                    <div className="col-md-9 mx-auto bg-white pt-2">
                        <div className="row">
                            <div className="col">
                                <h5 >Shopping Cart ({cart.length})</h5>
                            </div>
                            <div className="col">
                                <h5 className="text-right">total: {cartTotal}<small> EGP</small></h5>
                            </div>
                        </div>
                        {cart.length > 0 &&
                            <div className="row">
                                <Link className="btn btn-sm btn-success ml-3" to={{pathname:'/purchase', state: cartTotal}}>checkout</Link>
                                <button className="btn btn-sm btn-danger ml-3" onClick={handleEmptyCart}>Empty Cart</button>
                            </div>
                        }
                        <hr />
                        <div className="row">
                            {cart.length === 0 && 
                                <div className="alert-warning col mx-2">
                                    <p>Cart is currently empty<br />
                                        Add items to your cart and view them here before checkout
                                    </p>
                                </div>
                            }
                            {cart.map((product, index) =>
                                (
                                    <div className="col-6 border-right" key={product.productId}>    
                                        <h6><Link to={{pathname: `/product/${product.productId}`}}>{product.productName}</Link></h6>
                                        <h6>quantity: {product.quantity}</h6>
                                        <h6>total: {product.price * product.quantity}<small> EGP</small></h6>
                                        <h6>color: {product.color}</h6>
                                        <button className="btn btn-secondary mr-2" onClick={(e) => handleRemoveProduct(product, index, e)}>Delete</button>
                                        <Link className="btn btn-primary mr-2" to={{pathname:"/addtocart", state:{
                                            product:{
                                                id: product.productId,
                                                name: product.productName,
                                                quantity: product.quantity,
                                                price: product.price,
                                            },
                                            color: product.color,
                                        }}}>Edit</Link>
                                    </div>   
                                )
                            )
                            }
                        </div>
                    </div>
                </div>
            </Spinner>
        </div>
    );
};

export default Cart;