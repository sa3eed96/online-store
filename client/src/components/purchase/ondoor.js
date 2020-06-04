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
        <div className="row">
            <p className="col-12">pay when items are delivered at your door.</p>
            <h6 className="col-12">total: {total} EGP</h6>
            <button className="btn btn-success" onClick={addOrder}>submit order</button>
        </div>
    );
};

export default OnDoorPurchase;
