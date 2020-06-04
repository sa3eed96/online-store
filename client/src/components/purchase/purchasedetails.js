import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const PurchaseDetails = (props)=> {
    const {id} = useParams();
    const [purchase, setPurchase] = useState({});

    useEffect(()=>{
        const getPurchase = async()=>{
            const {data} = await axios.get(`/api/purchase/${id}`);
            setPurchase(data.purchase); 
        };
        getPurchase();
    },[]);

    return (
        <div className="row">
            <h1 className="col-12">Purchase details</h1>
            <div className="col-12">
                <p><b>ordered on: </b>{moment(purchase.createdAt).format('DD-MM-YY HH:mm')}</p>
                <p><b>payment type: </b>{purchase.paymentType}</p>
                <p><b>total: </b>{purchase.total} EGP</p>
                <hr />
            </div>
            {purchase.hasOwnProperty('Shipment') && 
                <div className="col-12">
                    <h6>Shipment Address:</h6>
                    <p>{purchase.Shipment.Address.country} | {purchase.Shipment.Address.city}</p>
                    <p>{purchase.Shipment.Address.address}</p>
                    <hr />
                </div>
            }
            {purchase.hasOwnProperty('PurchaseDetails') && 
                <div className="col-12">
                    <h6>Order Products:</h6>
                    {purchase.PurchaseDetails.map(({Product})=> (
                        <div key={Product.id}>
                            <Link to={`/product/${Product.id}`}>{Product.name} | {Product.price} EGP</Link>
                            <br />
                        </div>  
                    ))}
                </div>
            }
        </div>
    );
};

export default PurchaseDetails;
