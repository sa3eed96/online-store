import React from 'react';

const Specifications = (props)=>{

    const getSpec = (spec)=>{
        const s = spec.split(':');
        return <p><b>{s[0]}</b>: {s[1]}</p>;
    }

    return(
        props.specs.map((spec, index)=> (
            <div key={index}>
                {getSpec(spec)}                
            </div>
        ))
    );
};

export default Specifications;