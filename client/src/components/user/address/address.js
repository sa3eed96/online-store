import React, { useState } from 'react';
import Input from '../../common/formInput';
import axios from 'axios';

const Address = (props) => {
    const [address, setAddress] = useState(props.location.hasOwnProperty('state') ?
        props.location.state : {
            country: '',
            state: '',
            city: '',
            address: '',
            zipCode: '',
        });

    const handleChange = (e) => {
        setAddress({
            ...address,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (props.location.hasOwnProperty('state')) {
                await axios.put(`/api/address/${address.id}`, address);
            }
            else {
                await axios.post(`/api/address`, address);
            }
            props.history.replace('/settings/addresses');
        } catch (err) {
            alert(err);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <Input
                id="country"
                label="country"
                value={address.country}
                name='country'
                handleOnChange={handleChange}
                type="text"
            />
            <Input
                id="state"
                label="state"
                value={address.state}
                name='state'
                handleOnChange={handleChange}
                type="text"
            />
            <Input
                id="city"
                label="city"
                value={address.city}
                name="city"
                handleOnChange={handleChange}
                type="text"
            />
            <Input
                id="address"
                label="address"
                value={address.address}
                name="address"
                handleOnChange={handleChange}
                type="text"
            />
            <Input
                id="zipcode"
                label="zipcode"
                value={address.zipCode}
                name="zipCode"
                handleOnChange={handleChange}
                type="text"
            />
            <button>save</button>
        </form>
    );
};

export default Address;