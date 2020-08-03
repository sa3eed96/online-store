import React, { useEffect } from 'react';
import $ from 'jquery';

const Toast = (props)=> {
    
    useEffect(()=>{
        if(props.body){
            $('.toast').toast({ delay: 3000 });
            $('.toast').toast('show');
        }
    }, [props.show]);

    return(
        <div>
            {props.body && 
                <div id="toastPos" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className={`toast-header text-white ${props.background}`}>
                        <strong className="mr-auto">{props.header}</strong>
                        <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="toast-body bg-light">
                        {props.body}
                    </div>
                </div>
            }
        </div>
    );
};

export default Toast;