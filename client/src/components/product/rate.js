import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Rate = (props)=> {
    const [rate, setRate] = useState(props.rate.rate);

    const handleClick = async(rateValue, e)=> {
        try{
            e.preventDefault();
            const {data} = await axios.put(`/api/product/${props.productId}/rate/${props.rate.id}`,{rateArray: rate, rate: rateValue});
            setRate(data.rate.rate);
        }catch(err){
            alert(err);
        }
    };

    return (
        <div>
            <h6>1 star: {rate[0]} {props.user.state.isAuthenticated &&<a href="#" onClick={(e)=> handleClick(0, e)}>+</a>}</h6>
            <h6>2 star: {rate[1]} {props.user.state.isAuthenticated &&<a href="#" onClick={(e)=> handleClick(1, e)}>+</a>}</h6>
            <h6>3 star: {rate[2]} {props.user.state.isAuthenticated &&<a href="#" onClick={(e)=> handleClick(2, e)}>+</a>}</h6>
            <h6>4 star: {rate[3]} {props.user.state.isAuthenticated &&<a href="#" onClick={(e)=> handleClick(3, e)}>+</a>}</h6>
            <h6>5 star: {rate[4]} {props.user.state.isAuthenticated &&<a href="#" onClick={(e)=> handleClick(4, e)}>+</a>}</h6>
        </div>
    );
};

export default Rate;