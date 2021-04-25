

function PopupWithForm(props) {


  return(
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_open' : ""}`}>
            <div className="popup__container">
              <button className="popup__close-button popup__close-button_places" aria-label="Close" type="button" onClick={props.onClose}></button>
              <h2 className="popup__intro">{props.title}</h2>
              <form className="form popup__form popup__form-places" onSubmit={props.onSubmit} action="#" noValidate>
                {props.children}
                <button className="popup__save-button" type="submit" >Save</button>
              </form>
            </div>
      </div>

  )}

export default PopupWithForm;