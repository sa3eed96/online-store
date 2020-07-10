import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../common/pagination';
import axios from 'axios';
import RateView from '../rate/rateview';

const Products = (props) => {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const query = new URLSearchParams(props.location.search);
                const productName = query.get('q') ? `&q=${query.get('q')}`: '';
                const categoryName = query.get('c') ? `&c=${query.get('c')}`: '';
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
        <div className="row">
            <div className="col-12">
                <h6><i>{count} product available</i></h6>
            </div>
            {products.map(product =>
                (
                    <div className="col-sm-12 col-md-3 card ml-3 mt-3 clickable" key={product.id}>
                        <img className="card-img-top" onClick={e=> redirectToProduct(product.id, e)} width="35px" height="275px" src={'public/images/'+product.Colors[0].Images[0].image} alt="product image"></img>
                        <div className="card-body border-top">
                            <h5 className="card-title">{product.name}</h5>
                                {product.discount> 0 && <h6 className="text-danger"><s>was: {product.price} EGP </s>{product.discount}% off</h6>}
                                <h6 className="card-subtitle mb-2 text-primary">price: <b>{productPrice(product)} EGP</b></h6>
                                <RateView rate={product.Rate.rate} />
                        </div>
                        <div className="overlay" onClick={e=> redirectToProduct(product.id, e)}>
                            <div className="overlayText">View Details</div>
                        </div>
                    </div>
                )
            )
            }
            {count > 0 &&
                <Pagination page={page} count={count} updatePage={updatePage} perPage={12} />
            }
        </div>

    );
};
export default Products;