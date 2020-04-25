import React from 'react';

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