import React from 'react';


export default (props) => (
    <div className="form-group">
        <label htmlFor={props.id}>{props.label}</label>
        <input
            {...props}
            className="form-control"
        />
        {props.error && <small className="text-danger">{props.errorMsg}</small>}
    </div>
);
