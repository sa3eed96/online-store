import React,{useState} from 'react';
import FormInput from './formInput';
import axios from 'axios';

const searchBar = (props)=> {
    const [search, setSearch] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [autocomplete,setAutocomplete] = useState([]);

    const handleChange = (e)=>{
        try{
            setSearch(e.target.value);
            const {data} = await axios.get(`/api/autocomplete?q=${e.target.value}`);
            setAutocomplete(data.results);
            setShowResult(true);
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
        <div style={{display: inline}}>
            <form onSubmit={handleSubmit}>
                <FormInput
                    id="search"
                    type="search"
                    name="search"
                    value={search}
                    onChange={handleChange}
                    placeholder="search products"
                />
                <input type="submit" value="search"/>
            </form>
            {showResult && (
                <div></div>
            )}
        </div>
    );
};

export default searchBar;
