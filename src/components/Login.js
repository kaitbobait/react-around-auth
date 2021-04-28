
//the component for user authorization with the necessary state variables

import React from 'react';
import auth from '../utils/auth.js';
import {useHistory} from 'react-router-dom';
import Header from './Header.js';


 function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");

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
    setMessage("");
  }

  function handleSubmit(evt) {
    // Prevent the browser from navigating to the form address
    
    evt.preventDefault();
    //changes state of modal to true(open)
    props.onSubmit();
    console.log(email); //works
    console.log(password); //works
    
    if(!email || !password){
      return;
    }

    auth.authorize(email, password)
    .then((data) => {
      //console.log(data);
      if(!data){
        throw new Error('user does not exist');
      }
      if(data.token){
        // changes loggedIn to true
        props.handleLogin();
      }
    })
    .then(resetForm)
    .then(() => history.push('/main'))
    .catch((err) => {
      console.log(err);
    })
  }

  //checks to see if user already exists with a jwt
  // React.useEffect(() => {
  //   if(localStorage.getItem('token')){
  //     history.push('/main');
  //   }
  // }, [props.isLoggedIn]);

  console.log(props.isLoggedIn); //true

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
 