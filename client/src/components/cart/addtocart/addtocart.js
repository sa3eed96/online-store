import React, {useState} from 'react';
import axios from 'axios';
import {FaPlusCircle, FaMinusCircle, FaCartPlus} from 'react-icons/fa';
import './addtocart.scss';
import eventBus from '../../../utils/eventbus';

const addToCart = (props)=>{
    const [quantity, setQuantity] = useState(props.product.quantity || 1);

    const handleAdd = async(e)=> {
        try{
            e.preventDefault();
            if(quantity > props.color.stockCount || quantity < 1){
                eventBus.dispatch("showNotification", {
                    body: "invalid quantity, could not add to cart",
                    background: 'bg-danger',
                    header: 'Error',
                });
                return;
            }
            const cartProduct = {
                productId: props.product.id,
                productName: props.product.name,
                color: props.color.Color,
                quantity,
                price: props.product.Discount ?  
                props.product.price - props.product.Discount.discount/100 * props.product.price
                : props.product.price,
                op: 1
            };
            await axios.put('/api/cart', cartProduct);
            eventBus.dispatch("showNotification", {
                body: "Product added to cart",
                background: 'bg-success',
                header: 'Success',
            });
            props.setAddedToCart();
        }catch(err){ 
            console.log(err);
            eventBus.dispatch("showNotification", {
                body: "an error occurred could not add to cart",
                background: 'bg-danger',
                header: 'Error',
            });
        }
    };

    const handleQuantityChange = (val, e)=> {
        e.preventDefault();
        if((quantity === 1 && val === -1) || (quantity === props.color.stockCount && val === 1)){
            return;
        }
        setQuantity(quantity+val);
    };

    return(
        <div id="productAddToCart">
            <p>Quantity</p>
            <div id="quantityAdjust">
                <FaMinusCircle size="24" className="icons" onClick={e=>handleQuantityChange(-1, e)} />
                    <span>{quantity}</span>
                <FaPlusCircle size="24" className="icons" onClick={e=>handleQuantityChange(1, e)} />
            </div>
            <form onSubmit={handleAdd}>
                    <input
                        type="hidden"
                        name='quantity'
                        value={quantity}
                        required='required'
                    />
                <button type="submit" className="button"><FaCartPlus /> Add to Cart</button>
            </form>
        </div>
    );
};

export default addToCart;