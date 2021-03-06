//a modal window component that informs the user whether they've been registered successfully

import React from 'react';
import success from "../images/success.png";
import fail from "../images/fail.png";

function InfoTooltip(props) {

  //FIXME
  
  const textSuccess = "Success! You have now been registered."
  const textFail = "Oops, something went wrong! Please try again."
  console.log(`is  modal success? ${props.isSuccess}`);
  
  return(
    <div className={`popup ${props.isOpen ? 'popup_open' : ""}`}>
      <div className="popup__container popup__container_modal">
        <button className="popup__close-button" aria-label="Close pop up" type="button" onClick={props.onClose}></button>
        <img 
        className="popup__modal-image" 
        src={!props.isSuccess ? fail : success}
        alt={!props.isSuccess ? "failed submission" : "successful submission"}
        >
        </img>
        <p className="popup__modal-text">{!props.isSuccess ? textFail : textSuccess}</p>
      </div>
    </div>
  )

}

export default InfoTooltip;