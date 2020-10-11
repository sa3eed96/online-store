import React from 'react';

const Spinner = (props)=> {
    return(
        <div>
            {props.loading &&
                <div className="d-flex justify-content-center">
                    <div className="spinner-border text-black mt-4" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            }
            {!props.loading &&
                <div>
                    {props.children}
                </div>
            }
        </div>
    )
};

export default Spinner;