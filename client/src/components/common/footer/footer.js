import React from 'react';
import { FaGithub } from 'react-icons/fa';
import './footer.scss';

const Footer = (props)=>{
    return(
        <div className="footer">
            <div className="lineBreak"></div>
            <div>
                {/* <div className="row footerLinks">

                </div> */}
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