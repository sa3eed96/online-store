import React, {useState, useContext} from 'react';
import Input from '../common/formInput';
import {Link} from 'react-router-dom';
import axios from 'axios';
import eventBus from '../../utils/eventbus';
import { UserContext } from '../../contexts/user';

const DeleteAccount = (props)=> {
    const user = useContext(UserContext);
    const [check, setCheck] = useState(false);
    const [password, setPassword] = useState(''); 
    const [error, setError] = useState('');

    const handleChange = async(e)=> {
        setPassword(e.target.value);
    }

    const handleSubmit = async(e)=> {
        try{
            e.preventDefault();
            setError('');
            await axios.delete('/api/user', { data:{password} });
            user.dispatch({
                type: 'logout'
            });
            eventBus.dispatch("showNotification", {
                body: 'Account Deleted',
                background: 'bg-success',
                header: 'Success',
            });
            props.history.replace('/login');
        }catch(err){
            if(err.response.status === 400){
                return setError(err.response.data);
            }
            eventBus.dispatch("showNotification", {
                body: 'Could Not Delete Account, try again later',
                background: 'bg-danger',
                header: 'Error',
            });
        }
    };

    const handleClick = async(e)=> {
        e.preventDefault();
        setCheck(true);
    };

    return (
        <div className="row mt-4">
            {!check &&
                <div className="card col-sm-10 col-md-4 mx-auto border-radius p-4">
                    <div className="card-body">
                        <h5>Note: you cannot recover your account after deletion</h5>
                        <a className="btn btn-danger my-4 mr-2" href="#" onClick={handleClick}>Proceed and Delete</a>
                        <Link className="btn btn-success" to="/settings">Cancel</Link>
                    </div>
                </div>
            }
            {check &&
            <div className="card mx-auto col-sm-10 col-md-4 border border-radius p-4">
                <form className="card-body" onSubmit={handleSubmit}>
                    <h5 className="card-title pb-1 text-center">Enter Password to Delete</h5>
                    <Input 
                        id="password"
                        label="password"
                        value={password}
                        onChange={handleChange}
                        name="password"
                        type="password"
                        required="required"
                        minLength="8"
                        maxLength="30"
                    />
                    <p className="text-danger"><small>{error}</small></p>
                    <button className="btn btn-danger">Delete Account</button>
                </form>
            </div>
            }
        </div>
    );
};

export default DeleteAccount;