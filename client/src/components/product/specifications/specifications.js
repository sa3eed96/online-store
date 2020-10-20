import React from 'react';
import './Specification.scss';

const Specifications = (props)=>{

    const getSpec = (spec)=>{
        const s = spec.split(':');
        return <p><span>{s[0]}</span>: {s[1]}</p>;
    }

    return(
        <div id="specsContainer">
        {props.specs.map((spec, index)=> (
            <div className="specs" key={index}>
                {getSpec(spec)}                
            </div>
        ))}
        </div>
    );
};

export default Specifications;