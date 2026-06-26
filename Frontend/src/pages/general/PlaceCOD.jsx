import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../styles/placecod.css'

const PlaceCOD = () => {
  const navigate = useNavigate()
  const [address, setAddress] = useState('')

  useEffect(() => {
    // Try to fetch the user's address from backend, fallback to localStorage
    axios.get('http://localhost:3000/api/auth/user/me', { withCredentials: true })
      .then(res => setAddress(res.data?.address || ''))
      .catch(() => {
        try {
          const a = localStorage.getItem('userAddress')
          if (a) setAddress(a)
        } catch (e) { /* ignore */ }
      })

    // clear cart item and redirect after 5s
    try { localStorage.removeItem('cartItem') } catch (e) {}
    const t = setTimeout(() => navigate('/reels'), 5000)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div className="placecod-root">
      <div className="placecod-card">
        <div className="check-circle" aria-hidden>
          <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h3 className="pc-title">Order placed for</h3>
        <p className="pc-address">{address || 'Set your delivery address'}</p>
      </div>
    </div>
  )
}

export default PlaceCOD
