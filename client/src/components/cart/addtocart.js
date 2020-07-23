import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import FormInput from '../common/formInput';
import axios from 'axios';
import ImageView from '../product/imageView';

const addToCart = (props)=>{
    const [quantity, setQuantity] = useState(props.location.state.product.quantity || 1);
    const [product, setProduct] = useState(props.location.state.product);
    const [images, setImages] = useState(props.location.state.color);

    useEffect(()=>{
        if(product.hasOwnProperty('stockCount')){
            return;
        }
        const getStockCount = async()=> {
            const {data} = await axios.get(`/api/product/${product.id}`);
            setProduct({...product, stockCount: data.product.stockCount});
        };
        getStockCount();
    }, []);

    const handleAdd = async(e)=> {
        try{
            e.preventDefault();
            const cartProduct = {
                productId: product.id,
                productName: product.name,
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
            {product.stockCount &&
                <div className="row mt-4">
                    <div className="col-md-8 bg-white mx-auto border">
                        <div className="row border-bottom my-2">
                            <h5 className="col">Add to Cart</h5>
                        </div>
                        <div className="row">
                            <div className="col-md-4 col-sm-10 offset-sm-1 mx-1">
                                <ImageView images={images} />
                            </div>
                            <div className="col-md-4 col-sm-12 border-left">
                                <div className="row">
                                    <div className="col">
                                        <p className=""><Link to={{pathname: `/product/${product.id}`}}>{product.name}</Link></p>
                                    </div>
                                    <div className="col">
                                        <p><small> {product.stockCount} in stock</small></p>
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
                                        max={product.stockCount}
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