import React, {useState} from 'react';
import AddressChoose from './addressChoose';  
import OnDoorPurchase from './ondoor';
import Paypal from './paypal';

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
        <div style={{minHeight: screen.height/3}} className="row mt-4">
            <div className="col-md-8 mx-auto bg-white">
                {!addressId &&
                    <AddressChoose {...props} setSelectedAddress={setSelectedAddress} />    
                }
                {addressId &&
                <div>
                    <div class="row mt-1">
                        <h5 className="col-12">Choose Payment Method</h5>
                    </div>
                    <hr />
                    <div className="row mb-1">
                        <form className="col-md-6 col-sm-11 border-right">
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
                        {addressId && payment === 'ondoor' &&
                            <OnDoorPurchase {...props} total={total} addressId={addressId} />
                        }
                        {addressId && payment === 'paypal' &&
                            <Paypal {...props} total={total} addressId={addressId} />
                        }
                    </div>
                </div>
                }
            </div>
        </div>
    );

};

export default Purchase;