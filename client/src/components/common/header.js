import React from 'react';
import { Link } from 'react-router-dom';
import Categories from './categories';
import SearchBar from './searchbar';
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
        <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
            <a className="navbar-brand" href="#"><span className="text-primary">O</span>nline <span className="text-primary">S</span>tore</a>
            <SearchBar />
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Homepage</Link>
                    </li>
                    {!props.user.state.isAuthenticated &&
                        <li className="nav-item">
                            <Link className="nav-link" to="/login" >Login</Link> 
                        </li>
                    }
                    {!props.user.state.isAuthenticated &&
                        <li className="nav-item">
                            <Link  className="nav-link" to="/register" >Register</Link>
                        </li>
                    }
                    {props.user.state.isAuthenticated &&
                        <li className="nav-item">
                            <Link className="nav-link" to="/cart">Cart</Link> 
                        </li>
                    }
                    {props.user.state.isAuthenticated &&
                        <li className="nav-item">
                            <Link className="nav-link" to="/purchases">Purchases</Link> 
                        </li>
                    }
                    {props.user.state.isAuthenticated &&
                        <li className="nav-item">
                            <Link className="nav-link" to="/settings">{props.user.state.user.firstName}</Link> 
                        </li>
                    }
                    {props.user.state.isAuthenticated &&
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={logout} >Logout</a>
                        </li>
                    }
                </ul>
            </div>
        </nav>
        <nav className="navbar navbar-expand-lg navbar-light m-0 p-0"  style={{backgroundColor: "#F5F5F5"}}>
            <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedCategories" aria-controls="navbarSupportedCategories" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedCategories">
                <ul className="navbar-nav mr-auto">
                    <Categories />
                </ul>
            </div>
        </nav>
        </div>
    );

}
export default Header;