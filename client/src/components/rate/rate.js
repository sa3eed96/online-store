import React, {useState, useContext} from 'react';
import {UserContext} from '../../contexts/user';
import MyRate from './myrate/myrate';
import RateView from './rateview';
import Reviews from './reviews';
import './rate.scss';

const Rate = (props)=> {
    const user = useContext(UserContext);
    const [rate, setRate] = useState(props.rate);

    const updateRate = (rate)=> {
        setRate(rate);
    };

    const calculateRate = (rate)=>{
        const sum = rate.reduce((acc, val) => acc + val);
        const avg = rate.reduce((acc, val, index) => acc + (index+1) * val);
        return sum === 0 ? 0 : avg/sum;
    };

    return (
        <div>
            <div className="row">
                <div className="col-md-5" id="rateOverview">
                    <p>{calculateRate(rate)}</p>
                    <RateView size={48} rate={rate} />
                </div>
                {user.state.isAuthenticated &&
                    <div className="col-md-6" id="rateSubmitSection">
                        <MyRate productId={props.productId} updateRate={updateRate} rate={rate} />  
                    </div>
                }
            </div>
            <div className="row" id="reviewsSection">
                <div className="col-12">
                    <Reviews productId={props.productId} />
                </div>
            </div>
        </div>
    );
};

export default Rate;