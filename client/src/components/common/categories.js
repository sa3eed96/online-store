import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Categories = (props)=>{
    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        const getCategories = async()=>{
            const {data} = await axios.get('/api/category');
            setCategories(data.categories);
        };
        getCategories();
    }, []);

    return (
        <div>
            {categories.map((cat=> (
                <div key={cat.id} style={{display: 'inline-block'}}>
                    <span style={{color: 'green'}}>{cat.name}</span>
                    <div style={{width: '150px', height:'100px' }}>
                        {cat.Subcategories.map(sub=> (
                            <div key={sub.id}>
                                <Link to={{pathname:'/', search: `c=${sub.name}` }}>{sub.name}</Link>
                            </div>
                        ))}
                    </div>
                </div>
            )))
            }
        </div>
    );
};

export default Categories;