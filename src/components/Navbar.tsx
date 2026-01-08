import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  const { pathname } = useLocation()
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo"><span className="logo-text">Netflix Clone</span></Link>
        <div className="navbar-menu">
          <Link to="/" className={`navbar-link ${pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/favorites" className={`navbar-link ${pathname === '/favorites' ? 'active' : ''}`}>Favorites</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

