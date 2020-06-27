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

    useEffect(() => {
        const getPurchases = async () => {
            try{
                const {data} = await axios.get(`/api/purchase?page=${page}`);
                setPurchases(data.purchases);
                setCount(data.count);
            }catch(err){
                alert(err);
            }
        };
        getPurchases();
    }, [page]);

    const updatePage = (page)=> {
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
        <div className="row">
            <h1 className="col-12">Purchases History</h1>
            <hr />
            <div className="col-12 list-group list-group-flush">
                {purchases.map(purchase =>
                        (
                        <Link to={`${url}/${purchase.id}`} className="list-group-item list-group-item-action" key={purchase.id}>
                            <p>status: {isPaid(purchase.isPaid)} {isDelivered(purchase.Shipment.delivered)}</p>
                            <p><b>ordered on:</b> {moment(purchase.createdAt).format('DD-MM-YYYY HH:mm')}</p>
                            <p><b>payment type:</b> {purchase.paymentType}</p>
                            <p><b>total:</b> {purchase.total}</p>
                        </Link>
                    )
                )
                }
            </div>
            {count > 0 &&
                <Pagination page={page} count={count} updatePage={updatePage} perPage={12} />
            }
        </div>
    );
};

export default Purchases;
