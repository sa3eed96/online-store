import React, { useState, useEffect } from 'react';
import Input from '../../common/formInput';
import axios from 'axios';
import validateForm from '../../../utils/validation';
import eventBus from '../../../utils/eventbus';

const Address = (props) => {
    const [address, setAddress] = useState(props.location.hasOwnProperty('state') ?
        props.location.state : {
            country: 'Egypt',
            city: 'Cairo',
            address: '',
            zipCode: '',
        });

    const [formValidation, setFormValidation] = useState({
        address: true,
        zipCode: true,
        country: true,
        city: true,
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
            const formValidation = validateForm(e.target.elements);
            if(Object.keys(formValidation).filter(elem => !formValidation[elem]).length > 0){
                setFormValidation(formValidation);
                return;
            }
            if (props.location.hasOwnProperty('state')) {
                await axios.put(`/api/address/${address.id}`, address);
            }
            else {
                await axios.post(`/api/address`, address);
            }
            props.history.goBack();
        } catch (err) {
            eventBus.dispatch("showNotification", {
                body: 'failed to add Addess',
                background: 'bg-danger',
                header: 'Error',
            });
        }
    };
    return (
        <div className="row">
            <div className="card offset-sm-1 col-sm-10 offset-md-4 col-md-4 border border-radius p-4 mt-4">
                <form className="card-body" onSubmit={handleSubmit} noValidate>
                    <h5 className="card-title pb-1 text-center">Edit Address</h5>
                    <div className="form-group">
                        <label htmlFor="country">Country</label>
                        <select name="country" className="form-control" id="country" onChange={handleChange}  required>
                                <option>Egypt</option>
                        </select>
                        {!formValidation['country'] && 
                            <small className="text-danger">country is required</small>
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <select name="city" className="form-control" id="city" onChange={handleChange}  required>
                                <option>Cairo</option>
                                <option>Alexandria</option>
                        </select>
                        {!formValidation['city'] && 
                            <small className="text-danger">city is required</small>
                        }
                    </div>
                    <Input
                        id="address"
                        label="address"
                        value={address.address}
                        name="address"
                        onChange={handleChange}
                        type="text"
                        required="required"
                        pattern="[a-z|A-Z|0-9]+(\s|[a-z|A-Z|0-9])*$"
                        error={(!formValidation['address']).toString()}
                        errormsg="address can only contain letters, digits and whitespace"
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
                        error={(!formValidation['zipCode']).toString()}
                        errormsg="invalid zipcode, must be only digits and 6 characters maximum"
                    />
                    <button className="btn btn-primary">save</button>
                </form>
            </div>
        </div>
    );
};

export default Address;