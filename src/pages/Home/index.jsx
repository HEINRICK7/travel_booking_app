import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'
import Header from '../../Components/Header';
import Footer from '../../Components/Footer'

import Image1 from '../../assets/jeri.png'
import Image2 from '../../assets/sitio.png'
import Image3 from '../../assets/fa.png'

const Home = () => {
    return (
        <div className="home">
        < Header className="header" />
        <div className="container_home">
            <div className="section_left">
                <p>Encontre as Melhores viagens e passeios para você e sua família...</p>
                <Link to="travel">
                    <button>Descubra</button>
                </Link>
                
            </div>
            <h1>Henrique</h1>
            <div className="section_right">
            <img className="Image1" src={Image1} alt="logo" />
            <img className="Image2" src={Image2} alt="logo" />
            <img className="Image3" src={Image3} alt="logo" />
            </div>
        </div>
        < Footer className="footer" />
        </div>
    );
}

export default Home;
