import React,{ useState} from 'react';

import './sidebar.css'
import Logo from '../../assets/logo.svg'

import { AiOutlineMenuFold,AiOutlineMenuUnfold, AiOutlineSearch } from 'react-icons/ai'

const Sidebar = () => {
    const [ inactive, setInactive] = useState(false)
  return (
      <div className={`sidebar_menu ${inactive ? "inactive" : ""}`} >
          <div className="top_section">
            <div className="logo_sidebar">
                <img src={Logo} alt="logo" />
            </div>
            <div onClick={() => {setInactive(!inactive)}} className="toggle_menu_btn">
                {!inactive ? <AiOutlineMenuFold /> : <AiOutlineMenuUnfold/>}
            </div>
            <div className="search_controller">
                <button className="search_btn" >
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