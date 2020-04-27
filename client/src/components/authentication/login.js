import React from 'react';
import Input from '../common/formInput';
const axios = require('axios');

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            rememberMe: false,
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
            const user = await axios.post('/api/login', this.state);
            this.props.user.dispatch({
                type: 'login',
                payload: user.data.user,
            });
            this.props.history.replace('/');
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
                        <button>login</button>
                </form>
            </div>
        );
    }
}

export default Login;