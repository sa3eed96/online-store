import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';

const Categories = (props)=>{
    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        const getCategories = async()=>{
            const {data} = await axios.get('/api/category');
            setCategories(data.categories);
        };
        getCategories();
    }, []);

    const collapseBar = (e)=>{
        $('#navbarSupportedCategories').collapse('hide');
    };

    return (
            <ul className="navbar-nav mr-auto">            {categories.map((cat=> (
                <li key={cat.name} className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {cat.name}
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        {cat.Subcategories.map(sub=> (
                                <Link onClick={collapseBar} key={sub.name} className="dropdown-item" to={{pathname:'/', search: `c=${sub.name}` }}>{sub.name}</Link>
                        ))}
                    </div>
                </li>
            )))
            }
            </ul>
    );
};

export default Categories;