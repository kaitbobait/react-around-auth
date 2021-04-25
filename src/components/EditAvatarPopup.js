
import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditAvatarPopup(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const [imageLink, setImageLink] = React.useState("");

  React.useEffect(() => {
    setImageLink(currentUser.link);
  }, [currentUser]);

  const avatarRef = React.useRef(); //returns an object

  function handleSubmit(evt) {
    // Prevent the browser from navigating to the form address
    evt.preventDefault();
    // Pass the values of the managed components to the external handler
    
    props.onUpdateAvatar(avatarRef.current.value);
  }

  return(
    <PopupWithForm name="avatar-edit" title="Change profile picture" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} >
            <input className="popup__input popup__input_avatar" id="popup__input_avatar"  ref={avatarRef} type="url" name="avatar-edit" placeholder="Image link" minLength="" maxLength="" required />
            <span className="popup__input-error" id="popup__input_avatar-error"></span>
          </PopupWithForm>

  )

}

export default EditAvatarPopup;