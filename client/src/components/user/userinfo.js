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

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
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
            alert(err);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <Input
                id="firstName"
                label="firstName"
                value={user.firstName}
                name='firstName'
                handleOnChange={handleChange}
                type="text"
            />
            <Input
                id="lastName"
                label="lastName"
                value={user.lastName}
                name='lastName'
                handleOnChange={handleChange}
                type="text"
            />
            <Input
                id="email"
                label="email"
                value={user.email}
                name="email"
                handleOnChange={handleChange}
                type="text"
            />
            <Input
                id="phone"
                label="phone"
                value={user.phone}
                name="phone"
                handleOnChange={handleChange}
                type="text"
            />
            <button>update</button>
        </form>
    );
};
export default UserInfo;