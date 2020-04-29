import React, {useState} from 'react';
import Input from '../common/formInput';
import {Link} from 'react-router-dom';
import axios from 'axios';

const DeleteAccount = (props)=> {
    const [check, setCheck] = useState(false);
    const [password, setPassword] = useState(''); 

    const handleChange = async(e)=> {
        setPassword(e.target.value);
    }

    const handleSubmit = async(e)=> {
        try{
            e.preventDefault();
            await axios.delete('/api/user', { data:{password} });
            props.user.dispatch({
                type: 'logout'
            });
            props.history.replace('/login');
        }catch(err){
            alert(err);
        }
    };

    const handleClick = async(e)=> {
        e.preventDefault();
        setCheck(true);
    };

    return (
        <div>
            {!check &&
                <div>
                    <h6>Note: you cannot recover your account after deletion</h6>
                    <a href="#" onClick={handleClick}>Proceed and Delete</a>
                    <br />
                    <Link to="/settings">Cancel</Link>
                </div>
            }
            {check &&
            <div>
                <h6>enter your password</h6>
                <form onSubmit={handleSubmit}>
                    <Input 
                        id="password"
                        label="password"
                        value={password}
                        handleOnChange={handleChange}
                        name="password"
                        type="password"
                    />
                    <button>Delete Account</button>
                </form>
            </div>
            }
        </div>
    );
};

export default DeleteAccount;