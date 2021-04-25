
import React from 'react';
import api from '../utils/api.js';
import Card from './Card.js';
import Header from './Header.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';



function Main(props) {

  // const [cards, setCards] = React.useState([]);

  const currentUser = React.useContext(CurrentUserContext);


  return (
    <>
    <Header>
    <Header>
        <a className="header__link_text" href="/login">Log out</a>
      </Header>
    </Header>
    <main className="main">
      <section className="profile">
        <div className="profile__img" style={{ backgroundImage: `url(${currentUser.avatar})` }}>
        <button className="profile__img-edit" aria-label="edit-picture" type="button" onClick={props.onEditAvatar}></button>
        </div>
        <div className="profile__description">
          <div className="profile__description-top">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit" aria-label="edit" type="button" onClick={props.onEditProfile}>
            </button>
          </div>
          <p className="profile__title">{currentUser.about}</p>
        </div>
        <button className="profile__add" aria-label="add" type="button" onClick={props.onAddPlace}></button>
      </section>
      <section className="places">
        <ul className="places__list">
          {props.cards.map((card) => (
            <Card
            card={card}
            key={card._id}
            onCardClick={() => {
              props.onCardClick(card);
            }}
            onCardLike={() => {
              props.onCardLike(card);
            }}
            onCardDelete={() => {
              props.onCardDelete(card);
            }}
          />
          ))}

        </ul>
      </section>
    </main>
    </>
  )
}

export default Main;