import React,{ useState} from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';
import Logo from '../../assets/logo.svg';

import { AiOutlineMenuFold, 
    AiOutlineMenuUnfold,
     AiOutlineSearch,

     AiOutlineDashboard 
    } from 'react-icons/ai'
import { MdOutlineCardTravel } from 'react-icons/md'   

import {Tooltip } from 'antd';


const Sidebar = (props) => {
    const [ inactive, setInactive] = useState(true);
    
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
                      <Link to="dashboard" className="menu_item">
                          <div className="menu_icon">  
                            <Tooltip title="Dashboard" > 
                         
                               <AiOutlineDashboard  /> 
                            </Tooltip>
                          </div>
                        
                            <span>Dashboard</span>
                        
                      </Link>
                  </li>
                  <li>
                      <div className="menu_item">
                          <div className="menu_icon" onClick={props.showDrawer}>
                            <Tooltip title="Cadastrar Pacotes" > 
                               <MdOutlineCardTravel />
                            </Tooltip>   
                          </div>
                         
                         <span>Cadastrar Pacotes</span>
                      </div>
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