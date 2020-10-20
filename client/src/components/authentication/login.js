import React from 'react';
import Input from '../common/formInput';
import ForgotPasswordLink from './forgotpasswordlink';
import axios from 'axios';
import Spinner from '../common/spinner';
import { UserContext } from '../../contexts/user';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            rememberMe: false,
            error: '',
            loading: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        const target = e.target.name === "rememberMe" ? e.target.checked : e.target.value; 
        this.setState({
           [e.target.name]: target,
        });
    }

    async handleSubmit(e){
        try{
            e.preventDefault();
            this.setState({error: ''});
            this.setState({loading: true});
            const user = await axios.post('/api/login', {email: this.state.email, password: this.state.password, rememberMe: this.state.rememberMe});
            this.context.dispatch({
                type: 'login',
                payload: user.data.user,
            });
            this.props.history.replace('/');
        }catch(err){
            this.setState({loading: false});
            this.setState({error: err.response.data});
        }
    }
    
    render(){
        return(
            <div className="row">
                <div className="card mx-auto col-sm-10 col-md-4 border border-radius p-4 mt-4">
                    <form id="loginForm" onSubmit={this.handleSubmit}></form>
                    <div className="card-body">
                            <h5 className="card-title pb-1 text-center text-secondary">Login</h5>
                            <Input
                                form="loginForm"
                                type="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                id="email"
                                placeholder="Email"
                                required='required'
                            />
                            <Input
                                form="loginForm" 
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                id="password"
                                placeholder="Password"
                                required='required'
                                minLength='8'
                                maxLength='30'
                            />
                            <div className="form-check">
                                <input 
                                    form="loginForm"
                                    name="rememberMe" 
                                    type="checkbox" 
                                    checked={this.state.rememberMe}
                                    onChange={this.handleChange} 
                                    className="form-check-input" 
                                    id="rememberme" 
                                />
                                <label className="form-check-label" htmlFor="rememberme">remember me for a week</label>
                            </div>
                            <ForgotPasswordLink />
                            <Spinner loading={this.state.loading}></Spinner>
                            <p><small className="text-danger">{this.state.error}</small></p>
                            <button form="loginForm" className="btn btn-dark form-control">login</button>
                    </div>
                </div>
            </div>
        );
    }
}

Login.contextType = UserContext;
export default Login;