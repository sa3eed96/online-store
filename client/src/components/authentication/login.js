import React from 'react';
import Input from '../common/formInput';
import ForgotPasswordLink from './forgotpasswordlink';
import axios from 'axios';


class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            rememberMe: false,
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
            this.setState({error: ''});
            e.preventDefault();
            const user = await axios.post('/api/login', {email: this.state.email, password: this.state.password, rememberMe: this.state.rememberMe});
            this.props.user.dispatch({
                type: 'login',
                payload: user.data.user,
            });
            this.props.history.replace('/');
        }catch(err){
            this.setState({error: err.response.data});
        }
    }
    
    render(){
        return(
            <div class="row">
                <div className="card offset-sm-1 col-sm-10 offset-md-4 col-md-4 border border-radius p-4 mt-4">
                    <form className="card-body" onSubmit={this.handleSubmit}>
                            <h5 className="card-title pb-1 text-center">Login</h5>
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
                                minLength='8'
                                maxLength='30'
                            />
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="rememberme" />
                                <label class="form-check-label" for="rememberme">remember me for a week</label>
                            </div>
                            <p><small style={{color: 'red'}}>{this.state.error}</small></p>
                            <ForgotPasswordLink />
                            <button class="btn btn-outline-primary">login</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;