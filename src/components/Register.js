//the component for user registration with the necessary state variables


//the component for user authorization with the necessary state variables

import React, { useEffect } from 'react';
import {useHistory, Link} from 'react-router-dom';
import Header from './Header.js';
import InfoTooltip from './InfoTooltip.js';
import auth from '../utils/auth.js';

 function Register(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const history = useHistory();

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  }

  const handlePasswordChange =(evt) => {
    setPassword(evt.target.value);
    
  }


//already have in App.js
  const resetForm = () => {
    setEmail("");
    setPassword("");
  }

  const handleSubmit = (evt) => {

    evt.preventDefault();
    //changes state of modal to true(open)
    props.onSubmit();
    auth.register(email, password)
      .then(resetForm)
      .then(() => {
        history.push('/login')
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return(
      <>
      <Header>
        <Link className="header__link_text" to="/login">Sign in</Link>
      </Header>
      <div className = "page page__content signIn-page">
        <div className="signIn-page__container">
          <h2 className = "signIn-page__title" style={{"color": "white"}}>Sign up</h2>
          <form className="signIn-page__form" onSubmit={handleSubmit}>
            <input className ="popup__input signIn-page__input" placeholder="Email" type="text" value={email} onChange={handleEmailChange}></input>
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
 
 