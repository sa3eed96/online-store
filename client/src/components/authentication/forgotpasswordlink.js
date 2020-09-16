import React, {useState} from 'react';
import axios from 'axios';
import Input from '../common/formInput';
import eventBus from '../../utils/eventbus';

const ForgotPasswordLink = (props) => {
    const [showForm, setShowForm] = useState(false);
    const [email, setEmail] = useState('');

    const sendLink = async(e)=>{
        e.preventDefault();
        try{
            await axios.post('/api/passwordreset', {email});
            setShowForm(false);
            eventBus.dispatch("showNotification", {
                body: "email containing password reset link has been sent",
                background: 'bg-success',
                header: 'Success',
            });
        }catch(err){
            eventBus.dispatch("showNotification", {
                body: "could not send password reset link, try again later",
                background: 'bg-danger',
                header: 'Error',
            });
        }
    };

    const openForm = (e)=>{
        e.preventDefault();
        setShowForm(true);
    };

    const handleChange = (e)=>{
        setEmail(e.target.value);
    };

    return (
        <div>
            <a href="#" data-toggle="modal" data-target="#fullImageModal"><small><u>Forgot Password?</u></small></a>
            <div className="modal fade" id="fullImageModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered " role="document">
                    <div className="modal-content">
                        <form  onSubmit={sendLink} className="modal-body">
                            <h5 className="card-title pb-1 text-center">Enter your Email</h5>
                            <Input
                                type="email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                id="email"
                                label="email"
                                required='required'
                            />
                            <button className="btn btn-primary">Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordLink;


