import React, { useState, useEffect } from 'react';
import Input from '../../common/formInput';
import axios from 'axios';

const Address = (props) => {
    const [address, setAddress] = useState(props.location.hasOwnProperty('state') ?
        props.location.state : {
            country: 'Egypt',
            city: 'Cairo',
            address: '',
            zipCode: '',
        });

    const handleChange = (e) => {
        console.log(e.target.value);
        console.log(e.target.name);
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
            props.showNotification('failed to add Addess','bg-danger', 'Error');
        }
    };
    return (
        <div class="row">
            <div className="card offset-sm-1 col-sm-10 offset-md-4 col-md-4 border border-radius p-4 mt-4">
                <form className="card-body" onSubmit={handleSubmit}>
                    <h5 className="card-title pb-1 text-center">Edit Address</h5>
                    <div className="form-group">
                        <label htmlFor="country">Country</label>
                        <select name="country" class="form-control" id="country" onChange={handleChange}  required>
                                <option>Egypt</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <select name="city" class="form-control" id="city" onChange={handleChange}  required>
                                <option>Cairo</option>
                                <option>Alexandria</option>
                        </select>
                    </div>
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
                    <button className="btn btn-primary">save</button>
                </form>
            </div>
        </div>
    );
};

export default Address;