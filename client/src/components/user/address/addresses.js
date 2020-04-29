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
            <h1>Addresses</h1>
            <Link to={{pathname:`${url}/add`}}>add address</Link>
            <hr />
            {addresses.map((add, index)=>
                <div key={add.id}>
                    <h6>{add.city}, {add.address}</h6>
                    <Link to={{pathname: `${url}/${add.id}`, state:add}}>Edit</Link>
                    <button onClick={(e)=> handleDeleteClick(add.id, index, e)}>Delete</button>
                    <hr />
                </div>
            )}
        </div>
    );
};

export default Addresses;