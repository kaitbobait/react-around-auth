
const settingsObject = {
  formSelector: ".form",
  inputSelector: ".popup__input",
  submitButton: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input-error",
  inputBorderError: "popup__input-error_color"
};

const imagesExit = document.querySelector('.popup__close-button_images');
const placesForm = document.querySelector('.popup__form-places');
const popup = document.querySelector('.popup'); /*popup has display: none*/
const newName = document.querySelector('.popup__input_text_name'); /*name written in the name input */
const newTitle = document.querySelector('.popup__input_text_title'); /*title written in the title input */
const addPlacesExit = document.querySelector('.popup__close-button_places'); //close button
const addPlaceButton = document.querySelector('.profile__add'); //add button


/*profile section*/
const editButton = document.querySelector('.profile__edit'); //edit profile button
const profileName = document.querySelector('.profile__name'); //profile name
const profileTitle = document.querySelector('.profile__title'); //profile description
const profileExit = document.querySelector('.popup__close-button_profile'); //close button

const editAvatar = document.querySelector('.profile__img-edit'); // pencil icon on hover of avatar
const avatarClose = document.querySelector('.popup__close-button_avatar');

const heartButton = document.querySelector('.places__heart-button');



export { settingsObject, imagesExit, placesForm, popup, newName, newTitle, addPlacesExit, addPlaceButton, editButton, profileName, profileTitle, profileExit, editAvatar, avatarClose, heartButton };