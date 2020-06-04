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
        <div>
            <div className="row justify-content-center">
                <div className="col-md-2">
                    <h3>Your Addresses</h3>
                </div>
                <div className="col-md-10">
                    <Link className="btn btn-sm btn-success m-2" to={{pathname:`${url}/add`}}>add address</Link>
                </div>
            </div>
            <hr />
            <div className="row">
                {addresses.map((add, index)=>
                    <div className="col-12" key={add.id}>
                        <h6>{add.city}, {add.address}</h6>
                        <Link className="btn btn-outline-primary mr-2" to={{pathname: `${url}/${add.id}`, state:add}}>Edit</Link>
                        <button className="btn btn-outline-danger mr-2" onClick={(e)=> handleDeleteClick(add.id, index, e)}>Delete</button>
                        <hr />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Addresses;