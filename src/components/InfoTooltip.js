//a modal window component that informs the user whether they've been registered successfully

import React from 'react';
import Success from "../images/success.png";

function InfoTooltip(props) {
  
  

  return(
    <div className={`popup ${props.isOpen ? 'popup_open' : ""}`}>
      <div className="popup__container">
        <button className="popup__close-button" aria-label="Close pop up" type="button" onClick={props.isClose}></button>
        <img src='Success'></img>
        {props.children}
      </div>
    </div>
  )

}

export default InfoTooltip;