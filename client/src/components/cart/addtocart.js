import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import FormInput from '../common/formInput';
import axios from 'axios';

const addToCart = (props)=>{
    const [quantity, setQuantity] = useState(props.location.state.quantity || 1);
    const [product, setProduct] = useState(props.location.state);

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
                <div className="row">
                    <h3 className="col-12">
                        <Link to={{pathname: `/product/${product.id}`}}>{product.name}</Link>
                        <small className="pl-4">{product.stockCount} in stock</small>
                    </h3>
                    <div className="col-12">
                        <p>price: {productPrice(product)}</p>
                        <h6>total: {productPrice(product) * quantity}</h6>
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
                                className="form-control w-25"
                            />
                            <button className="btn btn-outline-success mt-1">Add to Cart</button>
                        </form>
                    </div>
                </div>
            }
        </div>
    );
};

export default addToCart;