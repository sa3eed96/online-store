import React, {useState, useEffect} from 'react';
import {Link, useRouteMatch} from 'react-router-dom';
import Spinner from '../../common/spinner';
import axios from 'axios';
import eventBus from '../../../utils/eventbus';
import './addresses.scss';

const Addresses = (props)=> {
    const [addresses, setAddresses] = useState([]);
    const {url} = useRouteMatch();
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const getAddresses = async()=>{
            try{
                const addresses = await axios.get('/api/address');
                setAddresses(addresses.data.addresses);
                setLoading(false);
            }catch(err){
                eventBus.dispatch("showNotification", {
                    body: 'failed to fetch Addresses',
                    background: 'bg-danger',
                    header: 'Error',
                });
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
            eventBus.dispatch("showNotification", {
                body: 'Address Deleted',
                background: 'bg-success',
                header: 'Success',
            });
        }catch(err){
            eventBus.dispatch("showNotification", {
                body: 'failed to delete Address',
                background: 'bg-danger',
                header: 'Error',
            });
        }
        
    }

    return (
        <div>
            <Spinner loading={loading}>
                <div className="row mt-2 thirdWindowHeight">
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
                        {addresses.length > 0 &&
                            <div className="row border bg-light mx-4 mb-4">
                                {addresses.map((add, index)=>
                                    <div className="col-10 addressInfo" key={add.id}>
                                        <p><i>{add.city}, {add.country}</i></p>
                                        <p><b>Address:</b> <i>{add.address}</i></p>
                                        <p><b>Zip Code:</b> <i>{add.zipCode}</i></p>
                                        <Link className="btn btn-dark mr-2" to={{pathname: `${url}/${add.id}`, state:add}}>Edit</Link>
                                        <button className="btn btn-dark mr-2" onClick={(e)=> handleDeleteClick(add.id, index, e)}>Delete</button>
                                        <hr />
                                    </div>
                                )}
                            </div>
                        }
                    </div>
                </div>
            </Spinner>
        </div>
    );
};

export default Addresses;