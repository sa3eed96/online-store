import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { FaStar, FaRegStar } from 'react-icons/fa'
import './myrate.scss';

const SubmitMyRate = (props)=>{
    const [myRate, setMyRate] = useState(props.myRate);
    const [error, setError] = useState(null);
    const [rateView, setRateView] = useState([<FaRegStar />, <FaRegStar />, <FaRegStar />, <FaRegStar />, <FaRegStar />]);

    useEffect(()=>{
        const temp = [...rateView];
        for (let index = 0; index < 5; index++) {
            if(index < myRate.checkedRate+1){
                temp[index] = <FaStar />
            }else{
                temp[index] = <FaRegStar />
            }
        }
        setRateView(temp);
    },[]);

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
            props.updateRate({
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
    
    return(
        <div className="mt-4">
            <h6>Rate Product:</h6>
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
                <textarea id="myreview" className="form-control" name="comment" placeholder="optional rate review" value={myRate.comment} onChange={handleChange}></textarea>
                <button className="btn btn-outline-dark mt-1">rate</button>
                {'id' in myRate &&
                    <button onClick={props.edit} className="btn btn-outline-dark ml-1 mt-1">cancel</button>
                }
            </form>
            {error &&
                <p className="text-danger"><small>{error}</small></p>
            }
        </div>
    );

};

export default SubmitMyRate;
