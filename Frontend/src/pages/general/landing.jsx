import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/homepage.css'

const Landing = () => {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(null) // 'signup' | 'login' | null

  function openMenu(which) {
    setMenuOpen(prev => (prev === which ? null : which))
  }

  function handleSelect(action, role) {
    // action: 'signup' | 'login'
    // role: 'user' | 'food-partner'
    setMenuOpen(null)
    const base = action === 'signup' ? '/user/register' : '/user/login'

    if (role === 'user') {
      navigate(action === 'signup' ? '/user/register' : '/user/login')
      return
    }

    if (role === 'food-partner') {
      navigate(action === 'signup' ? '/food-partner/register' : '/food-partner/login')
      return
    }
  }

  return (
    <div className="landing-hero">
      <video
        className="hero-video"
        src="https://ik.imagekit.io/jrr107twa/2627bbed9d6c068e50d2aadcca11ddbb1743095925.mp4?updatedAt=1761675046869"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="hero-overlay" />

      <header className="hero-header">
        <div className="auth-buttons">
          <div className="auth-button">
            <button className="btn-outline" onClick={() => openMenu('signup')}>Sign Up</button>
            {menuOpen === 'signup' && (
              <ul className="auth-menu">
                <li onClick={() => handleSelect('signup', 'user')}>User</li>
                <li onClick={() => handleSelect('signup', 'food-partner')}>Food Partner</li>
              </ul>
            )}
          </div>

          <div className="auth-button">
            <button className="btn-outline" onClick={() => openMenu('login')}>Login</button>
            {menuOpen === 'login' && (
              <ul className="auth-menu">
                <li onClick={() => handleSelect('login', 'user')}>User</li>
                <li onClick={() => handleSelect('login', 'food-partner')}>Food Partner</li>
              </ul>
            )}
          </div>
        </div>
      </header>

      <main className="hero-content">
        <h1 className="brand">ReelBite</h1>
        <h2 className="tagline">Rediscover how you
          <br />discover food</h2>
        <p className="sub">Bringing food lovers and creators together
          <br />Cook. Capture. Connect</p>
      </main>
    </div>
  )
}

export default Landing
