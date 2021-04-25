
import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/api.js';

function AddPlacePopup(props) {


  const [cardTitle, setCardTitle] = React.useState("");
  const [cardImage, setCardImage] = React.useState("");

  function handleTitleChange(evt) {
    setCardTitle(evt.target.value)
  }

  function handleImageChange(evt) {
    setCardImage(evt.target.value);
  }

  function handleSubmit(evt) {

    evt.preventDefault();
    props.onAddPlace({
      name: cardTitle,
      link: cardImage
    });
    
  }

  return (
    <PopupWithForm name="places-edit" title="New Place" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} >
      <input className="popup__input popup__input_text_image-title" id="popup__input_text_image-title" value={cardTitle} onChange={handleTitleChange} type="text" name="places-edit" placeholder="Title" minLength="2" maxLength="30" required />
      <span className="popup__input-error" id="popup__input_text_image-title-error"></span>
      <input className="popup__input popup__input_text_image" id="popup__input_text_image" value={cardImage} onChange={handleImageChange} type="url" name="places-edit" placeholder="Image link" minLength="" maxLength="" required />
      <span className="popup__input-error" id="popup__input_text_image-error"></span>
    </PopupWithForm>
  )

}

export default AddPlacePopup;