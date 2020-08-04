import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Spinner from '../common/spinner';

const AddressChoose = (props)=> {
    const [addresses, setAddresses] = useState([]);
    const [selected, setSelected] = useState('');
    const [error, setError] = useState(''); 
    const [loading, setLoading] = useState(true);


    useEffect(()=>{
        const getAddresses = async()=>{
            try{
                const {data} = await axios.get('/api/address');
                setAddresses(data.addresses);
                if(data.addresses.length > 0){
                    setSelected(data.addresses[0].id);
                }
                setLoading(false);
            }catch(err){
                setLoading(false);
                setError('could not fetch your addresses');
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
            setError('please choose an address');
        }
        else{
            setError('');
            props.setSelectedAddress(selected);
        }
    };

    return (
        <div>
            <Spinner loading={loading}>
                <div>
                    <div className="row mt-1">
                        <h5 className="col-auto">Choose Delivery Address</h5>
                        <div className="col-auto">
                            <Link className="btn btn-sm btn-success" to={{pathname:"/settings/addresses/add"}}>add an address</Link>
                        </div>
                    </div>
                    <hr />
                    <div className="row mb-1">
                        {addresses.length === 0 &&
                            <div className="alert-warning col mx-2">
                                <p>You Have no Addresses<br />
                                    Add an address to deliver orders to
                                </p>
                            </div>
                        }
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
                                    <p className="text-danger"><small>{error}</small></p>
                                    <button className="btn btn-primary">next</button>
                                </form>
                            </div>
                        }
                    </div>
                </div>
            </Spinner>
        </div>
        );
    };

export default AddressChoose;