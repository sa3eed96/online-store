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
                onChange={handleChange}
                type="text"
                required="required"
                pattern="[a-z]+(\s|[a-z])*$"
            />
            <Input
                id="state"
                label="state"
                value={address.state}
                name='state'
                onChange={handleChange}
                type="text"
                required="required"
                pattern="[a-z]+(\s|[a-z])*$"
            />
            <Input
                id="city"
                label="city"
                value={address.city}
                name="city"
                onChange={handleChange}
                type="text"
                required="required"
                pattern="[a-z]+(\s|[a-z])*$"
            />
            <Input
                id="address"
                label="address"
                value={address.address}
                name="address"
                onChange={handleChange}
                type="text"
                required="required"
                pattern="[a-z|0-9]+(\s|[a-z|0-9])*$"
            />
            <Input
                id="zipcode"
                label="zipcode"
                value={address.zipCode}
                name="zipCode"
                onChange={handleChange}
                type="text"
                required="required"
                pattern="[0-9]{3,6}"
            />
            <button>save</button>
        </form>
    );
};

export default Address;