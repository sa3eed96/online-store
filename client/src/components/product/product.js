import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import Rate from '../rate/rate';
import axios from 'axios';
import {UserContext, UserContextProvider} from '../../contexts/user';
import RateView from '../rate/rateview';
import ImageView from './imageView';

const Product = (props)=>{
    let { id } = useParams();
    const [product, setProduct] = useState(null);
    const [cart, setCart] = useState(null);
    const [color, setColor] = useState(null);
    const [description, setDescription] = useState(null);
    const [tabIndex, setTabIndex] = useState(0);
    let descriptionPart;
    useEffect(()=>{
        const getProduct = async()=>{
            try{
                const product = await axios.get(`/api/product/${id}`);
                setCart(product.data.cart);
                setColor(product.data.product.Colors[0]);
                setProduct(product.data.product);
                setDescription(product.data.product.description.length > 150 ? <span>{product.data.product.description.substring(0, 149)}...<a href="#">read more</a> </span>:
                <span>{product.data.product.description}</span>);
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
        if(product.discount > 0){
            return product.discountPrice;
        }
        return product.price;
    };

    return (
        <div className="row mt-4">
            {product &&
                <div className="col-10 mx-auto bg-white">
                    <div className="row">
                        <div className="col-sm-12 col-md-4">
                            <h3>{product.name}</h3>
                            <RateView rate={product.Rate.rate} />
                            <ImageView images={color} />
                        </div>
                        <div className="col-sm-12 col-md-4">
                            <h3 className="card-subtitle mb-2 text-primary"><b>{productPrice(product)} <small>EGP</small></b></h3> 
                            {product.discount> 0 && <h6><small className="text-secondary"><s>{product.price} EGP </s></small> - {product.discount}% off</h6>}
                            <p><small><b>FREE Shipping</b></small></p>
                            <hr />
                            <p><b>Color:</b><br />
                            {product.Colors.map(c=>(
                                <a href="#" onClick={e=> changeColor(c, e)} key={c.id} className={`btn mr-1 ${c.Color == color.Color?'btn-secondary' : 'btn-outline-secondary'}`}>{c.Color}</a>
                            ))}
                            <br />
                            <small>{product.stockCount} in stock</small>
                            </p>
                            <hr />
                            <p className="pt-0"><b>Description:</b> <br />
                            {description}</p>
                        </div>
                        <div className="col-sm-12 col-md-4 mt-1">
                            <UserContext.Consumer>
                                {user=>(
                                <div>
                                    {user.state.isAuthenticated &&
                                        <Link className="btn btn-primary form-control" to={{pathname:cart? '/cart':'/addtocart', state: cart? null : {product: {...product}, color}}}>{cart? 'added to cart':'add to cart'}</Link>
                                    }
                                </div>
                                )}
                            </UserContext.Consumer>
                        </div>
                        <div style={{minHeight: (window.screen.height/2)}} className="col-12 mt-4">
                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <a onClick={switchTab} className={`nav-link ${tabIndex == 0 ? 'active': ''}`} href="#">Specifications</a>
                                </li>
                                <li className="nav-item">
                                    <a onClick={switchTab} className={`nav-link ${tabIndex == 1 ? 'active': ''}`} href="#">Description</a>
                                </li>
                            </ul>
                            {tabIndex == 0 && Object.keys(product.Specification).map((spec, index)=> (
                            <div key={index}>
                                {product.Specification[spec] &&
                                    <p><b>{spec}</b>: {product.Specification[spec]}</p>
                                }
                            </div>
                            ))}
                            {tabIndex == 1 && <p>
                                {product.description}
                            </p>}
                        </div>
                        <div className=" border-top col-12">
                            <UserContext.Consumer>
                                {user=>(product.id && 
                                    <div>
                                        <Rate productId={product.id} rate={product.Rate} user={user} />
                                    </div>
                                )}
                            </UserContext.Consumer>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default Product;