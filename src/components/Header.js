import logo from '../images/logo-svg.svg';

//MAKEME 
// connect log out feature to log out function in App.js

function Header(props) {

  return(
    <header className="header">
      <img className="logo" src={logo} alt="Around logo" />
      <p className = "header__link">
        {props.children}
      </p>
    </header>
  )
}

export default Header;