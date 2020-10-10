import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FaSearch } from 'react-icons/fa'
import axios from 'axios';
import './searchbar.scss';

const searchBar = (props)=> {
    const [search, setSearch] = useState('');
    const [autocomplete,setAutocomplete] = useState([]);
    let history = useHistory();

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
            history.push(`/?q=${search}`);
            setSearch('');
        }catch(err){
            alert(err);
        }
    };

    const removeSearch = (e)=> {
        setSearch('');
    };

    const showInput = ()=>{
        document.querySelector('input').style.display = 'inline-block';
        document.querySelector('input').focus();
    };

    return (
        <div className="position-relative">
            <form className="form-inline " onSubmit={handleSubmit}>
                <label className="sr-only" htmlFor="search">search products</label>
                <input
                    id="search"
                    type="search"
                    name="search"
                    value={search}
                    onChange={handleChange}
                    placeholder="search products"
                    autoComplete="off"
                    />
                <span onClick={showInput} className="searchIcon"><FaSearch /></span>
            </form>
            {search.length > 0 && (
                <ul className="list-group list-group-flush w-75 searchList" >
                    {autocomplete.map((product, index)=> (
                        <div key={index}>
                            <Link onClick={removeSearch} className="list-group-item list-group-item-action text-primary" to={{pathname: '/', search: `?q=${product.name}` }} >{product.name}</Link>
                            <Link onClick={removeSearch} className="list-group-item list-group-item-action text-primary" to={{pathname: '/', search: `q=${product.name}&c=${product.SubcategoryName}` }}>{product.name} in {product.SubcategoryName}</Link>
                        </div>
                    ))}                    
                </ul>
            )}
        </div>
    );
};

export default searchBar;
