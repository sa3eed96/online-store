import React, {useState, useContext} from 'react';
import axios from 'axios';
import Input from '../common/formInput';
import Spinner from '../common/spinner';
import validateForm from '../../helpers/validation';
import { UserContext } from '../../contexts/user';
import eventBus from '../../helpers/eventbus';

const UserInfo = (props)=> {
    const userContext = useContext(UserContext);
    const [user, setUser] = useState({
            firstName: userContext.state.user.firstName,
            lastName: userContext.state.user.lastName,
            email: userContext.state.user.email,
            phone: userContext.state.user.phone,
        });

        const [formValidation, setFormValidation] = useState({
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
        });
    
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

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
            setLoading(true);
            const formValidation = validateForm(e.target.elements);
            if(Object.keys(formValidation).filter(elem => !formValidation[elem]).length > 0){
                setFormValidation(formValidation);
                setLoading(false);
                return;
            }
            const {data} = await axios.put('/api/user', user);
            if(data.hasOwnProperty('user')){
                userContext.dispatch({
                    type: 'infoUpdate',
                    payload: {
                        ...userContext.state.user,
                        firstName: data.user.firstName,
                        lastName: data.user.lastName,
                        phone: data.user.phone,
                        email: data.user.email,
                    }
                });
            }
            eventBus.dispatch("showNotification", {
                body: 'Info updated',
                background: 'bg-success',
                header: 'Success',
            });
            props.history.replace('/settings');
        } catch (err) {
            setLoading(false);
            if("response" in err && 'data' in err.response){
                return setError(err.response.data);
            }
            eventBus.dispatch("showNotification", {
                body: 'Could Not Updated Info, try again later',
                background: 'bg-danger',
                header: 'Error',
            });
        }
    };
    return (
        <div className="row">
            <div className="card offset-sm-1 col-sm-10 offset-md-4 col-md-4 border border-radius p-4 mt-4">
                <form className="card-body" onSubmit={handleSubmit} noValidate>
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
                        error={(!formValidation["firstName"]).toString()}
                        errormsg="firstname must consist of only letters"
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
                        error={(!formValidation["lastName"]).toString()}
                        errormsg="lastname must consist of only letters"
                    />
                    <Input
                        id="email"
                        label="email"
                        value={user.email}
                        name="email"
                        onChange={handleChange}
                        type="email"
                        required="required"
                        error={(!formValidation["email"]).toString()}
                        errormsg="invalid email"
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
                        error={(!formValidation["phone"]).toString()}
                        errormsg="mobile number must be 11 digit egyptian number"
                    />
                    <p className="text-danger"><small>{error}</small></p>
                    <Spinner loading={loading}></Spinner>
                    <button  className="btn btn-primary">update</button>
                </form>
            </div>
        </div>
    );
};
export default UserInfo;