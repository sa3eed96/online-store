import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Products = (props) => {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const products = await axios.get(`/api/product/all/${page}`);
                setProducts(products.data.products);
                setCount(products.data.count);
            } catch (err) {
                alert(err);
            }
        }
        getProducts();
    }, [page]);

    const incPage = (e)=>{
        e.preventDefault();
        if(count > 15 * page)
            setPage(page + 1);
    }

    const decPage = (e)=>{
        e.preventDefault();
        if(page > 1)
            setPage(page - 1);
    }

    return (
        <div>
            <h1>Products</h1>
            {products.map(product =>
                (
                    <div key={product.id}>
                        <Link to={{pathname: `/product/${product.id}`}}><h4>{product.name}</h4></Link>
                        <h6>price:{product.price}</h6>
                        <p>{product.description}</p>
                        <hr />
                    </div>
                )
            )
            }
            <a href="#" onClick={decPage}>&lt;</a>
            page:{page}
            <a href="#" onClick={incPage}>&gt;</a>
        </div>

    );
};

export default Products;