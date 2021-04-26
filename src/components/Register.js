//the component for user registration with the necessary state variables


//the component for user authorization with the necessary state variables

import React, { useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import Header from './Header.js';
import InfoTooltip from './InfoTooltip.js';
import auth from '../utils/auth.js';

 function Register(props) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const history = useHistory;

  const handleUsernameChange = (evt) => {
    setUsername(evt.target.value);
  }

  const handlePasswordChange =(evt) => {
    setPassword(evt.target.value);
    
  }

  const resetForm = () => {
    setUsername("");
    setPassword("");
  }

  const handleSubmit = (evt) => {

    evt.preventDefault();
    //changes state of modal to true(open)
    props.onSubmit();
    auth.register(username, password)
      .then(resetForm)
      .then(() => {
        history.push('/login')
      })
      .catch((err) => {
        console.log(err);
      })
  }

  //checks to see if user already exists with a jwt
  React.useEffect(() => {
    if(localStorage.getItem('jwt')){
      history.push('/login');
    }
  }, [])

  return(
      <>
      <Header>
        <a className="header__link_text" href="/login">Sign in</a>
      </Header>
      <div className = "page page__content signIn-page">
        <div className="signIn-page__container">
          <h2 className = "signIn-page__title" style={{"color": "white"}}>Sign up</h2>
          <form className="signIn-page__form" onSubmit={handleSubmit}>
            <input className ="popup__input signIn-page__input" placeholder="Email" type="text" value={username} onChange={handleUsernameChange}></input>
            <input className ="popup__input signIn-page__input" placeholder="Password" type="text" value={password} onChange={handlePasswordChange}></input>
            <button className="signIn-page__submit" type="submit">Sign up</button>
            <p className="signIn-page__link">
              <a className="signIn-page__link_text" href="/login">
                Already a member? Log in here!
              </a>
            </p>
          </form>
          {<InfoTooltip isOpen={props.isOpen} onClose={props.onClose}></InfoTooltip>}
          </div>
      </div>
      </>

    )

 }

 export default Register;
 
 