import React, { Component } from 'react';
import { Link, useRouteMatch} from 'react-router-dom';

const Settings = (props)=> {
    const {url} = useRouteMatch();
    return (
        <div class="row">
            <h1 className="col-12 mb-4">Account Settings and Information</h1>
            <div class="col-12 list-group list-group-flush">
                <Link className="list-group-item list-group-item-action" to={`${url}/addresses`}>Addresses</Link>
                <Link className="list-group-item list-group-item-action" to={`${url}/userinfo`}>Edit Personal Information</Link>
                <Link className="list-group-item list-group-item-action" to={`${url}/changepassword`}>Change Password</Link>
                <Link className="list-group-item list-group-item-action" to={`${url}/deleteaccount`}>Delete Account</Link>
            </div>
        </div>
        
    );
}

export default Settings;