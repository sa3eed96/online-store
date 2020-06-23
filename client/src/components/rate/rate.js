import React, {useState, useEffect} from 'react';
import Pagination from '../common/pagination';
import axios from 'axios';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

const Rate = (props)=> {
    const [rate, setRate] = useState(props.rate.rate);
    const [rates, setRates] = useState([]);
    const [myRate, setMyRate] = useState({
        comment: '',
        checkedRate: '4',
    });
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [rateView, setRateView] = useState([<FaRegStar />, <FaRegStar />, <FaRegStar />, <FaRegStar />, <FaRegStar />]);
    const [error, setError] = useState(null);


    useEffect(()=>{
        const getMyRate = async()=>{
            if(props.user.state.isAuthenticated){
                const {data} = await axios.get(`/api/product/${props.productId}/purchasedetail/myrate`);
                if(data.hasOwnProperty('myRate')){
                    setMyRate({
                        ...data.myRate,
                        checkedRate: data.myRate.rate.toString(),
                    });
                    const temp = [...rateView];
                    for (let index = 0; index < 5; index++) {
                        if(index < data.myRate.rate){
                            temp[index] = <FaStar />;
                        }else{
                            temp[index] = <FaRegStar />
                        }
                    }
                    setRateView(temp);
                }
            }
        };
        getMyRate();
    }, []);

    useEffect(() => {
        const getRates = async()=>{
            try {
                const {data} = await axios.get(`/api/product/${props.productId}/purchasedetail?page=${page}`);
                setRates(data.rates);
                setCount(data.count);
            } catch (err) {
                alert(err);
            }
        }
        getRates();
    }, [page]);

    const handleSubmit = async(e)=> {
        try{
            e.preventDefault();
            const {data} = await axios.put(`/api/product/${props.productId}/rate/${props.rate.id}`,{rateArray: rate, rate: myRate.checkedRate, comment: myRate.comment});
            setError(null);
            setRate(data.rate.rate);
            setMyRate({
                ...data.details,
                checkedRate: data.details.rate,    
            });
        }catch(err){
            setError(err.response.data);
        }
    };

    const handleChange = (e) => {
        setMyRate({
            ...myRate,
            [e.target.name]: e.target.value,
        })
    };

    const incPage = (e) => {
        e.preventDefault();
        if (count > 5 * page)
            setPage(page + 1);
    }

    const decPage = (e) => {
        e.preventDefault();
        if (page > 1)
            setPage(page - 1);
    }

    const changeRate = (val, e)=>{
        e.preventDefault();
        setMyRate({
            ...myRate,
            checkedRate: val-1,
        });
        const temp = [...rateView];
        for (let index = 0; index < 5; index++) {
            if(index < val){
                temp[index] = <FaStar />
            }else{
                temp[index] = <FaRegStar />
            }
        }
        setRateView(temp);
    };

    const updatePage = (page)=> {
        setPage(page);
    };

    return (
        <div>
            {props.user.state.isAuthenticated &&
                <div>
                    <h3>Rate Product:</h3>
                    <form onSubmit={handleSubmit}>
                        <label className="text-warning clickable" onClick={e => changeRate(1, e)} htmlFor="r1">{rateView[0]}</label>
                        <input className="d-none" type="radio" name="checkedRate" value="0" label="1" id="r1" checked={myRate.checkedRate === '0'} onChange={handleChange}/>
                        <label className="text-warning clickable" onClick={e => changeRate(2,e)} htmlFor="r2">{rateView[1]}</label>
                        <input className="d-none" type="radio" name="checkedRate" value="1" label="2" id="r2" checked={myRate.checkedRate === '1'} onChange={handleChange}/>
                        <label className="text-warning clickable" onClick={e => changeRate(3,e)} htmlFor="r3">{rateView[2]}</label>
                        <input className="d-none" type="radio" name="checkedRate" value="2" label="3" id="r3" checked={myRate.checkedRate === '2'} onChange={handleChange}/>
                        <label className="text-warning clickable" onClick={e => changeRate(4,e)} htmlFor="r4">{rateView[3]}</label>
                        <input className="d-none" type="radio" name="checkedRate" value="3" label="4" id="r4" checked={myRate.checkedRate === '3'} onChange={handleChange}/>
                        <label className="text-warning clickable" onClick={e => changeRate(5,e)} htmlFor="r5">{rateView[4]}</label>
                        <input className="d-none" type="radio" name="checkedRate" value="4" label="5" id="r5" checked={myRate.checkedRate === '4'} onChange={handleChange}/>
                        <textarea className="form-control w-50" name="comment" placeholder="optional rate review" value={myRate.comment} onChange={handleChange}></textarea>
                        <button className="btn btn-outline-success mt-1">{myRate.id ? 'update rate' : 'rate'}</button>
                    </form>
                </div>
            }
            {error &&
                <p className="text-danger"><small>{error}</small></p>
            }
            {rates.length == 0 &&
                <h6>0 reviews</h6>
            }
            {rates.length > 0 &&
                <h6>{rates.length} reviews</h6>
            }
            {rates.map(rate=>(
                <div key={rate.id}>
                    {rate.comment && rate.Purchase.User.id !== props.user.state.user.id &&
                        <div>
                            <i>{rate.Purchase.User.fullName}</i> | <b>{rate.rate+1}</b>
                            <br />
                            <p>{rate.comment}</p>
                            <hr />
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
};

export default Rate;