import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Input from '../common/formInput';
import axios from 'axios';
import eventBus from '../../helpers/eventbus';

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
            eventBus.dispatch("showNotification", {
                body: "Password Reset Success",
                background: 'bg-success',
                header: 'Success',
            });
        }catch(err){
            eventBus.dispatch("showNotification", {
                body: "Failed to Reset Password",
                background: 'bg-danger',
                header: 'Error',
            });
        }
    };

    return (
        <div className="row">
            <div className="card offset-sm-1 col-sm-10 offset-md-4 col-md-4 border border-radius p-4 mt-4">
                <form id="forgotForm" className="card-body" onSubmit={handleSubmit}></form>
                <div>
                        <h5 className="card-title pb-1 text-center">Reset Password</h5>
                        <Input
                            form="forgotForm"
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            id="password"
                            label="New password"
                            required='required'
                        />
                        <button form="forgotForm" className="btn btn-outline-success">update</button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
