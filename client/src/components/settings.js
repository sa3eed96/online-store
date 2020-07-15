import React, { Component } from 'react';
import { Link, useRouteMatch} from 'react-router-dom';

const Settings = (props)=> {
    const {url} = useRouteMatch();
    return (
        <div class="row mt-2">
            <div className="col-md-8 mx-auto bg-white">
                <div className="row">
                    <h5 className="col ml-1 mt-1">Account Settings and Information</h5>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 list-group list-group-flush">
                        <Link className="list-group-item list-group-item-action" to={`${url}/addresses`}>Addresses</Link>
                        <Link className="list-group-item list-group-item-action" to={`${url}/userinfo`}>Edit Personal Information</Link>
                        <Link className="list-group-item list-group-item-action" to={`${url}/changepassword`}>Change Password</Link>
                        <Link className="list-group-item list-group-item-action" to={`${url}/deleteaccount`}>Delete Account</Link>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default Settings;