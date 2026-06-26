import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/cart.css'
import '../../styles/reels.css'
import axios from 'axios'

// Cart shows a single item (for this exercise) — it reads a stored cart item from
// localStorage under `cartItem` if present, otherwise falls back to a sample.
const fallbackItem = {
  _id: 'demo-1',
  name: 'Paneer Butter Masala',
  price: 199.0,
}

const Cart = () => {
  const navigate = useNavigate()
  const [item, setItem] = useState(fallbackItem)
  const [qty, setQty] = useState(1)
  const [userAddress, setUserAddress] = useState('')

  useEffect(() => {
    // load cart item from localStorage
    try {
      const raw = localStorage.getItem('cartItem')
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed && parsed.name) setItem(parsed)
      }
    } catch (e) {
      // ignore and use fallback
    }

    // Prefer fetching the logged-in user's address (like Saved.jsx/ReelFeed)
    axios.get('http://localhost:3000/api/auth/user/me', { withCredentials: true })
      .then(res => {
        setUserAddress(res.data?.address || '')
      })
      .catch(() => {
        // fallback to any cached value in localStorage
        try {
          const a = localStorage.getItem('userAddress')
          if (a) setUserAddress(a)
        } catch (e) { /* ignore */ }
      })
  }, [])

  const increment = () => setQty((q) => q + 1)
  const decrement = () => setQty((q) => (q > 1 ? q - 1 : 1))

  const unitPrice = Number(item.price || 0)
  const total = (unitPrice * qty)

  return (
    <div className="cart-page-container">
      {/* Reuse the same address bar used in ReelFeed/Saved for consistent placement */}
      <div className="address-bar">
        <div className="location-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 21s-8-4.5-8-11a8 8 0 1 1 16 0c0 6.5-8 11-8 11z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
        <div className="address-block">
          <div className="delivery-label">Delivery to:</div>
          <div className="address-text">{userAddress ? (userAddress.length > 28 ? userAddress.substring(0,25) + '...' : userAddress) : 'Set your delivery address'}</div>
        </div>
      </div>

      <main className="cart-main">
  <section className="cart-item card">
          <div className="cart-item-top">
            <div className="cart-item-name">{item.name}</div>
            <div className="cart-qty-price">
              <div className="qty-toggle">
                <button className="qty-btn" onClick={decrement}>-</button>
                <div className="qty-value">{qty}</div>
                <button className="qty-btn" onClick={increment}>+</button>
              </div>
              <div className="item-price">₹{(unitPrice * qty).toFixed(2)}</div>
            </div>
          </div>

          <div className="cart-item-actions">
            <button className="showcase-btn">+ Add Items</button>
            <button className="showcase-btn">✏️ Cooking Instructions</button>
          </div>
        </section>

  <section className="saving-corner card">
          <h3>Saving Corner</h3>
          <div className="saving-row">
            <input className="coupon-input" placeholder="Enter your coupon here" />
            <button className="apply-btn" onClick={() => { /* no-op per spec */ }}>Apply</button>
          </div>
        </section>

        <div className="two-cards">
          <div className="small-card card">
            <h4>Delivery time</h4>
            <div className="time">25-30mins</div>
          </div>

          <div className="small-card card">
            <h4>To pay :</h4>
            <div className="total-pay">₹{total.toFixed(2)}</div>
          </div>
        </div>

        <div className="place-cod-wrap">
          <button className="place-cod-btn" onClick={() => navigate('/place-cod')}>Place COD</button>
        </div>
      </main>
    </div>
  )
}

export default Cart