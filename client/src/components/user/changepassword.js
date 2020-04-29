import React, {useState} from 'react';
import Input from '../common/formInput';
import axios from 'axios';

const ChangePassword = (props)=> {
    const [password, setPassword] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleSubmit = async(e)=> {
        try{
            e.preventDefault();
            if(password.newPassword !== password.confirmPassword)
            {
                alert('new password does not match confirm password');
                return;
            }
            await axios.put('/api/changepassword', {newPassword: password.newPassword, oldPassword:password.oldPassword});
            props.history.replace('/settings');
        }catch(err){
            alert(err);
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
                        handleOnChange={handleChange}
                        name="oldPassword"
                        type="password"
                    />
                <Input 
                    id="newPassword"
                    label="enter new password"
                    value={password.newPassword}
                    handleOnChange={handleChange}
                    name="newPassword"
                    type="password"
                />
                <Input 
                    id="confirmPassword"
                    label="confirm new password"
                    value={password.confirmPassword}
                    handleOnChange={handleChange}
                    name="confirmPassword"
                    type="password"
                />
                <button>update</button>
            </form>
    );
};

export default ChangePassword;