import React, {useState} from 'react';
import {Link} from 'react-router-dom';
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
        <div>
            <form className="form-inline" onSubmit={handleSubmit}>
                <input
                    id="search"
                    type="search"
                    name="search"
                    value={search}
                    onChange={handleChange}
                    placeholder="search products"
                    className="form-control mr-sm-2"
                />
                <button  className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> 
            </form>
            {search.length > 0 && (
                <div style={{position: 'absolute', width:'300px', height: '250px', backgroundColor:'white', border:'1px solid black', zIndex: '1' }}>
                    {autocomplete.map((product, index)=> (
                        <div key={index}>
                            <Link to={{pathname: '/', search: `?q=${product.name}` }} >{product.name}</Link>
                            <br />
                            <Link to={{pathname: '/', search: `q=${product.name}&c=${product.SubcategoryName}` }}>{product.name} in {product.SubcategoryName}</Link>
                            <br />
                        </div>
                    ))}                    
                </div>
            )}
        </div>
    );
};

export default searchBar;
