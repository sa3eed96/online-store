import React, {useState} from 'react';
import AddressChoose from './addressChoose';  
import OnDoorPurchase from './ondoor';

const Purchase = (props)=> {
    const total = props.location.state;
    const [addressId, setAddressId] = useState(null);
    const [payment, setPayment] = useState('ondoor');

    const setSelectedAddress = (addressId)=> {
        setAddressId(addressId);
    };

    const paymentChange = (e)=> {
        setPayment(e.target.value);
    };

    return (
        <div>
            {!addressId &&
                <AddressChoose setSelectedAddress={setSelectedAddress} />    
            }
            {addressId &&
                <div class="row">
                    <h6 className="col-12">purchase will be delivered after 3 days</h6>
                    <h6 className="col-12">choose payment method</h6>
                    <form className="col-12">
                        <div className="form-check">
                            <input
                                type="radio"
                                name="payment"
                                value="ondoor"
                                onChange={paymentChange}
                                checked={payment === 'ondoor'}
                                className="form-check-input"
                            />
                            <label className="form-check-label">
                                on door
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                name="payment"
                                value="paypal"
                                onChange={paymentChange}
                                checked={payment === 'paypal'}
                                className="form-check-input"
                            />
                            <label className="form-check-label">
                                paypal
                            </label>
                        </div>
                    </form>
                </div>
            }
            {addressId && payment === 'ondoor' &&
                <OnDoorPurchase {...props} total={total} addressId={addressId} />
            }
            {addressId && payment === 'paypal' &&
                <p className="text-danger">paypal is not available now please choose another payment method</p>
            }
        </div>
    );

};

export default Purchase;