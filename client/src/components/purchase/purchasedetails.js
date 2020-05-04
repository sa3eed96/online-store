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
        <div>
            {console.log(purchase)}
            <h1>Purchase details</h1>
            <p><b>ordered on:</b>{moment(purchase.createdAt).format('DD-MM-YY HH:mm')}</p>
            <p><b>payment type:</b>{purchase.paymentType}</p>
            <p><b>total:</b>{purchase.total}</p>
            <hr />
            {purchase.hasOwnProperty('Shipment') && 
            <div>
                <h6>Shipment Address:</h6>
                <p>{purchase.Shipment.Address.country} | {purchase.Shipment.Address.city}</p>
                <p>{purchase.Shipment.Address.address}</p>
                <hr />
            </div>
            }
            {purchase.hasOwnProperty('PurchaseDetails') && 
            <div>
                <h6>Order Products:</h6>
                {purchase.PurchaseDetails.map(({Product})=> (
                    <div key={Product.id}>
                        <Link to={`/product/${Product.id}`}>{Product.name} | {Product.price}</Link>
                        <br />
                    </div>  
                ))}
            </div>
            }
        </div>
    );
};

export default PurchaseDetails;
