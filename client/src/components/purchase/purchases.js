import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

const Purchases = (props) => {
    const [purchases, setPurchases] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);


    useEffect(() => {
        const getPurchases = async () => {
            try{
                const {data} = await axios.get(`/api/purchase/${page}`);
                setPurchases(data.purchases);
                setCount(data.count);
            }catch(err){
                alert(err);
            }
        };
        getPurchases();
    }, [page]);

    const incPage = (e)=>{
        e.preventDefault();
        if(count > 15 * page)
            setPage(page + 1);
    }

    const decPage = (e)=>{
        e.preventDefault();
        if(page > 1)
            setPage(page - 1);
    }

    return(
        <div>
            <h1>Purchases history</h1>
            <hr />
            {purchases.map(purchase =>
                    (
                    <div key={purchase.id}>
                        <p><b>ordered on:</b> {moment(purchase.createdAt).format('DD-MM-YYYY HH:mm')}</p>
                        <p><b>payment type:</b> {purchase.paymentType}</p>
                        <p><b>total:</b> {purchase.total}</p>
                        <hr />
                    </div>
                )
            )
            }
            <div>
                <a href="#" onClick={decPage}>&lt;</a>
                page:{page}
                <a href="#" onClick={incPage}>&gt;</a>
            </div>
        </div>
    );
};

export default Purchases;
