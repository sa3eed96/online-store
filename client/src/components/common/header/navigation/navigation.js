import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../../contexts/user';
import Logout from './logout';
import SearchBar from './searchbar/searchbar';
import Categories from './categories/categories';
import './navigation.scss';
import $ from 'jquery';

import { FaUserCircle, FaShoppingCart, FaSignInAlt, FaFile, FaBars } from 'react-icons/fa';

const Navigation = (props) => {
    const user = useContext(UserContext);

    const collapseBar = (e)=>{
        $('#navbarSupportedCategories').collapse('hide');
    };

    return(
        <div className="navigation">

            <div className="nav upperNav">
                <div>
                    {!user.state.isAuthenticated &&
                        <div>
                            <Link onClick={collapseBar} className="nav-link" to="/login" ><FaSignInAlt /> Login</Link> 
                            <Link onClick={collapseBar} className="nav-link" to="/register" ><FaFile /> Register</Link>
                        </div>
                    }
                    {user.state.isAuthenticated &&
                        <div>
                            <Link onClick={collapseBar} className="nav-link" to="/settings"><FaUserCircle /> {user.state.user.firstName}</Link>                   
                            <Logout />
                        </div>
                    }
                </div>
                <div>
                    {user.state.isAuthenticated &&
                        <div>
                            <Link onClick={collapseBar} className="nav-link" to="/cart"><FaShoppingCart /></Link>
                        </div>
                    }
                </div>
            </div>

            <div className="lineBreak">&nbsp;</div>
            
            <div className="nav lowerNav">
                <div className="logoCategories">
                <Link onClick={collapseBar} to="/"> <h3 className="logo"><span>O</span>nline <span>S</span>tore</h3></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedCategories" aria-controls="navbarSupportedCategories" aria-expanded="false" aria-label="Toggle navigation">
                        <FaBars />
                    </button>
                </div>
                <div>
                    <SearchBar />
                </div>
            </div>

            <div className="container-fluid">
                <nav className="navbar navbar-expand-md bg-white" >
                    <div className="collapse navbar-collapse" id="navbarSupportedCategories">
                        <Categories />  
                    </div>
                </nav>
            </div>

        </div>
    );
}
export default Navigation;