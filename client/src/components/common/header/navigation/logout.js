import React, {useContext} from 'react';
import { UserContext } from '../../../../contexts/user';
import axios from 'axios';
import eventBus from '../../../../utils/eventbus';
import { FaSignOutAlt } from 'react-icons/fa';

const Logout = (props)=>{
    const user = useContext(UserContext); 

    const logout = async(e)=>{
        try{
            e.preventDefault();
            await axios.get('/api/logout');
            user.dispatch({
                type: 'logout'
            });
        }catch(err){
            eventBus.dispatch("showNotification", {
                body: "error logging out, try again later",
                background: 'bg-danger',
                header: 'Error',
            })
        }
    }

    return (
        <a className="nav-link" href="#" onClick={logout} ><FaSignOutAlt /> Logout</a>
    );
};

export default Logout;