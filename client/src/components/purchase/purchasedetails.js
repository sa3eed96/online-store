import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import CancelOrder from './cancelorder';

const PurchaseDetails = (props)=> {
    const {id} = useParams();
    const [purchase, setPurchase] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const getPurchase = async()=>{
            const {data} = await axios.get(`/api/purchase/${id}`);
            setPurchase(data.purchase);
            setLoading(false);
        };
        getPurchase();
    },[]);

    return (
        <div className="row mt-2">
            {loading &&
                <div className="spinner-border text-primary mx-auto" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            }
            {!loading &&
                <div className="col-md-8 mx-auto bg-white">
                    <div className="row">
                        <h5 className="col ml-2">Purchase Info</h5>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 col-md-4">
                            <p className="col">Order #<b>{purchase.id}</b></p>
                        </div>
                        <div className="col-sm-12 col-md-4">
                            <p><b>Ordered On: </b>{moment(purchase.createdAt).format('DD-MM-YY HH:mm')}</p>
                        </div>
                        <div className=" col-sm-12 col-md-4">
                            {!purchase.Shipment.delivered &&
                                <CancelOrder {...props} id={purchase.id} />
                            }
                        </div>
                    </div>
                    <div className="row alert-info mx-1">
                        <div className="col-sm-12 col-md-4">
                            <p className="text-dark"><b>Payment type </b></p>
                            <p>{purchase.paymentType}</p>
                        </div>
                        <div className="col-sm-12 col-md-4">
                            <p className="text-dark"><b>Address</b></p>
                            {purchase.hasOwnProperty('Shipment') && 
                                <div>
                                    <p className="text-secondary">{purchase.Shipment.Address.country} | {purchase.Shipment.Address.city}</p>
                                    <p className="text-secondary">{purchase.Shipment.Address.address}</p>
                                    <p className="text-secondary">Delivered on: {moment(purchase.Shipment.delivery).format('DD-MM-YYYY')}</p>
                                </div>
                            }
                        </div>
                        <div className="col-sm-12 col-md-4">
                            <p className="text-dark"><b>Order total</b></p>
                            <p className="text-secondary">{purchase.total} EGP</p>
                        </div>
                    </div>
                    <hr />
                    <div className="border mb-2">
                        <div className="row mb-4">
                            <h5 className="col ml-2">Order Products</h5>
                        </div>
                        <hr />
                        {purchase.hasOwnProperty('PurchaseDetails') && 
                            <div>
                                {purchase.PurchaseDetails.map((p)=> (
                                    <div className="row ml-2">
                                        <h6 className="col-sm-12 col-md-12"><Link to={{pathname: `/product/${p.ProductId}`}}>{p.Product.name}</Link></h6>
                                        <p className="col-sm-12 col-md-6" className="col">quantity: {p.quantity}</p>
                                        <p className="col-sm-12 col-md-6" className="col">color: {p.color}</p>
                                        <p className="col-sm-12 col-md-6" className="col">total: {p.Product.price * p.quantity}<small> EGP</small></p>
                                </div>
                                ))}
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default PurchaseDetails;
