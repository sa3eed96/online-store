import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import Spinner from '../common/spinner';
import axios from 'axios';
import eventBus from '../../utils/eventbus';
import EditCartItem from './editcartitem/editcartitem';

const Cart = (props)=> {
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [edit, setEdit] = useState(null);

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
                setLoading(false);
            }catch(err){
                eventBus.dispatch("showNotification", {
                    body: err,
                    background: 'bg-danger',
                    header: 'Error',
                });
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
            eventBus.dispatch("showNotification", {
                body: err,
                background: 'bg-danger',
                header: 'Error',
            });
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
            eventBus.dispatch("showNotification", {
                body: err,
                background: 'bg-danger',
                header: 'Error',
            });
        }
    };

    const toggleEdit = (flag, product)=>{
        if(product){
            if(flag){
                const temp = cart;
                let total = 0;
                for(let i=0; i<temp.length; i++){
                    if(temp[i].productId === product.productId){
                        temp[i] = product;
                    }
                    total+= temp[i].quantity*temp[i].price;
                }
                setCart(temp);
                setCartTotal(total);
                setEdit(null);
            }else{
                setEdit(product);
            }
        }else{
            setEdit(null);
        }
    };

    return (
        <div>
            <Spinner loading={loading}>
                <div className="row mt-4 thirdWindowHeight">
                    <div className="col-md-9 mx-auto bg-white pt-2">
                        <div className="row">
                            <div className="col">
                                <h5 >Shopping Cart ({cart.length})</h5>
                            </div>
                            <div className="col">
                                <h5 className="text-right">TOTAL: {cartTotal}<small> EGP</small></h5>
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
                                <div className="alert-warning col-12 mx-2">
                                    <p>Cart is currently empty<br />
                                        Add items to your cart and view them here before checkout
                                    </p>
                                </div>
                            }
                            {cart.map((product, index) =>
                                (
                                    <div className="col-sm-10 col-md-5 justify-content-center m-1 border-right" key={product.productId}>
                                        {edit && product.productId === edit.productId &&
                                            <EditCartItem product={edit} toggleEdit={toggleEdit} />
                                        }
                                        {(!edit || product.productId !== edit.productId) &&
                                            <div>
                                                <h6><Link to={{pathname: `/product/${product.productId}`}}>{product.productName}</Link></h6>
                                                <h6>quantity: {product.quantity}</h6>
                                                <h6>total: {product.price * product.quantity}<small> EGP</small></h6>
                                                <h6>color: {product.color}</h6>
                                                <button className="btn btn-dark mr-2" onClick={(e) => handleRemoveProduct(product, index, e)}>Delete</button>
                                                <button className="btn btn-dark mr-2" onClick={e=> toggleEdit(false, product)}>Edit</button>
                                            </div>
                                        }
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