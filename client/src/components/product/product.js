import React, {useState, useEffect, lazy, Suspense, useContext} from 'react';
import { useParams, Link } from 'react-router-dom';
const Rate = lazy(()=> import('../rate/rate'));
import axios from 'axios';
import {UserContext} from '../../contexts/user';
import RateView from '../rate/rateview';
import ImageView from './imageView/imageView';
import ErrorBoundry from '../errorboundry';
import Spinner from '../common/spinner';
import Specifications from './specifications/specifications';
import './product.scss';
import AddToCart from '../cart/addtocart/addtocart';
import { FaShoppingCart } from 'react-icons/fa'

const Product = (props)=>{
    let { id } = useParams();
    const [product, setProduct] = useState(null);
    const [cart, setCart] = useState(null);
    const [color, setColor] = useState(null);
    const [tabIndex, setTabIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const user = useContext(UserContext);

    useEffect(()=>{
        const getProduct = async()=>{
            try{
                const product = await axios.get(`/api/product/${id}`);
                setCart(product.data.cart);
                setColor(product.data.product.Colors[0]);
                setProduct(product.data.product);
                setLoading(false);
            }catch(err){
                alert(err);
            }
        };
        getProduct();
    }, []);

    const changeColor = (c, e)=>{
        e.preventDefault();
        setColor(c);
    }
    
    const switchTab = (e)=>{
        e.preventDefault();
        if(tabIndex==0){
            setTabIndex(1);
        }else{
            setTabIndex(0);
        }
    };

    const productPrice = (product)=> {
        if(product.Discount){
            return product.price - product.Discount.discount/100 * product.price;
        }
        return product.price;
    };

    const setAddedToCart = ()=>{
        setCart(true);
    }

    const inCart = ()=>{
        for(const c of Object.keys(cart)){
            if(c === color.Color && cart[c]){
                return true;
            }
        }
        return false;
    };

    return (
        <Spinner loading={loading}>
            {product &&
            <div> 
                    <div className="row justify-content-center">
                        <div className="col-md-4 d-flex justify-content-center">
                            <ErrorBoundry>
                                <ImageView images={color.images} />
                            </ErrorBoundry>
                        </div>
                        <div id="rightSide" className="col-md-4 offset-lg-1">
                            <div id="stockInfo" className="d-flex justify-content-start">
                                <div>
                                    <p>{color.stockCount} IN STOCK</p>
                                    <p id="pid">PRODUCT ID: {product.id}</p>
                                </div>
                                <div id="saleBanner">
                                    {product.Discount.discount}%
                                </div>
                            </div>
                            <h1 id="productName">{product.name}</h1>
                            <h4 id="productPrice">
                                EGP{productPrice(product)} 
                                <small className="text-muted pl-1"><del>EGP{product.price}</del></small>
                            </h4>
                            <div id="productDescription">
                                <p>Description</p>
                                <p>{product.description}</p>
                            </div>
                            <div id="productColor">
                                <p>Color: </p>
                                {product.Colors.map(c=>(
                                    <a onClick={e=> changeColor(c, e)} key={c.id} className={`btn mr-1 ${c.Color == color.Color?'btn-secondary' : 'btn-outline-secondary'}`}>{c.Color}</a>
                                ))}
                            </div>
                            {color.stockCount > 0 && user.state.isAuthenticated && !inCart() &&
                                <AddToCart product={product} color={color} setAddedToCart={setAddedToCart} />
                            }
                            {inCart() && user.state.isAuthenticated &&
                                <div className="mt-2 addedToCart">
                                    <Link className="btn btn-outline-success text-success p-2 mt-1" to="/cart"><FaShoppingCart /> Added to Cart</Link>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="row justify-content-center">
                            <div className="col-10" id="productDetailReviewNav">
                                <p onClick={switchTab} className={tabIndex===0?'tabActive':''}>SPECIFICATIONS</p>
                                <p onClick={switchTab} className={tabIndex===1?'tabActive':''}>REVIEWS</p>
                            </div>
                            <div className="col-10">
                                {tabIndex === 0 &&
                                    <Specifications specs={product.specifications} />
                                }
                                {tabIndex === 1 &&
                                    <ErrorBoundry>
                                        <Suspense fallback={<Spinner loading={true}></Spinner>}>
                                            <Rate productId={product.id} rate={product.rate} />
                                        </Suspense>
                                    </ErrorBoundry>                               
                                }
                            </div>
                    </div>
                </div>
            }
        </Spinner>
    );
};

export default Product;