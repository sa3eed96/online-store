import React, {useState, useEffect} from 'react';
import {FaPlusCircle, FaMinusCircle} from 'react-icons/fa';
import Spinner from '../../common/spinner';
import '../addtocart/addtocart.scss';
import axios from 'axios';
import eventBus from '../../../utils/eventbus';

const EditProductItem = (props)=>{
    const [product, setProduct] = useState(props.product);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const getStockCount = async()=> {
            const {data} = await axios.get(`/api/product/${product.productId}?color=${product.color}`);
            setProduct({...product, stockCount: data.product.Colors[0].stockCount});
            setLoading(false);
        };
        getStockCount();
    }, []);

    const handleQuantityChange = (val, e)=> {
        e.preventDefault();
        if((product.quantity === 1 && val === -1) || (product.quantity === product.stockCount && val === 1)){
            return;
        }
        setProduct({...product, quantity: parseInt(product.quantity)+val});
    };

    const handleAdd = async(e)=> {
        try{
            e.preventDefault();
            const cartProduct = {
                productId: product.productId,
                productName: product.productName,
                color: product.color,
                quantity: product.quantity,
                price: product.price,
                op: 1
            };
            await axios.put('/api/cart', cartProduct);
            eventBus.dispatch("showNotification", {
                body: 'cart Edited',
                background: 'bg-success',
                header: 'Success',
            });
            props.toggleEdit(true, product);
        }catch(err){ 
            eventBus.dispatch("showNotification", {
                body: 'Error editing cart, please try again later',
                background: 'bg-danger',
                header: 'Error',
            });
        }
    };

    return (
        <Spinner loading={loading}>
            <h6>{product.productName}</h6>
            <div id="quantityAdjust">
                <h6>quantity:</h6>
                <FaMinusCircle size="24" className="icons" onClick={e=>handleQuantityChange(-1, e)} />
                    <span>{product.quantity}</span>
                <FaPlusCircle size="24" className="icons" onClick={e=>handleQuantityChange(1, e)} />
            </div>
            <h6>total: {product.price * product.quantity}<small> EGP</small></h6>
            <h6>color: {product.color}</h6>
            <button className="btn btn-dark mr-2" onClick={handleAdd}>Save</button>
            <button className="btn btn-dark mr-2" onClick={e=> props.toggleEdit(false, null)}>Cancel</button>
        </Spinner>
    );

};

export default EditProductItem;