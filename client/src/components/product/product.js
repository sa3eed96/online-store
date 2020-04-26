import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Comment from './comment';
import axios from 'axios';
import {UserContext, UserContextProvider} from '../../contexts/user';

const Product = (props)=>{
    let { id } = useParams();
    const [product, setProduct] = useState({});
    useEffect(()=>{
        const getProduct = async()=>{
            try{
                const product = await axios.get(`/api/product/${id}`);
                setProduct(product.data.product);
            }catch(err){
                alert(err);
            }
        };
        getProduct();
    }, []);
    

    return (
        <div>
            <h3>{product.name}</h3>
            <h6>price: {product.price}</h6>
            <p>{product.description}</p>
                <UserContext.Consumer>
                    {user=>(product.id && 
                    <Comment productId={product.id} user={user} />
                    )}
                </UserContext.Consumer>
        </div>
    );
};

export default Product;