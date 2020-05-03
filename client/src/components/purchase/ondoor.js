import React from 'react';
import axios from 'axios';

const OnDoorPurchase = (props)=> {
    const {total, addressId} = props;

    const addOrder = async()=> {
        try{
            await axios.post('/api/purchase',{
                addressId,
                paymentType: 'ondoor',
                isPaid: false
            });
            props.history.replace('/purchases');
        }catch(err){
            alert(err);
        }
    };
    return (
        <div>
            <p>pay when items are delivered at your door.</p>
            <h6>total: {total}</h6>
            <button onClick={addOrder}>submit order</button>
        </div>
    );
};

export default OnDoorPurchase;
