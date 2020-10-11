import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../../common/spinner';
import Pagination from '../../common/pagination/pagination';
import eventBus from '../../../utils/eventbus';
import './products.scss';
import ProductThumbnail from './productthumbnail/ProductThumbnail';

const Products = ({props}) => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState([]);
    const [sortDisplay, setSortDisplay] = useState(['No Sort']);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('wjat');
        console.log(props);
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
                eventBus.dispatch("showNotification", {
                    body: "could not fetch products, try again later",
                    background: 'bg-danger',
                    header: 'Error',
                });
            }
        };
       getProducts();
    }, [page, props.location.search, sort]);

    const updatePage = (page)=> {
        setPage(page);
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

    return(
        <Spinner loading={loading}>
            <div className="row productsHeader">
                <div className="col">
                    <p><b>{category}</b><small> ({count} items)</small></p>
                </div>
                <div className="col sort">
                    <div className="dropdown">
                        <a className=" col-1 dropdown-toggle" type="button" id="dropdownSortButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <small><b>Sort By:</b> <span className="text-primary">{sortDisplay}</span></small>
                        </a>
                        <div className="dropdown-menu" aria-labelledby="dropdownSortButton">
                            <a onClick={e => changeSort('', 'No Sort', e)} className="dropdown-item" href="#">No Sort</a>
                            <a onClick={e => changeSort('name ASC', 'Name', e)} className="dropdown-item" href="#">Name</a>
                            <a onClick={e => changeSort('price ASC', 'Price: Low to High', e)} className="dropdown-item" href="#">price: Low to High</a>
                            <a onClick={e => changeSort('price DESC', 'Price: High to Low', e)} className="dropdown-item" href="#">price: High to Low</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-around">
                {products.map(product =>
                    <ProductThumbnail props={props} product={product} />
                )}
            </div>
            {count > 0 &&
                <Pagination page={page} count={count} updatePage={updatePage} perPage={12} />
            }
        </Spinner>
    );

};
export default Products;