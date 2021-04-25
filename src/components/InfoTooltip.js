//a modal window component that informs the user whether they've been registered successfully

import React from 'react';
import Success from "../images/success.png";

function InfoTooltip(props) {
  
  const src = Success;

  return(
    <div className={`popup ${props.isOpen ? 'popup_open' : ""}`}>
      <div className="popup__container">
        <button className="popup__close-button popup__close-button_places" aria-label="Close" type="button" onClick={props.onClose}></button>
        <img src='Success'></img>
        {props.children}
      </div>
    </div>
  )

}

export default InfoTooltip;