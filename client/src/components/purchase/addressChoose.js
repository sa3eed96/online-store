import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const AddressChoose = (props)=> {
    const [addresses, setAddresses] = useState([]);
    const [selected, setSelected] = useState('');

    useEffect(()=>{
        const getAddresses = async()=>{
            try{
                const {data} = await axios.get('/api/address');
                setAddresses(data.addresses);
                if(data.addresses.length > 0){
                    setSelected(data.addresses[0].id);
                }
            }catch(err){
                alert(err);
            }
        };
        getAddresses();
    },[]);

    const handleChange = (e)=> {
        setSelected(e.target.value);
    };

    const handleSubmit = (e)=> {
        e.preventDefault();
        if(selected === ''){
            alert('please choose an address');
        }
        else{
            props.setSelectedAddress(selected);
        }
    };

    return (
        <div>
            <h5>Choose Delivery Address</h5>
            <Link to={{pathname:"/settings/addresses/add"}}>add an address</Link>
            <hr />
            {addresses.length > 0 &&
                <form onSubmit={handleSubmit}>
                    {addresses.map(add=>(
                        <div key={add.id}>
                            <label>
                                <input  
                                    type="radio" 
                                    name="address" 
                                    value={add.id} 
                                    checked={selected == add.id} 
                                    onChange={handleChange}
                                    />
                                {add.country} | {add.address}
                            </label>
                            <br />
                        </div>
                    ))}
                    <button>next</button>
                </form>
            }
        </div>
    );

};

export default AddressChoose;