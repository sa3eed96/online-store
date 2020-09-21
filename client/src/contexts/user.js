import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/common/spinner';

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
            <Spinner loading={loading}>      
                <UserContext.Provider
                    value={{
                        state,
                        dispatch
                    }}
                >
                    {props.children}
                </UserContext.Provider>
            </Spinner>
        </div>
    );
};

export {
    UserContext,
    UserContextProvider,
};