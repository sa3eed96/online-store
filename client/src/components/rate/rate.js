import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from '../../contexts/user';
import MyRate from './myrate/myrate';
import Reviews from './reviews';

const Rate = (props)=> {
    const user = useContext(UserContext);
    const [rate, setRate] = useState(props.rate);

    const updateRate = (rate)=> {
        setRate(rate);
    };

    return (
        <div>
            <h3>Product Reviews</h3>
            {user.state.isAuthenticated &&
                <MyRate productId={props.productId} updateRate={updateRate} rate={rate} />  
            }
            <Reviews productId={props.productId} />
        </div>
    );
};

export default Rate;