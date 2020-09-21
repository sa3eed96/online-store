import React, {useState} from 'react';
import axios from 'axios';

const OnDoorPurchase = (props)=> {
    const {total, addressId} = props;
    const [error, setError] = useState('');

    const addOrder = async()=> {
        try{
            setError('');
            await axios.post('/api/purchase',{
                addressId,
                paymentType: 'ondoor',
                isPaid: false
            });
            props.history.replace('/purchases');
        }catch(err){
            setError('could not process purchase, please try again later');
        }
    };
    return (
        <div className="col-md-6 col-sm-12">
            <div className="row">
                <p className="col-auto">pay when items are delivered at your door.</p>
                <p className="col-auto">total: <b>{total} EGP</b></p>
            </div>
            <div className="row">
                <p className="text-danger"><small>{error}</small></p>
            </div>
            <div className="row ml-1">
                <button className="btn w-50 btn-success" onClick={addOrder}>Submit Order</button>
            </div>
        </div>
    );
};

export default OnDoorPurchase;
