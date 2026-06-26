import React from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import '../styles/bottom-nav.css'

const BottomNav = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const isOnReels = location.pathname.startsWith('/reels') || location.pathname === '/'

  const onFeedClick = (e) => {
    e.preventDefault()
    if (location.pathname.startsWith('/reels')) {
      // reload current reels page
      window.location.reload()
      return
    }
    navigate('/reels')
  }

  return (
    <nav className="bottom-nav" role="navigation" aria-label="Bottom">
      <div className="bottom-nav__inner">
        <button onClick={onFeedClick} className={`bottom-nav__item ${isOnReels ? 'is-active' : ''}`} aria-label="Feed">
          <span className="bottom-nav__icon" aria-hidden="true">
            {/* Home icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill={isOnReels ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            </svg>
          </span>
          <span className="bottom-nav__label">Home</span>
        </button>

        <NavLink to="/saved" className={({ isActive }) => `bottom-nav__item ${isActive ? 'is-active' : ''}`}>
          <span className="bottom-nav__icon" aria-hidden="true">
            {/* Bookmark icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill={isOnReels ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
          </span>
          <span className="bottom-nav__label">Saved</span>
        </NavLink>

        <NavLink to="/profile" className={({ isActive }) => `bottom-nav__item ${isActive ? 'is-active' : ''}`}>
          <span className="bottom-nav__icon" aria-hidden="true">
            {/* Profile icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill={isOnReels ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </span>
          <span className="bottom-nav__label">Profile</span>
        </NavLink>
      </div>
    </nav>
  )
}

export default BottomNav