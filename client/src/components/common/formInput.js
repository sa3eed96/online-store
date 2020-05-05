import React from 'react';


export default (props) => (
    <div>
        <label htmlFor={props.id}>{props.label}</label>
        <input
            {...props}
        />
    </div>
);
