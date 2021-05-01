import logo from '../images/logo-svg.svg';

function Header(props) {

  return(
    <header className="header">
      <img className="logo" src={logo} alt="Around logo" />
      <nav className = "header__link">
        {props.children}
      </nav>
    </header>
  )
}

export default Header;