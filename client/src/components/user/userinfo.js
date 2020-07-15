import React, {useState} from 'react';
import axios from 'axios';
import Input from '../common/formInput';

const UserInfo = (props)=> {

    const [user, setUser] = useState({
            firstName: props.user.state.user.firstName,
            lastName: props.user.state.user.lastName,
            email: props.user.state.user.email,
            phone: props.user.state.user.phone,
        });
    
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setError('');
            const updatedUser = await axios.put('/api/user', user);
            if(updatedUser.data.hasOwnProperty('user')){
                props.user.dispatch({
                    type: 'infoUpdate',
                    payload: {
                        ...props.user.state.user,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        phone: user.phone,
                        email: user.email,
                    }
                });
            }
            props.history.replace('/settings');
        } catch (err) {
            if(err.response.hasOwnProperty('data')){
                return setError(err.response.data);
            }
            alert('could not register, try again later');
        }
    };
    return (
        <div class="row">
            <div className="card offset-sm-1 col-sm-10 offset-md-4 col-md-4 border border-radius p-4 mt-4">
                <form className="card-body" onSubmit={handleSubmit}>
                    <h5 className="card-title pb-1 text-center">Edit Personal Information</h5>
                    <Input
                        id="firstName"
                        label="firstName"
                        value={user.firstName}
                        name='firstName'
                        onChange={handleChange}
                        type="text"
                        required="required"
                        pattern="[a-z|A-Z]{2,}"
                    />
                    <Input
                        id="lastName"
                        label="lastName"
                        value={user.lastName}
                        name='lastName'
                        onChange={handleChange}
                        type="text"
                        required="required"
                        pattern="[a-z|A-Z]{2,}"
                    />
                    <Input
                        id="email"
                        label="email"
                        value={user.email}
                        name="email"
                        onChange={handleChange}
                        type="email"
                        required="required"
                    />
                    <Input
                        id="phone"
                        label="mobile number"
                        value={user.phone}
                        name="phone"
                        onChange={handleChange}
                        type="text"
                        required="required"
                        pattern="[0-9]{11}"
                    />
                    <p style={{color:'red'}}><small>{error}</small></p>
                    <button  class="btn btn-primary">update</button>
                </form>
            </div>
        </div>
    );
};
export default UserInfo;