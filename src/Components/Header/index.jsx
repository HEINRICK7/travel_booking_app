import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import "./header.css"
import Logo from '../../assets/logo.svg';

import { FiMenu, FiX } from 'react-icons/fi';

const Header = () => {

    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
      if (window.innerWidth <= 960) {
        setButton(false);
      } else {
        setButton(true);
      }
    };

    useEffect(() => {
      showButton();
    }, []);

    window.addEventListener('resize', showButton);

    return (
        <>
            <div className="container_header">
                
                <Link to='/' className='logo' onClick={closeMobileMenu}>
                    <img src={Logo} style={{ width: 86, borderRadius: '50%' }} alt="logo" />
                    <p>D&E Turismo</p>
                </Link>

                <div className="menu_icon" onClick={handleClick}>
                    {click ? <FiX /> : <FiMenu />}
                </div>
                <div className="list">
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li>
                            Serviços
                        </li>
                        <li>
                            Contatos
                        </li>
                        <li>
                            Sobre
                        </li>
                        <li className="signin_signup">
                            <button className="signup">Sign Up</button>
                        </li>
                        <li className="signin_signup">
                            <button className="signin">Login</button>
                        </li>

                    </ul>
                </div>

            </div>
        </>
    );
}

export default Header;
