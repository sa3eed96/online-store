import React, {useState, useEffect} from 'react';
import {Link, useRouteMatch} from 'react-router-dom';
import Address from './address';
import axios from 'axios';

const Addresses = (props)=> {
    const [addresses, setAddresses] = useState([]);
    const {url} = useRouteMatch();

    useEffect(()=>{
        const getAddresses = async()=>{
            try{
                const addresses = await axios.get('/api/address');
                setAddresses(addresses.data.addresses);
            }catch(err){
                alert(err);
            }
        };
        getAddresses();        
    }, []);

    const handleDeleteClick = async(id, index, e)=>{
        try{
            e.preventDefault();
            await axios.delete(`/api/address/${id}`);
            const tempAddresses = [...addresses];
            tempAddresses.splice(index, 1);
            setAddresses(tempAddresses);
        }catch(err){
            alert(err);
        }
        
    }

    return (
        <div style={{minHeight: window.screen.height /3 }} className="row mt-2">
            <div className="col-md-9 mx-auto bg-white pt-2">
                <div className="row">
                    <div className="col-12">
                        <h5 className="ml-2">Your Addresses</h5>
                    </div>
                    <div className="col-12">
                        <Link className="btn btn-sm btn-success m-2" to={{pathname:`${url}/add`}}>add address</Link>
                    </div>
                </div>
                <hr />
                {addresses.length === 0 && 
                    <div className="row">
                        <div className="alert-warning col mx-2">
                            <p>You Have no Addresses<br />
                                Add an address to deliver orders to
                            </p>
                        </div>
                    </div>
                }
                <div className="row border bg-light mx-4 mb-4">
                    {addresses.map((add, index)=>
                        <div className="col-10" key={add.id}>
                            <p>{add.city}, {add.country}</p>
                            <p>Address: {add.address}</p>
                            <p>Zip Code: {add.zipCode}</p>
                            <Link className="btn btn-primary mr-2" to={{pathname: `${url}/${add.id}`, state:add}}>Edit</Link>
                            <button className="btn btn-secondary mr-2" onClick={(e)=> handleDeleteClick(add.id, index, e)}>Delete</button>
                            <hr />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Addresses;