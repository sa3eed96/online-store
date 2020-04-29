import React, { Component } from 'react';
import { Link, useRouteMatch} from 'react-router-dom';

const Settings = (props)=> {
    const {url} = useRouteMatch();
    return (
        <div>
            <h1>settings</h1>
            <Link to={`${url}/addresses`}>Addresses</Link>
            <br />  
            <Link to={`${url}/userinfo`}>Edit Personal Information</Link>
            <br />  
            <Link to={`${url}/changepassword`}>Change Password</Link>
            <br />  
            <Link to={`${url}/deleteaccount`}>Delete Account</Link>
        </div>
        
    );
}

export default Settings;