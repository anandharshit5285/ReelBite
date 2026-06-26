import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../styles/profile.css'
import '../../styles/reels.css'

const Profile = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        // Fetch user details
        axios.get('http://localhost:3000/api/auth/user/me', { withCredentials: true })
            .then(response => {
                // Ensure name is set from firstName and lastName if available
                const userData = response.data;
                if (userData.firstName || userData.lastName) {
                    userData.name = `${userData.firstName || ''} ${userData.lastName || ''}`.trim();
                }
                setUser(userData)
                setLoading(false)
            })
            .catch(error => {
                console.error('Error fetching user details:', error)
                setLoading(false)
                // If not authenticated, redirect to login
                if (error.response?.status === 401) {
                    navigate('/user/login')
                }
            })
    }, [navigate])

    const handleLogout = async () => {
        try {
            // include credentials so browser will accept the Set-Cookie clearing the token
            const res = await axios.get('http://localhost:3000/api/auth/user/logout', { withCredentials: true })
            if (res.status === 200) {
                // Clear any local storage if needed
                localStorage.clear()
                // Redirect to landing page
                navigate('/')
            } else {
                console.warn('Logout responded with', res.status)
            }
        } catch (error) {
            console.error('Error logging out:', error)
        }
    }

    if (loading) {
        return (
            <main className="profile-page" style={{ display: 'grid', placeItems: 'center' }}>
                <div style={{ color: 'var(--color-text-secondary)' }}>Loading...</div>
            </main>
        )
    }

    return (
        <main className="profile-page">
            {/* Page Title */}
            <div className="page-title">
                <h1>Profile</h1>
            </div>

            {/* Profile Header */}
            <section className="profile-header">
                <div className="profile-meta">
                    <img 
                        className="profile-avatar"
                        src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'} 
                        alt={user?.name || 'Profile'} 
                    />
                    <div className="profile-info">
                        <h1 className="profile-pill profile-business">{user?.fullName || 'User'}</h1>
                        <p className="profile-pill profile-address">{user?.email || 'No email provided'}</p>
                    </div>
                </div>

                {/* Wallet Balance Card */}
                <div className="wallet-card">
                    <div className="wallet-info">
                        <div className="wallet-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M1 10H23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div className="wallet-details">
                            <span className="wallet-label">ReelBite Money</span>
                            <span className="wallet-amount">₹5000</span>
                        </div>
                    </div>
                </div>
            </section>

            <hr className="profile-sep" />

            {/* Profile Details */}
            <section className="profile-details">
                <div className="detail-card">
                    <h2 className="detail-section-title">Personal Information</h2>
                    
                    <div className="detail-group">
                        <div className="detail-item">
                            <span className="detail-label">Full Name</span>
                            <span className="detail-value">{user?.fullName || 'Not provided'}</span>
                        </div>

                        <div className="detail-item">
                            <span className="detail-label">Email</span>
                            <span className="detail-value">{user?.email || 'Not provided'}</span>
                        </div>

                        <div className="detail-item">
                            <span className="detail-label">Phone</span>
                            <span className="detail-value">{user?.phone || 'Not provided'}</span>
                        </div>

                        <div className="detail-item">
                            <span className="detail-label">Address</span>
                            <span className="detail-value">{user?.address || 'Not provided'}</span>
                        </div>
                    </div>

                    <button 
                        onClick={handleLogout}
                        className="logout-btn"
                    >
                        Logout
                    </button>
                </div>
            </section>
        </main>
    )
}

export default Profile