import React, {useState} from 'react';
import Input from '../common/formInput';
import axios from 'axios';
import eventBus from '../../utils/eventbus';

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
                setError('new password does not match confirm password');
                return;
            }
            await axios.put('/api/user/changepassword', {newPassword: password.newPassword, password: password.oldPassword});
            eventBus.dispatch("showNotification", {
                body: 'Password Updated',
                background: 'bg-success',
                header: 'Success',
            });
            props.history.replace('/settings');
        }catch(err){
            if(err.response.status === 400){
                return setError(err.response.data);
            }
            eventBus.dispatch("showNotification", {
                body: 'error changing password, try again later',
                background: 'bg-danger',
                header: 'Error',
            });
        }
    };

    const handleChange = async(e)=> {
        setPassword({
            ...password,
            [e.target.name]: e.target.value
        })
    };

    return (
        <div className="row">
            <div className="card offset-sm-1 col-sm-10 offset-md-4 col-md-4 border border-radius p-4 mt-4">
                <form className="card-body" onSubmit={handleSubmit}>
                    <h5 className="card-title pb-1 text-center">change password</h5>
                    <Input 
                            id="old"
                            placeholder="old password"
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
                        placeholder="enter new password"
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
                        placeholder="confirm new password"
                        value={password.confirmPassword}
                        onChange={handleChange}
                        name="confirmPassword"
                        type="password"
                        required="required"
                        minLength="8"
                        maxLength="30"
                    />
                    <p className="text-danger"><small>{error}</small></p>
                    <button className="btn btn-dark">Update</button>
                </form>
                </div>
            </div>
    );
};

export default ChangePassword;