import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import eventBus from '../../utils/eventbus';

const Toast = (props)=> {
    
    const [notification, setNotification] = useState({});

    useEffect(()=>{
        eventBus.on("showNotification", (data) =>{
            setNotification(data);
            $('.toast').toast({ delay: 3000 });
            $('.toast').toast('show');
        });
    }, []);

    return(
        <div>
            {notification.body && 
                <div id="toastPos" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className={`toast-header text-white ${notification.background}`}>
                        <strong className="mr-auto">{notification.header}</strong>
                        <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="toast-body bg-light">
                        {notification.body}
                    </div>
                </div>
            }
        </div>
    );
};

export default Toast;