import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './styles/Navbar.css'

const Navbar = () => {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🎬</span>
          <span className="logo-text">MovieFlix</span>
        </Link>
        <div className="navbar-menu">
          <Link to="/" className={`navbar-link ${pathname === '/' ? 'active' : ''}`}>
            <span>Home</span>
          </Link>
          <Link to="/favorites" className={`navbar-link ${pathname === '/favorites' ? 'active' : ''}`}>
            <span>My List</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
