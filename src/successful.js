import React from "react";
import "./successful.css"
import { useNavigate } from 'react-router-dom';

import{ useEffect, useState } from "react";


const Popup = () => {
    const navigate = useNavigate();
    
    
    return (
        <div>
            <div className="dropdown-container">
                <div className="dropdown-paper">
                    <h1 className="drop-down-header">Recharge Successful !!!</h1>
                    <div className="drop-image-div"><img className="drop-image" src="/static/images/recharge.gif" /></div>
                    <div className="drop-down-items" onClick={ () => navigate('/')} ><button className="Popup-okButton"> ok </button></div>

                    
                </div>
            </div>
        </div>
        
    )
}

export default Popup