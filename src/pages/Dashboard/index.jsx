import React from 'react';
import Sidebar from '../../Components/Sidebar/index';
import TravelRegister from '../../Components/Travel_Register/index';

import './dashboard.css';


const Dashboard = () => {
    return (
        <div className="dashboard">
            <div className="dashboard_sidebar">
                < Sidebar />
            </div>
            <div className="dashboard_sidebar">
                < TravelRegister />
            </div> 
            <div className="dashboard_container">
                <div className="main_section">
                    <div className="cards_values">
                        <div className="cards">
                            <ul>
                                <li className="item_card"></li>
                                <li className="item_card"></li>
                                <li className="item_card"></li>
                            </ul>
                        </div>
                    </div>
                    <div className="section_details_approved">

                    </div>
                    <div className="cards_section_right">

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
