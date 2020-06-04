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
            <div className="row justify-content-center">
                <h5 className="col-md-2">Choose Delivery Address</h5>
                <div className="col-md-10">
                    <Link className="btn btn-sm btn-success" to={{pathname:"/settings/addresses/add"}}>add an address</Link>
                </div>
            </div>
            <hr />
            {addresses.length > 0 &&
                <div className="col-12">
                    <form onSubmit={handleSubmit}>
                        {addresses.map(add=>(
                            <div className="form-check my-4" key={add.id}>
                                    <input  
                                        type="radio" 
                                        name="address" 
                                        value={add.id} 
                                        checked={selected == add.id} 
                                        onChange={handleChange}
                                        className="form-check-input"
                                        />
                                <label className="form-check-label">
                                    {add.country} | {add.address}
                                </label>
                                <br />
                            </div>
                        ))}
                        <button className="btn btn-outline-primary">next</button>
                    </form>
                </div>
            }
        </div>
    );

};

export default AddressChoose;