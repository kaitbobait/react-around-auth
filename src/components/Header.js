import logo from '../images/logo-svg.svg';

//{!props.isLoggedIn && <a className="header__link_text" href="/register">Sign up</a>}
//TODO change text to Sign in when on register page and link to login
function Header(props) {

  return(
    <header className="header">
      {/* <img className="logo" src="<%=require("./images/logo-svg.svg")%>" alt="Around logo"> */}
      <img className="logo" src={logo} alt="Around logo" />
      <p className = "header__link">
        {props.children}
      </p>
    </header>
  )
}

export default Header;