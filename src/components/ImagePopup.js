
// determines if the 'popup_open is added 
// specifies the image address in the <img> tag
function ImagePopup(props) {
  
  return(
    <div className={`popup popup_open_image ${props.isOpen ? 'popup_open' : ""}`}>
          <div className = "popup__container_image">
            <button className="popup__close-button popup__close-button_images" aria-label="Close" type="button" onClick={props.onClose}></button>
            <div className="popup_container_image-text">
              <img className = "popup__image" src={props.card} alt={props.cardInfo.name}  />
              <h3 className = "popup__image-title">{props.cardInfo.name}</h3>
            </div>
          </div>
    </div>
  )
}

export default ImagePopup;