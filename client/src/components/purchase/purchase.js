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
                <div>
                    <p>purchase will be delivered after 3 days</p>
                    <p>choose payment method</p>
                    <form>
                        <label>
                            <input
                                type="radio"
                                name="payment"
                                value="ondoor"
                                onChange={paymentChange}
                                checked={payment === 'ondoor'}
                            />
                        on door
                        </label>
                        <br />
                        <label>
                            <input
                                type="radio"
                                name="payment"
                                value="paypal"
                                onChange={paymentChange}
                                checked={payment === 'paypal'}
                            />
                        paypal
                        </label>
                    </form>
                </div>
            }
            {addressId && payment === 'ondoor' &&
                <OnDoorPurchase total={total} addressId={addressId} />
            }
            {addressId && payment === 'paypal'

            }
        </div>
    );

};

export default Purchase;