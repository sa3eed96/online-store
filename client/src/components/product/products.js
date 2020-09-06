import React, { useState, useEffect } from 'react';
import Pagination from '../common/pagination';
import axios from 'axios';
import RateView from '../rate/rateview';
import {IKImage} from  "imagekitio-react";
import Spinner from '../common/spinner';

const Products = (props) => {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState([]);
    const [sortDisplay, setSortDisplay] = useState(['No Sort']);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProducts = async () => {
            try {
                setLoading(true);
                const query = new URLSearchParams(props.location.search);
                const productName = query.get('q') ? `&q=${query.get('q')}`: '';
                const categoryName = query.get('c') ? `&c=${query.get('c')}`: '';
                let sortQuery = ``;
                if(sort.length === 2){
                    sortQuery = `&sort=${sort[0]}&by=${sort[1]}`   
                }
                setCategory(query.get('c') ? query.get('c'): 'All Products');
                const {data} = await axios.get(`/api/product?page=${page}${productName}${categoryName}${sortQuery}`);
                setProducts(data.products);
                setCount(data.count);
                setLoading(false);
            } catch (err) {
                props.showNotification('could not fetch products, try again later','bg-danger','Error');
            }
        };
        getProducts();
    }, [page, props.location.search, sort]);

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


    const changeSort = (s, d, e)=>{
        e.preventDefault();
        if(s.length === 0){
            setSort([]);
        }else{
            const [field, type] = s.split(' ');
            setSort([field, type]);
        }
        setSortDisplay(d);
    }

    return (
        <div>
            <div className="row">
                <div className="col-12">
                    <p><b>{category}</b><small> ({count} items found)</small></p>
                </div>
            </div>
                <Spinner loading={loading}> 
                    <div className="row bg-white col-11 mx-auto">
                        {products.length > 0 && 
                            <div className="col-12">
                                <div className="dropdown">
                                    <a className=" col-1 dropdown-toggle" type="button" id="dropdownSortButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <small>Sort By: <span className="text-primary">{sortDisplay}</span></small>
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="dropdownSortButton">
                                        <a onClick={e => changeSort('', 'No Sort', e)} className="dropdown-item" href="#">No Sort</a>
                                        <a onClick={e => changeSort('name ASC', 'Name', e)} className="dropdown-item" href="#">Name</a>
                                        <a onClick={e => changeSort('price ASC', 'Price: Low to High', e)} className="dropdown-item" href="#">price: Low to High</a>
                                        <a onClick={e => changeSort('price DESC', 'Price: High to Low', e)} className="dropdown-item" href="#">price: High to Low</a>
                                    </div>
                                </div>
                            </div>
                        }
                        {products.map(product =>
                            (
                                <div className= "col-md-2 card ml-3 mr-3 mt-3 clickable" key={product.id}>
                                    {product.discount> 0 &&
                                        <div className="position-absolute bg-warning">
                                            <small className="p-1 text-white">{product.discount}%</small>
                                        </div>
                                    }
                                    <IKImage 
                                        publicKey="public_iTgWxt6Swv2sA/BUpcR3EA43QkI="
                                        urlEndpoint="https://ik.imagekit.io/rvfdomceug"
                                        alt="product image"
                                        src={product.Colors[0].images[0] }
                                        className="card-img-top"
                                        transformation={[{
                                        "width": "175",
                                        "height":"200",
                                        "crop":"force"
                                    }]}
                                    />
                                    <div className="card-body px-1 border-top row">
                                        <h6 className="card-title pl-0 col-12">{product.name.length > 25 ? product.name.substring(0,23)+"..." :product.name}</h6>
                                        <div className="card-subtitle pl-0 text-primary col-12">
                                            <p className="mb-0"><b>{productPrice(product)} EGP</b>
                                            {product.discount> 0 && <small className="text-muted ml-1"><s>was: {product.price} EGP </s></small>}
                                            </p>
                                        </div>
                                        <div className="pl-0 col-12">
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
            </Spinner>
        </div>
    );
};
export default Products;