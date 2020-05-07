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
            {product.stockCount &&
                <div>
                    <h1>add to cart</h1>
                    <h6>
                        <Link to={{pathname: `/product/${product.id}`}}>{product.name}</Link>
                        <small>{product.stockCount} in stock</small>
                    </h6>
                    <p>price: {product.price}</p>
                    <h6>total: {product.price * quantity}</h6>
                    <form onSubmit={handleAdd}>
                        <FormInput
                            type="number"
                            id='cartQuantity'
                            label='quantity: '
                            name='quantity'
                            value={quantity}
                            onChange={handleQuantityChange}
                            required='required'
                            min="1"
                            max={product.stockCount}
                        />
                        <button>Add to Cart</button>
                    </form>
                </div>
            }
        </div>
    );
};

export default addToCart;