import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserContext  = React.createContext(null);
const intialState = {
    isAuthenticated: false,
};



const reduce = (state, action)=> {
    switch (action.type) {
        case 'login':
            return{
                isAuthenticated: true,
                user: action.payload
            }
        case 'register':
            return{
                isAuthenticated: true,
                user: action.payload
            }
        case 'infoUpdate':
            return{
                isAuthenticated: true,
                user: action.payload
            }
        default:
            return{
                isAuthenticated:false,
                user: null,
            };
    }
};

const UserContextProvider = (props)=>{
    const [state, dispatch] = React.useReducer(reduce, intialState);
    const [loading, setLoading] = React.useState(true);

    useEffect(()=>{
        const getUser = async ()=>{
            try{
                const {data} = await axios.get('/api/getloggedin');
                if(data.user){
                    dispatch({
                        type:'login',
                        payload: data.user
                    });
                }
                setLoading(false);
            }catch(err){
                setLoading(false); 
                return;
            }
        }
        getUser();
    }, []);

    return (
        <div>
            {loading &&
                <div className="d-flex justify-content-center">
                    <div className="spinner-border text-primary mt-4" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            }
            {!loading &&         
                <UserContext.Provider
                    value={{
                        state,
                        dispatch
                    }}
                >
                    {props.children}
                </UserContext.Provider>
            }
        </div>
    );
};

export {
    UserContext,
    UserContextProvider,
};