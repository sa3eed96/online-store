import React from 'react';
import Input from '../common/formInput';
import axios from 'axios';
import Spinner from '../common/spinner';
import validateForm from '../../utils/validation';
import { UserContext } from '../../contexts/user';
import eventBus from '../../utils/eventbus';

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phone: '',
            serverError: '',
            loadng: false,
            formValidation: {
                firstName: true,
                lastName: true,
                email: true,
                password: true,
                phone: true,
            },
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    async handleSubmit(e){
        try{
            e.preventDefault();
            this.setState({serverError: '', loading: true});
            const formValidation = validateForm(e.target.elements);
            if(Object.keys(formValidation).filter(elem => !formValidation[elem]).length > 0){
                this.setState({formValidation, loading: false, serverError: ''});
                return;
            }
            const user = await axios.post('/api/register', this.state);
            this.context.dispatch({
                type: 'register',
                payload: user.data.user,
            });
            this.props.history.replace('/');
            eventBus.dispatch("showNotification", {
                body: "confirmation link has been sent to your email",
                background: 'bg-success',
                header: 'Registered successfully',
            });
        }catch(err){
            this.setState({loading: false});
            this.setState({serverError: err.response.data});
        }
    }
    
    render(){
        return(
            <div className="card mx-auto col-sm-10 col-md-4 border border-radius p-4 mt-4">
                <form  className="card-body" onSubmit={this.handleSubmit} noValidate>
                <h5 className="card-title pb-1 text-center text-secondary">Register</h5>
                        <Input
                            type="text"
                            name="firstName"
                            value={this.state.firstName}
                            onChange={this.handleChange}
                            id="firstName"
                            placeholder="First name"
                            required='required'
                            pattern="[a-zA-Z]{1,250}"
                            error={(!this.state.formValidation["firstName"]).toString()}
                            errormsg="firstname must consist of only letters"
                        />
                        <Input
                            type="text"
                            name="lastName"
                            value={this.state.lastName}
                            onChange={this.handleChange}
                            id="lastName"
                            placeholder="Last name"
                            required='required'
                            pattern="[a-zA-Z]{1,250}"
                            error={(!this.state.formValidation["lastName"]).toString()}
                            errormsg="lastname must consist of only letters"
                        />
                        <Input
                            type="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            id="email"
                            placeholder="Email"
                            required='required'
                            error={(!this.state.formValidation["email"]).toString()}
                            errormsg="invalid email"
                        />
                        <Input 
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            id="password"
                            placeholder="Password"
                            required='required'
                            minLength="8"
                            maxLength="30"
                            error={(!this.state.formValidation["password"]).toString()}
                            errormsg="password must be between 8 and 30 characters"
                        />
                        <Input
                            type="text"
                            name="phone"
                            value={this.state.phone}
                            onChange={this.handleChange}
                            id="phone"
                            placeholder="Mobile Number"
                            pattern="01[0-9]{9}"
                            required='required'
                            error={(!this.state.formValidation["phone"]).toString()}
                            errormsg="mobile number must be 11 digit egyptian number"
                        />
                        <Spinner loading={this.state.loading}></Spinner>
                        <p><small className="text-danger">{this.state.serverError}</small></p>
                        <button className="btn btn-dark form-control">register</button>
                </form>
            </div>
        );
    }
}

Register.contextType = UserContext;
export default Register;