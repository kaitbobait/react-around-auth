//the component for user registration with the necessary state variables


//the component for user authorization with the necessary state variables

import React, { useEffect } from 'react';
import {useHistory, Link} from 'react-router-dom';
import Header from './Header.js';

 function Register(props) {

  return(
      <>
      <Header>
        <Link className="header__link_text" to="/login">Log in</Link>
      </Header>
      <div className = "page page__content signIn-page">
        <div className="signIn-page__container">
          <h2 className = "signIn-page__title" style={{"color": "white"}}>Sign up</h2>
          <form className="signIn-page__form" onSubmit={props.handleSubmit}>
            <input className ="popup__input signIn-page__input" placeholder="Email" type="text" value={props.email} onChange={props.onEmailChange}></input>
            <input className ="popup__input signIn-page__input" placeholder="Password" type="text" value={props.password} onChange={props.onPasswordChange}></input>
            <button className="signIn-page__submit" type="submit">Sign up</button>
            <p className="signIn-page__link">
              <a className="signIn-page__link_text" href="/login">
                Already a member? Log in here!
              </a>
            </p>
          </form>
          </div>
      </div>
      </>

    )

 }

 export default Register;
 
 