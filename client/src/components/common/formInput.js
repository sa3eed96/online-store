import React from 'react';


export default (props) => (
    <div>
        <label htmlFor={props.id}>{props.label}</label>
        <input
            name={props.name}
            value={props.value}
            onChange={props.handleOnChange}
            id={props.id}
            type={props.type}
            {...props.validators}
        />
    </div>
);
