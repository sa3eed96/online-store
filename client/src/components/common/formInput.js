import React from 'react';
import './forminput/forminput.scss';

export default (props) => (
    <div>
        <input
            {...props}
            className="formInput"
        />
        {props.error === "true" && <small className="text-danger">{props.errormsg}</small>}
    </div>
);
