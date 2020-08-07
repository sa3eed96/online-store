import React from 'react';
import Input from '../common/formInput';
import axios from 'axios';
import Spinner from '../common/spinner';
import validateForm from '../../helpers/validation';

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
        this.showNotification = props.showNotification;
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
            this.props.user.dispatch({
                type: 'register',
                payload: user.data.user,
            });
            if(this.props.history.length > 1){
                this.props.history.goBack();
            }else{
                this.props.history.replace('/');
            }
            this.showNotification('confirmation link has been sent to your email','bg-success','Registered successfully');
    }catch(err){
        this.setState({loading: false});
        this.setState({serverError: err.response.data});
    }
    }
    
    render(){
        return(
            <div className="card mx-auto col-sm-10 col-md-3 border border-radius mt-4">
                <form  className="card-body" onSubmit={this.handleSubmit} noValidate>
                <h5 className="card-title pb-1 text-center text-secondary">Register</h5>
                        <Input
                            type="text"
                            name="firstName"
                            value={this.state.firstName}
                            onChange={this.handleChange}
                            id="firstName"
                            label="First name"
                            required='required'
                            pattern="[a-zA-Z]{1,250}"
                            error={!this.state.formValidation["firstName"]}
                            errormsg="firstname must consist of only letters"
                        />
                        <Input
                            type="text"
                            name="lastName"
                            value={this.state.lastName}
                            onChange={this.handleChange}
                            id="lastName"
                            label="Last name"
                            required='required'
                            pattern="[a-zA-Z]{1,250}"
                            error={!this.state.formValidation["lastName"]}
                            errormsg="lastname must consist of only letters"
                        />
                        <Input
                            type="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            id="email"
                            label="Email"
                            required='required'
                            error={!this.state.formValidation["email"]}
                            errormsg="invalid email"
                        />
                        <Input 
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            id="password"
                            label="Password"
                            required='required'
                            minLength="8"
                            maxLength="30"
                            error={!this.state.formValidation["password"]}
                            errormsg="password must be between 8 and 30 characters"
                        />
                        <Input
                            type="text"
                            name="phone"
                            value={this.state.phone}
                            onChange={this.handleChange}
                            id="phone"
                            label="Mobile Number"
                            pattern="01[0-9]{9}"
                            required='required'
                            error={!this.state.formValidation["phone"]}
                            errormsg="mobile number must be 11 digit egyptian number"
                        />
                        <Spinner loading={this.state.loading}></Spinner>
                        <p><small style={{color: 'red'}}>{this.state.serverError}</small></p>
                        <button className="btn btn-primary form-control">register</button>
                </form>
            </div>
        );
    }
}

export default Register;