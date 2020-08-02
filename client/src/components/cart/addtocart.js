import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import FormInput from '../common/formInput';
import axios from 'axios';
import ImageView from '../product/imageView';
import ErrorBoundary from '../errorboundry';

const addToCart = (props)=>{
    const [quantity, setQuantity] = useState(props.location.state.product.quantity || 1);
    const [product, setProduct] = useState(props.location.state.product);
    const [color, setColor] = useState(props.location.state.color);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        if(color.hasOwnProperty('stockCount')){
            setLoading(false);
            return;
        }
        const getStockCount = async()=> {
            const {data} = await axios.get(`/api/product/${product.id}?color=${color}`);
            setProduct({...product, stockCount: data.product.Colors[0].stockCount});
            setColor(data.product.Colors[0]);
            setLoading(false);
        };
        getStockCount();
    }, []);

    const handleAdd = async(e)=> {
        try{
            e.preventDefault();
            const cartProduct = {
                productId: product.id,
                productName: product.name,
                color: color.Color,
                quantity,
                price: product.discount> 0 ? product.discountPrice : product.price,
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

    const productPrice = (product)=> {
        if(product.discount > 0){
            return product.discountPrice;
        }
        return product.price;
    };

    return(
        <div>
            {loading &&
                <div className="row mt-4">
                    <div className="spinner-border text-primary mx-auto" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            }
            {!loading && color.hasOwnProperty('stockCount') &&
                <div className="row mt-4">
                    <div className="col-md-8 bg-white mx-auto border">
                        <div className="row border-bottom my-2">
                            <h5 className="col">Add to Cart</h5>
                        </div>
                        <div className="row">
                            <div className="col-md-4 col-sm-10 offset-sm-1 mx-1">
                                <ErrorBoundary>
                                    <ImageView images={color} />
                                </ErrorBoundary>
                            </div>
                            <div className="col-md-4 col-sm-12 border-left">
                                <div className="row">
                                    <div className="col">
                                        <p className=""><Link to={{pathname: `/product/${product.id}`}}>{product.name}</Link></p>
                                    </div>
                                    <div className="col">
                                        <p><small> {color.stockCount} in stock</small></p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <p className="">price: {productPrice(product)} <small> EGP</small></p>
                                    </div>
                                    <div className="col">
                                        <p className="">total: <b>{productPrice(product) * quantity}</b> <small> EGP</small></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-12 border-left">
                                <form onSubmit={handleAdd}>
                                    <label htmlFor="cartQuantity">quantity</label>
                                    <input
                                        type="number"
                                        id='cartQuantity'
                                        name='quantity'
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                        required='required'
                                        min="1"
                                        max={color.stockCount}
                                        className="form-control w-50"
                                    />
                                <button className="btn btn-success mt-1">Add to Cart</button>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default addToCart;