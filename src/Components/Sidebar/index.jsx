import React,{ useState} from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';
import Logo from '../../assets/logo.svg';

import { AiOutlineMenuFold, 
    AiOutlineMenuUnfold,
     AiOutlineSearch,
     AiOutlineIdcard,
     AiOutlineDashboard 
    } from 'react-icons/ai'

const Sidebar = () => {
    const [ inactive, setInactive] = useState(true)
  return (
      <div className={`sidebar_menu ${inactive ? "inactive" : ""}`} >
          <div className="top_section">
            <div className="logo_sidebar">
                <img src={Logo} alt="logo" />
            </div>
            <div onClick={() => {setInactive(!inactive)}} className="toggle_menu_btn">
                {!inactive ? <AiOutlineMenuFold style={{color:'#FFFFFF'}}/> : <AiOutlineMenuUnfold style={{color:'#0d649a'}}/>}
            </div>
            <div className="search_controller">
                <button className="search_btn" >
                     <AiOutlineSearch style={{fontSize:20}} />
                </button>
               
                <input type="text" placeholder="search" />
            </div>
           
          </div>
          <div className="divider"></div>
          <div className="main_menu">
              <ul>
                  <li>
                      <Link className="menu_item">
                          <div className="menu_icon">
                               <AiOutlineDashboard  />
                          </div>
                         
                         <span>Dashboard</span>
                      </Link>
                  </li>
                  <li>
                      <Link className="menu_item">
                          <div className="menu_icon">
                               <AiOutlineIdcard  />
                          </div>
                         
                         <span>Content</span>
                      </Link>
                  </li>
                  <li>
                      <Link className="menu_item">
                          <div className="menu_icon">
                               <AiOutlineDashboard  />
                          </div>
                         
                         <span>Dashboard</span>
                      </Link>
                  </li>
                  <li>
                      <Link className="menu_item">
                          <div className="menu_icon">
                               <AiOutlineDashboard  />
                          </div>
                         
                         <span>Dashboard</span>
                      </Link>
                  </li>
                  
              </ul>
          </div>
      </div>
  );
}

export default Sidebar;