import React from 'react';
import Input from '../common/formInput';
import ForgotPasswordLink from './forgotpasswordlink';
import axios from 'axios';
import Spinner from '../common/spinner';

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
            this.props.user.dispatch({
                type: 'login',
                payload: user.data.user,
            });
            if(this.props.history.length > 1){
                this.props.history.goBack();
            }else{
                this.props.history.replace('/');
            }
            
        }catch(err){
            this.setState({loading: false});
            this.setState({error: err.response.data});
        }
    }
    
    render(){
        return(
            <div className="row">
                <div className="card mx-auto col-sm-10 col-md-3 border border-radius p-4 mt-4">
                    <form className="card-body" onSubmit={this.handleSubmit}>
                            <h5 className="card-title pb-1 text-center text-secondary">Login</h5>
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
                            <div className="form-check">
                                <input 
                                    name="rememberMe" 
                                    type="checkbox" 
                                    checked={this.state.rememberMe}
                                    onChange={this.handleChange} 
                                    className="form-check-input" 
                                    id="rememberme" 
                                />
                                <label className="form-check-label" htmlFor="rememberme">remember me for a week</label>
                            </div>
                            <ForgotPasswordLink showNotifiction={this.props.showNotifiction} />
                            <Spinner loading={this.state.loading}></Spinner>
                            <p><small style={{color: 'red'}}>{this.state.error}</small></p>
                            <button className="btn btn-primary form-control">login</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;