import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

const MyRate = (props)=> {
    const [myRate, setMyRate] = useState({
        comment: '',
        checkedRate: '4',
    });
    const [rateView, setRateView] = useState([<FaRegStar />, <FaRegStar />, <FaRegStar />, <FaRegStar />, <FaRegStar />]);
    const [error, setError] = useState(null);


    useEffect(()=>{
        const getMyRate = async()=>{
            const {data} = await axios.get(`/api/product/${props.productId}/userrate/myrate`);
            if(data.hasOwnProperty('myRate')){
                setMyRate({
                    ...data.myRate,
                    checkedRate: data.myRate.rate.toString(),
                });
                const temp = [...rateView];
                for (let index = 0; index < 5; index++) {
                    if(index <= data.myRate.rate){
                        temp[index] = <FaStar />;
                    }else{
                        temp[index] = <FaRegStar />
                    }
                }
                setRateView(temp);
            }
        };
        getMyRate();
    }, []);

    const handleSubmit = async(e)=> {
        try{
            e.preventDefault();
            let res = null
            if('id' in myRate){
                res = await axios.put(`/api/product/${props.productId}/userrate/${myRate.id}`,{rateArray: props.rate, rate: myRate.checkedRate, comment: myRate.comment});
            }else{
                res = await axios.post(`/api/product/${props.productId}/userrate`,{rateArray: props.rate, rate: myRate.checkedRate, comment: myRate.comment});
            }
            const {data} = res;
            setError(null);
            props.updateRate(data.rate);
            setMyRate({
                ...data.userRate,
                checkedRate: data.userRate.rate,    
            });
        }catch(err){
            setError(err.response.data);
        }
    };

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

    const handleChange = (e) => {
        setMyRate({
            ...myRate,
            [e.target.name]: e.target.value,
        })
    };

    return (
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
            {error &&
                <p className="text-danger"><small>{error}</small></p>
            }
        </div>
    );
}

export default MyRate;