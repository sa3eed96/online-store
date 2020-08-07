import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FaSearch } from 'react-icons/fa'
import axios from 'axios';

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

    return (
        <div className="w-50 position-relative">
            <form className="form-inline " onSubmit={handleSubmit}>
                <div class="input-group w-100">
                    <label className="sr-only" htmlFor="search">search products</label>
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1"><FaSearch /></span>
                    </div>
                    <input
                        id="search"
                        type="search"
                        name="search"
                        value={search}
                        onChange={handleChange}
                        placeholder="search products"
                        className="form-control mr-0"
                        autoComplete="off"
                        />
                </div>
            </form>
            {search.length > 0 && (
                <ul className="list-group list-group-flush w-75" style={{position: 'absolute', zIndex: '1' }}>
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
