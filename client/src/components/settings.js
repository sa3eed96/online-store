import React, { Component } from 'react';
import { Link, useRouteMatch} from 'react-router-dom';

const Settings = (props)=> {
    const {url} = useRouteMatch();
    return (
        <div>
            <h1>settings</h1>
            <Link to={`${url}/addresses`}>Addresses</Link>
        </div>
        
    );
}

export default Settings;