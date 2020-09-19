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
        <div>
            <div>
                <b>{rateView}</b>
                <br />
                <h6>{props.myRate.comment}</h6>
            </div>
            <button className="btn btn-secondary" onClick={props.edit}>Edit</button>
            <hr />
        </div>
    );
};

export default ViewMyRate;