import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import Rate from './rate';
import axios from 'axios';
import {UserContext, UserContextProvider} from '../../contexts/user';

const Product = (props)=>{
    let { id } = useParams();
    const [product, setProduct] = useState({});
    const [cart, setCart] = useState(null);
    useEffect(()=>{
        const getProduct = async()=>{
            try{
                const product = await axios.get(`/api/product/${id}`);
                setCart(product.data.cart);
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
            <p>{product.stockCount} in stock</p>
            <p>{product.description}</p>
                <UserContext.Consumer>
                    {user=>(product.id && 
                    <div>
                        {user.state.isAuthenticated &&
                            <Link to={{pathname:cart? '/cart':'/addtocart', state: cart? null : product}}>{cart? 'added to cart':'add to cart'}</Link>
                        }
                        <Rate productId={product.id} rate={product.Rate} user={user} />
                    </div>
                    )}
                </UserContext.Consumer>
        </div>
    );
};

export default Product;