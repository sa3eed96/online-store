import React, { useEffect } from 'react';
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
        default:
            return{
                isAuthenticated:false,
                user: null,
            };
    }
};

const UserContextProvider = (props)=>{
    const [state, dispatch] = React.useReducer(reduce, intialState);

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
            }catch(err){
                return;
            }
        }
        getUser();
    }, []);

    return (
        <UserContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export {
    UserContext,
    UserContextProvider,
};