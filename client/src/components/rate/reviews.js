import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import Pagination from '../common/pagination/pagination';
import RateView from './rateview';
import {UserContext} from '../../contexts/user';

const Reviews = (props)=> {
    const user = useContext(UserContext);    
    const [rates, setRates] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        const getRates = async()=>{
            try {
                setError('');
                const {data} = await axios.get(`/api/product/${props.productId}/userrate?page=${page}`);
                setRates(data.rates);
                setCount(data.count);
            } catch (err) {
                setError('error fetching reviews');
            }
        }
        getRates();
    }, [page]);

    const updatePage = (page)=> {
        setPage(page);
    };

    const getRate = (rate)=>{
        const rateArr = [0,0,0,0,0];
        rateArr[rate]+=1;
        return <RateView rate={rateArr} />
    }

    return(
        <div>
            {error &&
                <p className="text-danger"><small>{error}</small></p>
            }
            <h6>{rates.length} total reviews</h6>
            {rates.map(r=>(
                <div className="border border-dark rounded-right col-8 p-2 mb-2" key={r.id}>
                    {r.comment && (!user.state.user || r.PurchaseDetails[0].Purchase.User.id !== user.state.user.id) &&
                        <div>
                            <i>{r.PurchaseDetails[0].Purchase.User.fullName}</i> | <b>{getRate(r.rate)}</b>
                            <br />
                            <p>{r.comment}</p>
                        </div>
                    }
                </div>
            ))}
            <br />
            {count > 0 &&
                <Pagination page={page} count={count} updatePage={updatePage} perPage={5} />
            }
        </div>
    );
}

export default Reviews;