import React, {useContext} from 'react';
import { FaGithub } from 'react-icons/fa';
import './footer.scss';//sdsa
import { Link } from 'react-router-dom';
import { UserContext } from '../../../contexts/user';


const Footer = (props)=>{
    const user = useContext(UserContext);
    return(
        <div className="footer">
            <div className="lineBreak"></div>
            <div>
                <div className="row footerLinks justify-content-center">
                    <div className="col-md-4 col-xs-10">
                        {!user.state.isAuthenticated &&
                            <div className="firstRow">
                                <Link className="nav-link" to="/" >Home</Link> 
                                <Link className="nav-link" to="/login" >Login</Link> 
                                <Link className="nav-link" to="/register" >Register</Link>
                            </div>
                        }
                    </div>
                </div>
                <div className="row no-gutters justify-content-around footerContactInfo">
                    <div className="col-4">
                        <p>Cairo, Egypt</p>
                    </div>
                    <div className="col-4">
                        <p>01115728555</p>
                    </div>
                    <div className="col-4">
                        <p>saied.alabbar@gmail.com</p>
                    </div>
                </div>
                <div className="row justify-content-center footerSocialInfo">
                    <div className="col-1">
                        <a href="www.github.com/sa3eed96/onlin-store" className="githubLink"><FaGithub /></a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;