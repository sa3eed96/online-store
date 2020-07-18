import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Input from '../common/formInput';
const axios = require('axios');
//
const ForgotPassword  = (props)=>{
    const {id} = useParams();
    const [password, setPassword] = useState('');
    useEffect(()=>{
        const verifyLink = async()=>{
            try{
                const s = id;
                const res = await axios.get(`/api/passwordreset/${id}`);
            }catch(err){
                props.history.push('/login')
            }
        };
        verifyLink();
    },[]);

    const handleChange = (e)=>{
        setPassword(e.target.value);
    };

    const handleSubmit = async(e)=>{
        try{
            e.preventDefault();
            await axios.post('/api/reset',{password, id});
            props.history.push('/login');
            props.showNotification('Password Reset Success','bg-success', 'Success');
        }catch(err){
            props.showNotification('Failed to Reset Password','bg-danger', 'Error');
        }
    };

    return (
        <div class="row">
            <div className="card offset-sm-1 col-sm-10 offset-md-4 col-md-4 border border-radius p-4 mt-4">
                <form className="card-body" onSubmit={handleSubmit}>
                        <h5 className="card-title pb-1 text-center">Reset Password</h5>
                        <Input
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            id="password"
                            label="New password"
                            required='required'
                        />
                        <button class="btn btn-outline-success">update</button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
