import React, { useEffect } from "react";
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  withRouter,
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute.js";
import Login from "./Login.js";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip.js";

import "../index.css";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import api from "../utils/api.js";
import auth from "../utils/auth.js";

function App() {
  const history = useHistory();

  // when mounted, userInfo will be updated with value
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  /* Card info */

  const [cards, setCards] = React.useState([]);

  // request initial cards api, then change cards state to new value
  React.useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Send a request to the API and getting the updated card data
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        // Create a new array based on the existing one and put a new card into it
        const newCards = cards.map((item) =>
          item._id === card._id ? newCard : item
        );

        // Update the state
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // cannot read property _id of undefined, deletes card on refresh
  function handleCardDelete(card) {
    // Check to see if you own the card
    // const isOwn = card.owner._id === currentUser._id;

    api
      .deleteCard(card._id)
      .then((deletedCard) => {
        // const newCards = cards.map((item) => item.owner._id === currentUser._id ? deletedCard : item);
        const oldCards = [...cards];
        const filteredCards = oldCards.filter(
          (oldCard) => oldCard._id !== card._id
        );

        // Update the card state
        setCards(filteredCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlace(card) {
    api
      .addCard(card)
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /* User info */
  function handleUpdateUser(newInfo) {
    api
      .editProfile(newInfo)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(newInfo) {
    api
      .editAvatar(newInfo)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = React.useState(
    false
  );

  function handleEditProfileClick() {
    // document.querySelector(".popup_type_profile-edit").classList.add("popup_open")
    setisEditProfilePopupOpen(true);
  }

  const [isAddPlacePopupOpen, setisisAddPlacePopupOpen] = React.useState(false);

  function handleAddPlaceClick() {
    // document.querySelector(".popup_type_places-edit").classList.add("popup_open");
    setisisAddPlacePopupOpen(true);
  }

  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = React.useState(
    false
  );

  function handleEditAvatarClick() {
    // document.querySelector(".popup_type_avatar-edit").classList.add("popup_open");
    setisEditAvatarPopupOpen(true);
  }

  const [selectedCard, setSelectedCard] = React.useState(false);

  function handleCardClick(cardInfo) {
    //should add which image address in img tag to popup
    setSelectedCard(cardInfo);
  }

  // const [isPopupOpen, setisPopupOpen] = React.useState(true);
  function closeAllPopups(evt) {
    // setisPopupOpen(false);
    setisEditProfilePopupOpen(false);
    setisEditAvatarPopupOpen(false);
    setisisAddPlacePopupOpen(false);
    setSelectedCard(false);
    setIsLoginModalOpen(false);
  }
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  function handleLogin() {
    setIsLoggedIn(true);
  }

  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
  function handleLoginModal() {
    setIsLoginModalOpen(true);
  }

  const [isSuccess, setIsSuccess] = React.useState(false);
  function handleSuccess() {
    setIsSuccess(true);
  }

  const [isFail, setIsFail] = React.useState(false);
  function handleFail() {
    setIsFail(true);
  }

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [userData, setUserData] = React.useState({});

  //why use useEffect here?
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      //console.log(localStorage.getItem('token')); undefined
      auth
        .checkToken(token)
        .then((res) => {
          //console.log(1);  //works
          //console.log(res.email); //works
          setUserData({
            ...userData,
            email: res.email,
          });
          
        })
        .then((res) => {
          console.log(res); //returns undefined
         console.log(userData);
          setIsLoggedIn(true);
        })
        .then((res) => {
          history.push('/main');
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [isLoggedIn]);


  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  //LOGIN PAGE

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setMessage("");
  };

  function handleLoginSubmit(evt) {
    // Prevent the browser from navigating to the form address

    evt.preventDefault();

    if (!email || !password) {
      return;
    }

    auth
      .authorize(email, password)
      .then((data) => {
        //console.log(data);
        if (!data) {
          //sets modal to true(to open it up)
          handleLoginModal();
          handleFail();
          console.log(isFail);
          throw new Error("user does not exist");
        }
        if (data.token) {
          // changes isLoggedIn to true
          handleLogin();
        }
      })
      .then(resetForm)
      .then(() => history.push("/main"))
      .catch((err) => {
        handleFail();
        handleLoginModal();
        console.log(err);
      });
  }

  // Register page

  const handleRegisterSubmit = (evt) => {

    evt.preventDefault();
    //does not have backend api setup, so anything passes and will result in
    //success modal -- incorrect -- fix when connect backend
    auth.register(email, password)
    .then((res) =>{
      handleLoginModal();
      handleSuccess();
    })
    .then(resetForm)
      // .then(() => {
      //   history.push('/login')
      // })
    .catch((err) => {
      console.log(err);
      handleFail();
      handleLoginModal();
      
    })
  }

  function logOut() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    history.push("/login");
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          {/* <Header isLoggedIn={isLoggedIn} /> */}
          <Switch>
            <ProtectedRoute
              path="/main"
              component={Main}
              isLoggedIn={isLoggedIn}
              email={email}
              userData={userData}
              onLogOut={logOut}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike} //why did the parameter not pass through when like this: onCardLike={()=> {handleCardLike()}}
              onCardDelete={handleCardDelete}
            ></ProtectedRoute>
            {/* <ProtectedRoute path='/main' isLoggedIn={isLoggedIn} userData={userData} component={Main, EditProfilePopup, EditAvatarPopup, ImagePopup, PopupWithForm}> */}

            <Route exact path="/">
              {isLoggedIn ? <Redirect to="/main" /> : <Redirect to="/login" />}
            </Route>
            <Route path="/login">
              <Login
                isOpen={isLoginModalOpen}
                email={email}
                userData={userData}
                onEmailChange={handleEmailChange}
                password={password}
                onPasswordChange={handlePasswordChange}
                message={message}
                handleSubmit={handleLoginSubmit}
                onClose={closeAllPopups}
                isLoggedIn={isLoggedIn}
              />
            </Route>
            <Route path="/signup">
              <Register
                isOpen={isLoginModalOpen}
                email={email}
                onEmailChange={handleEmailChange}
                password={password}
                onPasswordChange={handlePasswordChange}
                message={message}
                handleSubmit={handleRegisterSubmit}
                onClose={closeAllPopups}
              />
            </Route>
          </Switch>
          <Footer />
          <InfoTooltip isOpen={isLoginModalOpen} onClose={closeAllPopups} isSuccess={isSuccess} isFail={isFail}></InfoTooltip>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
          />
          <PopupWithForm onClose={closeAllPopups} />

          {/* Delete Popup  - doesn't work yet - need cards*/}
          <PopupWithForm
            name="delete-places"
            title="Are you sure?"
            onClose={closeAllPopups}
          ></PopupWithForm>

          <ImagePopup
            cardInfo={selectedCard}
            card={selectedCard.link}
            isOpen={selectedCard}
            onClose={closeAllPopups}
          />

        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
// "PENDING",
//         WTF,
//         GOOGLE,
//         NEED,
//         SPECS,
//         FUTURE,
//         QUESTION,
//         CREATED,
//         TEST,
//         MAKEME,
//         REFACTOR,
//         IDEA,
//         UNPLUGGED,
//         NOTE,
//         URGENT,
//         FIXME,
//         DEAD,
//         COMPLETE,
//         BUG,
//         DUE,
//         DONE,

//         "[ ]",
//         "[x]"