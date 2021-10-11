import React from 'react';
import './footer.css'
import { FiInstagram, FiFacebook } from 'react-icons/fi'
import { FaTiktok, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
    return (
        <>
            <div className="footer">
                <p>
                    @{new Date().getFullYear()} todos os direitos reservados 
                </p>
                <div className="social">
                    <ul>
                        <li><FiInstagram /></li>
                        <li><FiFacebook/></li>
                        <li><FaTiktok/></li>
                        <li><FaWhatsapp/></li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Footer;
