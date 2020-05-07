import React, {useState} from 'react';
import Input from '../common/formInput';
import axios from 'axios';

const ChangePassword = (props)=> {
    const [password, setPassword] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');

    const handleSubmit = async(e)=> {
        try{
            e.preventDefault();
            setError('');
            if(password.newPassword !== password.confirmPassword)
            {
                alert('new password does not match confirm password');
                return;
            }
            await axios.put('/api/changepassword', {newPassword: password.newPassword, oldPassword:password.oldPassword});
            props.history.replace('/settings');
        }catch(err){
            console.log(err.response);
            if(err.response.status === 400){
                return setError(err.response.data);
            }
            alert('error changing password, try again later');
        }
    };

    const handleChange = async(e)=> {
        setPassword({
            ...password,
            [e.target.name]: e.target.value
        })
    };

    return (
            <form onSubmit={handleSubmit}>
                <Input 
                        id="old"
                        label="old password"
                        value={password.oldPassword}
                        onChange={handleChange}
                        name="oldPassword"
                        type="password"
                        required="required"
                        minLength="8"
                        maxLength="30"
                    />
                <Input 
                    id="newPassword"
                    label="enter new password"
                    value={password.newPassword}
                    onChange={handleChange}
                    name="newPassword"
                    type="password"
                    required="required"
                    minLength="8"
                    maxLength="30"
                />
                <Input 
                    id="confirmPassword"
                    label="confirm new password"
                    value={password.confirmPassword}
                    onChange={handleChange}
                    name="confirmPassword"
                    type="password"
                    required="required"
                    minLength="8"
                    maxLength="30"
                />
                <p style={{color: 'red'}}><small>{error}</small></p>
                <button>update</button>
            </form>
    );
};

export default ChangePassword;