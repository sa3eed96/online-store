import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { FaSearch } from 'react-icons/fa'
import axios from 'axios';

const searchBar = (props)=> {
    const [search, setSearch] = useState('');
    const [autocomplete,setAutocomplete] = useState([]);

    const handleChange = async (e)=>{
        try{
            setAutocomplete([]);
            setSearch(e.target.value);
            const {data} =  await axios.get(`/api/autocomplete?q=${e.target.value}`);
            setAutocomplete(data.results);
        }catch(err){
            alert(err);
        }
    }

    const handleSubmit = (e)=> {
        try{
            e.preventDefault();
            props.history.push(`/?q=${search}`);
        }catch(err){
            alert(err);
        }
    };

    return (
        <div className="w-50 position-relative">
            <form className="form-inline" onSubmit={handleSubmit}>
                <label className="sr-only" htmlFor="search">search products</label>
                <input
                    id="search"
                    type="search"
                    name="search"
                    value={search}
                    onChange={handleChange}
                    placeholder="search products"
                    className="form-control mr-0 w-75"
                    autoComplete="off"
                    />
                <button className="btn btn btn-secondary ml-0 my-2 my-sm-0" type="submit"><FaSearch /></button> 
            </form>
            {search.length > 0 && (
                <ul className="list-group list-group-flush w-75" style={{position: 'absolute', zIndex: '1' }}>
                    {autocomplete.map((product, index)=> (
                        <div key={index}>
                            <Link className="list-group-item list-group-item-action text-primary" to={{pathname: '/', search: `?q=${product.name}` }} >{product.name}</Link>
                            <Link className="list-group-item list-group-item-action text-primary" to={{pathname: '/', search: `q=${product.name}&c=${product.SubcategoryName}` }}>{product.name} in {product.SubcategoryName}</Link>
                        </div>
                    ))}                    
                </ul>
            )}
        </div>
    );
};

export default searchBar;
