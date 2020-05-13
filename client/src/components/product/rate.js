import React, {useState, useEffect} from 'react';
import Input from '../common/formInput';
import axios from 'axios';

const Rate = (props)=> {
    const [rate, setRate] = useState(props.rate.rate);
    const [rates, setRates] = useState([]);
    const [myRate, setMyRate] = useState({
        comment: '',
        checkedRate: '4',
    });
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);


    useEffect(()=>{
        const getMyRate = async()=>{
            if(props.user.state.isAuthenticated){
                const {data} = await axios.get(`/api/product/${props.productId}/purchasedetail/myrate`);
                if(data.hasOwnProperty('myRate')){
                    console.log(data.myRate);
                    setMyRate({
                        ...data.myRate,
                        checkedRate: data.myRate.rate.toString(),
                    });
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
            setRate(data.rate.rate);
            setMyRate({
                ...data.details,
                checkedRate: data.details.rate,    
            });
        }catch(err){
            alert(err);
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

    return (
        <div>
            <hr />
            {props.user.state.isAuthenticated &&
                <div>
                    <p><b>Rate Product:</b></p>
                    <form onSubmit={handleSubmit}>
                        <Input type="radio" name="checkedRate" value="0" label="1" id="r1" checked={myRate.checkedRate === '0'} onChange={handleChange}/>
                        <Input type="radio" name="checkedRate" value="1" label="2" id="r2" checked={myRate.checkedRate === '1'} onChange={handleChange}/>
                        <Input type="radio" name="checkedRate" value="2" label="3" id="r3" checked={myRate.checkedRate === '2'} onChange={handleChange}/>
                        <Input type="radio" name="checkedRate" value="3" label="4" id="r4" checked={myRate.checkedRate === '3'} onChange={handleChange}/>
                        <Input type="radio" name="checkedRate" value="4" label="5" id="r5" checked={myRate.checkedRate === '4'} onChange={handleChange}/>
                        <textarea name="comment" placeholder="optional rate comment" value={myRate.comment} onChange={handleChange}></textarea>
                        <button>{myRate.id ? 'update rate' : 'rate'}</button>
                    </form>
                </div>
            }
            <hr />
            <h4>Product Rate</h4>
            <div>
                <h6>1 star: {rate[0]}</h6>
                <h6>2 star: {rate[1]}</h6>
                <h6>3 star: {rate[2]}</h6>
                <h6>4 star: {rate[3]}</h6>
                <h6>5 star: {rate[4]}</h6>
            </div>
            <hr />
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
            <a href="#" onClick={decPage}>&lt;</a>
            page: {page}  
            <a href="#" onClick={incPage}>&gt;</a>
        </div>
    );
};

export default Rate;