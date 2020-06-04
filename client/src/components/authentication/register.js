import React from 'react';
import Input from '../common/formInput';
import axios from 'axios';

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phone: '',
            error: '',
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
            this.setState({error: ''});
            const user = await axios.post('/api/register', this.state);
            this.props.user.dispatch({
                type: 'register',
                payload: user.data.user,
            });
            // let { from } = this.props.location.state || { from: { pathname: "/" } };
            this.props.history.replace('/');
    }catch(err){
        this.setState({error: err.response.data});
    }
    }
    
    render(){
        return(
            <div className="card offset-sm-1 col-sm-10 offset-md-4 col-md-4 border border-radius p-4 mt-4">
                <form  className="card-body" onSubmit={this.handleSubmit}>
                <h5 className="card-title pb-1 text-center">Register</h5>
                        <Input
                            type="text"
                            name="firstName"
                            value={this.state.firstName}
                            onChange={this.handleChange}
                            id="firstName"
                            label="firstName"
                            required='required'
                            pattern="[a-zA-Z]{2,}"
                        />
                        <Input
                            type="text"
                            name="lastName"
                            value={this.state.lastName}
                            onChange={this.handleChange}
                            id="lastName"
                            label="lastName"
                            required='required'
                            pattern="[a-zA-Z]{2,}"
                        />
                        <Input
                            type="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            id="email"
                            label="email"
                            required='required'
                        />
                        <Input 
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            id="password"
                            label="password"
                            required='required'
                            minLength="8"
                            maxLength="30"
                        />
                        <Input
                            type="text"
                            name="phone"
                            value={this.state.phone}
                            onChange={this.handleChange}
                            id="phone"
                            label="mobile number"
                            pattern="[0-9]{11}"
                            required='required'
                        />
                        <p><small style={{color: 'red'}}>{this.state.error}</small></p>
                        <button className="btn btn-outline-success text-center">register</button>
                </form>
            </div>
        );
    }
}

export default Register;