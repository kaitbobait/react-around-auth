//the component for user authorization with the necessary state variables

import React from "react";
import auth from "../utils/auth.js";
import { useHistory, Link } from "react-router-dom";
import Header from "./Header.js";

function Login(props) {

  return (
    <>
      <Header>
        <Link className="header__link_text" to="/signup">
          Sign up
        </Link>
      </Header>
      <div className="page page__content signIn-page">
        <div className="signIn-page__container">
          <h2 className="signIn-page__title" style={{ color: "white" }}>
            Login
          </h2>
          <form className="signIn-page__form" onSubmit={props.handleSubmit}>
            <input
              className="popup__input signIn-page__input"
              placeholder="Email"
              type="text"
              value={props.email}
              onChange={props.onEmailChange}
            ></input>
            <input
              className="popup__input signIn-page__input"
              placeholder="Password"
              type="text"
              value={props.password}
              onChange={props.onPasswordChange}
            ></input>
            <button className="signIn-page__submit" type="submit">
              Log in
            </button>
            <p className="signIn-page__link">
              <a className="signIn-page__link_text" href="/signup">
                Not a member yet? Sign up here!
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;

//export default withRouter(Login);
