
//the component for user authorization with the necessary state variables

import React from 'react';
import auth from '../utils/auth.js';
import {useHistory} from 'react-router-dom';
import Header from './Header.js';


 function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const history = useHistory();

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt){
    setPassword(evt.target.value);
  }

  const resetForm = () => {
    setEmail("");
    setPassword("");
  }

  function handleSubmit(evt) {
    // Prevent the browser from navigating to the form address
    
    evt.preventDefault();
    //changes state of modal to true(open)
    props.onSubmit();
    auth.authorize(email, password)
    .then((data) => {
      if(data.jwt){
        // changes loggedIn to true
        props.handleLogin();
      }
    })
    .then(resetForm)
    .then(() => history.push('/users/me'))
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
        <a className="header__link_text" href="/signup">Sign up</a>
      </Header>
      <div className = "page page__content signIn-page">
        <div className="signIn-page__container">
          <h2 className = "signIn-page__title" style={{"color": "white"}}>Login</h2>
          <form className="signIn-page__form" onSubmit={handleSubmit}>
            <input className ="popup__input signIn-page__input" placeholder="Email" type="text" value={email} onChange={handleEmailChange}></input>
            <input className ="popup__input signIn-page__input" placeholder="Password" type="text" value={password} onChange={handlePasswordChange}></input>
            <button className="signIn-page__submit" type="submit">Log in</button>
            <p className="signIn-page__link">
              <a className="signIn-page__link_text" href="/signup">
                Not a member yet? Sign up here!
              </a>
            </p>
          </form>
          </div>
      </div>
      </>


    )
  }

export default Login;


 //export default withRouter(Login);
 