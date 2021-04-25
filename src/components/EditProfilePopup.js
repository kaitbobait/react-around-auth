
import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [about, setAbout] = React.useState("");

  // After loading the current user from the API
  // their data will be used in managed components.
  // why when commented out, it takes out the values in the input field
  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser]);


  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleAboutChange(evt) {
    setAbout(evt.target.value);
  }

  function handleSubmit(evt) {
    // Prevent the browser from navigating to the form address
    evt.preventDefault();

    // Pass the values of the managed components to the external handler
    props.onUpdateUser({
      name,
      about
    });
  }

  return (


    <PopupWithForm name="profile-edit" title="Edit Profile" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input className="popup__input popup__input_text_name" id="input_text_name" value={name} onChange={handleNameChange} type="text" name="profile-edit" placeholder="name" minLength="2" maxLength="40" required />
      <span className="popup__input-error" id="input_text_name-error"></span>
      <input className="popup__input popup__input_text_title" id="input_text_title" value={about} onChange={handleAboutChange} type="text" name="profile-edit" placeholder="Occupation" minLength="2" maxLength="200" required />
      <span className="popup__input-error" id="input_text_title-error"></span>
    </PopupWithForm>


  )
}

export default EditProfilePopup;
