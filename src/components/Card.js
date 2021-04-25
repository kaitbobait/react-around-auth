
import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);


  // Checking if you are the owner of the current card
  const isOwn =  props.card.owner._id === currentUser._id;
  // Creating a variable which you'll then set in 'className' for the delete button
  //not working, tried to add both so it wouldn't be just an empty button
  const cardDeleteButtonClassName = (`${isOwn ? 'places__delete-button_visible' : 'places__delete-button_visible places__delete-button_hidden'}`);
  // <button className = {`${cardDeleteButtonClassName}`}></button>
  

  // Chck if the card was liked by the current user
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  // Create a variable which you then set in 'className' for the like button
  const cardLikeButtonClassName = (`${isLiked ? 'places__heart-button places__heart-button_active' : 'places__heart-button'}`);


  //says onCardLike is not a function, when click on the heart button
  function handleLikeClick(card) {
    props.onCardLike(card);
    
  }

  function handleDeleteClick(card) {
    props.onCardDelete(card);
  }


  return (
    <li className="places__item">
                    <img className="places__img" src={props.card.link} onClick={() => {props.onCardClick(props.card)}} alt={props.card.name} />
                    <button className = {`${cardDeleteButtonClassName}`} onClick={() => {handleDeleteClick(props.card)}} ></button>
                    <div className="places__title-section">
                      <h2 className="places__name">{props.card.name}</h2>
                      <div className = "places__heart">
                        <button 
                          className={`${cardLikeButtonClassName}`} 
                          onClick={() => {
                            handleLikeClick(props.card);
                          }} 
                          aria-label="like" 
                          type="button"></button>
                        <div className = "places__heart-count">{props.card.likes.length}</div>
                      </div>
                    </div>
    </li>
  )

}

export default Card;