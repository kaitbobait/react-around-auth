//the component for user authorization with the necessary state variables

import React from "react";
import auth from "../utils/auth.js";
import { useHistory, Link } from "react-router-dom";
import Header from "./Header.js";

function Login(props) {

  //FUTURE delete this extra code --> moved to App.js
  
  // const [email, setEmail] = React.useState("");
  // const [password, setPassword] = React.useState("");
  // const [message, setMessage] = React.useState("");

  // const history = useHistory();

  // function handleEmailChange(evt) {
  //   setEmail(evt.target.value);
  // }

  // function handlePasswordChange(evt) {
  //   setPassword(evt.target.value);
  // }

  // const resetForm = () => {
  //   setEmail("");
  //   setPassword("");
  //   setMessage("");
  // };

  // function handleSubmit(evt) {
  //   // Prevent the browser from navigating to the form address

  //   evt.preventDefault();
  //   //changes state of modal to true(open)
  //   props.onSubmit();
  //   console.log(email); //works
  //   console.log(password); //works

  //   if (!email || !password) {
  //     return;
  //   }

  //   auth
  //     .authorize(email, password)
  //     .then((data) => {
  //       //console.log(data);
  //       if (!data) {
  //         throw new Error("user does not exist");
  //       }
  //       if (data.token) {
  //         // changes loggedIn to true
  //         props.handleLogin();
  //       }
  //     })
  //     .then(resetForm)
  //     .then(() => history.push("/main"))
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }


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
