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
            const user = await axios.post('/api/register', this.state);
            this.props.user.dispatch({
                type: 'register',
                payload: user.data.user,
            });
            let { from } = this.props.location.state || { from: { pathname: "/" } };
            this.props.history.replace(from);
    }catch(err){
        alert(err);
    }
    }
    
    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                        <Input
                            type="text"
                            name="firstName"
                            value={this.state.firstName}
                            handleOnChange={this.handleChange}
                            id="firstName"
                            label="firstName"
                        />
                        <Input
                            type="text"
                            name="lastName"
                            value={this.state.lastName}
                            handleOnChange={this.handleChange}
                            id="lastName"
                            label="lastName"
                        />
                        <Input
                            type="text"
                            name="email"
                            value={this.state.email}
                            handleOnChange={this.handleChange}
                            id="email"
                            label="email"
                        />
                        <Input 
                            type="password"
                            name="password"
                            value={this.state.password}
                            handleOnChange={this.handleChange}
                            id="password"
                            label="password"
                        />
                        <Input
                            type="text"
                            name="phone"
                            value={this.state.phone}
                            handleOnChange={this.handleChange}
                            id="phone"
                            label="phone"
                        />
                        <button>register</button>
                </form>
            </div>
        );
    }
}

export default Register;