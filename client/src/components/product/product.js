import React, {useState, useEffect, lazy, Suspense, useContext} from 'react';
import { useParams, Link } from 'react-router-dom';
const Rate = lazy(()=> import('../rate/rate'));
import axios from 'axios';
import {UserContext} from '../../contexts/user';
import RateView from '../rate/rateview';
import ImageView from './imageView';
import ErrorBoundry from '../errorboundry';
import Spinner from '../common/spinner';
import Specifications from './specifications';

const Product = (props)=>{
    let { id } = useParams();
    const [product, setProduct] = useState(null);
    const [cart, setCart] = useState(null);
    const [color, setColor] = useState(null);
    const [description, setDescription] = useState(null);
    const [tabIndex, setTabIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const user = useContext(UserContext);

    let descriptionPart;
    useEffect(()=>{
        const getProduct = async()=>{
            try{
                const product = await axios.get(`/api/product/${id}`);
                setCart(product.data.cart);
                setColor(product.data.product.Colors[0]);
                setProduct(product.data.product);
                setDescription(product.data.product.description.length > 150 ? <span>{product.data.product.description.substring(0, 149)}...<a onClick={setTabToDesc} href="#description">read more</a> </span>:
                <span>{product.data.product.description}</span>);
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

    const setTabToDesc = ()=>{
        setTabIndex(1);
    };

    const productPrice = (product)=> {
        if(product.Discount){
            return product.price - product.Discount.discount/100 * product.price;
        }
        return product.price;
    };

    return (
        <div>
            <Spinner loading={loading}>
                <div className="row mt-4">
                    <div className="col-10 mx-auto bg-white">
                        {product&&
                            <div className="row">
                                <div className="col-sm-12 col-md-4">
                                    <h3>{product.name}</h3>
                                    <ErrorBoundry>
                                        <RateView rate={product.rate} />
                                    </ErrorBoundry>
                                    <ErrorBoundry>
                                        <ImageView images={color.images} />
                                    </ErrorBoundry>
                                </div>
                                <div className="col-sm-12 col-md-4">
                                    <h3 className="card-subtitle mb-2 text-primary"><b>{productPrice(product)} <small>EGP</small></b></h3> 
                                    {product.Discount && <h6><small className="text-secondary"><s>{product.price} EGP </s></small> - {product.Discount.discount}% off</h6>}
                                    <p><small><b>FREE Shipping</b></small></p>
                                    <hr />
                                    <p><b>Color:</b><br />
                                    {product.Colors.map(c=>(
                                        <a href="#" onClick={e=> changeColor(c, e)} key={c.id} className={`btn mr-1 ${c.Color == color.Color?'btn-secondary' : 'btn-outline-secondary'}`}>{c.Color}</a>
                                    ))}
                                    <br />
                                    <small className={color.stockCount === 0 ? 'text-danger': ''}>{color.stockCount} in stock</small>
                                    </p>
                                    <hr />
                                    <p className="pt-0"><b>Description:</b> <br />
                                    {description}</p>
                                </div>
                                <div className="col-sm-12 col-md-4 mt-1">
                                    <div>
                                        {user.state.isAuthenticated &&
                                            <Link className={`btn btn-primary form-control ${color.stockCount === 0 ? 'disabled': ''}`} 
                                                to={{pathname: '/addtocart', state: {product: {...product}, color}}}>add to cart
                                            </Link>
                                        }
                                    </div>
                                </div>
                                <div id="description" className="col-12 mt-4 halfWindowHeight">
                                    <ul className="nav nav-tabs">
                                        <li className="nav-item">
                                            <a onClick={switchTab} className={`nav-link ${tabIndex == 0 ? 'active': ''}`} href="#">Specifications</a>
                                        </li>
                                        <li className="nav-item">
                                            <a onClick={switchTab} className={`nav-link ${tabIndex == 1 ? 'active': ''}`} href="#">Description</a>
                                        </li>
                                    </ul>
                                    {tabIndex == 0 && <Specifications specs={product.specifications} />}
                                    {tabIndex == 1 && <p>
                                        {product.description}
                                    </p>}
                                </div>
                                <div className=" border-top col-12">
                                    {product.id && 
                                        <div>
                                            <ErrorBoundry>
                                                <Suspense fallback={<Spinner loading={true}></Spinner>}>
                                                    <Rate productId={product.id} rate={product.rate} />
                                                </Suspense>
                                            </ErrorBoundry>
                                        </div>
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </Spinner>
        </div>
    );
};

export default Product;