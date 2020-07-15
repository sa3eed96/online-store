import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../common/pagination';
import axios from 'axios';
import RateView from '../rate/rateview';

const Products = (props) => {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [category, setCategory] = useState('');

    useEffect(() => {
        const getProducts = async () => {
            try {
                const query = new URLSearchParams(props.location.search);
                const productName = query.get('q') ? `&q=${query.get('q')}`: '';
                const categoryName = query.get('c') ? `&c=${query.get('c')}`: '';
                setCategory(query.get('c') ? query.get('c'): 'All Products');
                const {data} = await axios.get(`/api/product?page=${page}${productName}${categoryName}`);
                setProducts(data.products);
                setCount(data.count);
            } catch (err) {
                alert(err);
            }
        };
        getProducts();
    }, [page, props.location.search]);

    const updatePage = (page)=> {
        setPage(page);
    };

    const redirectToProduct = (id, e)=>{
        e.preventDefault();
        props.history.push(`/product/${id}`);
    };

    const productPrice = (product)=> {
        if(product.discount > 0){
            return product.discountPrice;
        }
        return product.price;
    };

    return (
        <div>
            <div className="row">
                <div className="col-12">
                    <p><b>{category}</b><small> ({count} items found)</small></p>
                </div>
            </div>
            <div className="row bg-white mx-1">
                {products.map(product =>
                    (
                        <div className="col-sm-12 col-md-2 card ml-3 mr-3 mt-3 clickable" key={product.id}>
                            {product.discount> 0 &&
                                <div className="position-absolute bg-warning">
                                    <small className="p-1 text-white">{product.discount}%</small>
                                </div>
                            }
                            <img className="card-img-top w-50 h-50 mx-auto" onClick={e=> redirectToProduct(product.id, e)} src={'public/images/'+product.Colors[0].Images[0].image} alt="product image"></img>
                            <div className="card-body px-1 border-top row">
                                <h6 className="card-title pl-0 col-12">{product.name}</h6>
                                <div className="card-subtitle pl-0 text-primary col-6">
                                    <p className="mb-0">price: <b>{productPrice(product)} EGP</b></p>
                                    {product.discount> 0 && <p className="text-muted mt-0"><small><s>was: {product.price} EGP </s></small></p>}
                                </div>
                                <div className="pl-0 col-6">
                                    <RateView rate={product.Rate.rate} />
                                </div>
                            </div>
                            <div className="overlay" onClick={e=> redirectToProduct(product.id, e)}>
                                <div className="overlayText">View Details</div>
                            </div>
                        </div>
                    )
                )}
                {count > 0 &&
                    <Pagination page={page} count={count} updatePage={updatePage} perPage={12} />
                }
            </div>
        </div>

    );
};
export default Products;