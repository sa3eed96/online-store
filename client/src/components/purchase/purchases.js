import React, { useState, useEffect } from 'react';
import  {Link, useRouteMatch} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Pagination from '../common/pagination';

const Purchases = (props) => {
    const [purchases, setPurchases] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const {url} = useRouteMatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPurchases = async () => {
            try{
                const {data} = await axios.get(`/api/purchase?page=${page}`);
                setPurchases(data.purchases);
                setCount(data.count);
                setLoading(false)
            }catch(err){
                alert(err);
            }
        };
        getPurchases();
    }, [page]);

    const updatePage = (page)=> {
        setLoading(true);
        setPage(page);
    };

    const isDelivered = (flag)=> {
        if(!flag){
            return <span className="text-warning">Not Delivered</span>
        }
        return <span className="text-success">Delivered</span>;
    };

    const isPaid = (flag)=> {
        if(!flag){
            return <span className="text-danger">Not Paid</span>
        }
        return <span className="text-success">Paid</span>;
    };

    return(
        <div style={{minHeight: window.screen.height/3}} className="row mt-4">
            {loading &&
                <div className="spinner-border text-primary mx-auto" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            }
            {!loading &&
                <div className="col-8 mx-auto bg-white">
                    <div className="row">
                        <h5 className="col">My Purchases</h5>
                    </div>
                    <hr />
                    <div className="row">
                        {purchases.length === 0 &&
                            <div className="alert-warning col mx-2">
                                <p>You Have No Purchases<br />
                                    Order items to view them here 
                                </p>
                            </div>
                        }
                        {purchases.length > 0 &&
                            <div className="col list-group list-group-flush">
                                {purchases.map(purchase =>
                                        (
                                            <Link to={`${url}/${purchase.id}`} className="list-group-item list-group-item-action" key={purchase.id}>
                                                <div className="row">
                                                    <div className="col">
                                                        <p>status: {isPaid(purchase.isPaid)} {isDelivered(purchase.Shipment.delivered)}</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col">
                                                        <p><b>ordered on:</b> {moment(purchase.createdAt).format('DD-MM-YYYY HH:mm')}</p>
                                                    </div>
                                                    <div className="col">
                                                        <p><b>delivered on:</b> {moment(purchase.Shipment.delivery).format('DD-MM-YYYY')}</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col">
                                                        <p><b>payment type:</b> {purchase.paymentType}</p>
                                                    </div>
                                                    <div className="col">
                                                        <p><b>total:</b> {purchase.total}<small> EGP</small></p>
                                                    </div>
                                                </div>
                                            </Link>
                                    )
                                )
                                }
                                <hr />
                            </div>
                        }
                    </div>
                    {count > 0 &&
                        <Pagination page={page} count={count} updatePage={updatePage} perPage={12} />
                    }
                </div>
            }
        </div>
    );
};

export default Purchases;
