import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Header = (props) => {
    const activeStyle = { color: "#F15B2A"};

    const logout = async(e)=>{
        try{
            e.preventDefault();
            await axios.get('/api/logout');
            props.user.dispatch({
                type: 'logout'
            });
        }catch(err){
            alert(err);
        }
    }

    return(
        <nav>
                <NavLink to="/" activeStyle={activeStyle} exact>Home</NavLink>{'|'}
                {!props.user.state.isAuthenticated &&
                    <div style={{display:'inline'}}>
                        <NavLink to="/login" activeStyle={activeStyle} >Login</NavLink> |
                        <NavLink to="/register" activeStyle={activeStyle} >Register</NavLink>
                    </div>
                }
                {props.user.state.isAuthenticated &&
                    <div style={{display:'inline'}}>
                        <NavLink to="/cart" activeStyle={activeStyle}>Cart</NavLink> |
                        <NavLink to="/settings" activeStyle={activeStyle}> settings</NavLink> |
                        <a href="#" onClick={logout} >Logout</a>
                    </div>
                }
                {props.user.state.isAuthenticated &&
                    <h6 style={{float: 'right'}}>Hello {props.user.state.user.fullName}</h6>
                }
        </nav>
    );

}
export default Header;