import React from 'react';

import './sidebar.css'
import Logo from '../../assets/logo.svg'

import { AiOutlineMenuFold,AiOutlineMenuUnfold, AiOutlineSearch } from 'react-icons/ai'

const Sidebar = () => {
  return (
      <div className="sidebar_menu inactive" >
          <div className="top_section">
            <div className="logo_sidebar">
                <img src={Logo} alt="logo" />
            </div>
            <div className="toggle_menu_btn">
                <AiOutlineMenuFold />
            </div>
            <div className="search_controller">
                <button className={"search_btn" }>
                     <AiOutlineSearch style={{fontSize:20}} />
                </button>
               
                <input type="text" placeholder="search" />
            </div>
           
          </div>
          <div className="divider">
                
          </div>
      </div>
  );
}

export default Sidebar;