import React, {useState, useEffect} from 'react';
import RateView from '../rateview';

const ViewMyRate = (props)=>{
    const [rateView, setRateView] = useState(null);
    
    useEffect(()=>{
        const rateArr = [0,0,0,0,0];
        rateArr[props.myRate.checkedRate]+=1;
        setRateView(<RateView rate={rateArr} />);
    }, [props.myRate.checkedRate])
    
    return(
        <div className="mt-4">
            <div>
                <h6>Your Rate:</h6>
                <b>{rateView}</b>
                <p id="myrate">"{props.myRate.comment}"</p>
            </div>
            <button className="btn btn-outline-dark" onClick={props.edit}>Edit</button>
            <hr />
        </div>
    );
};

export default ViewMyRate;