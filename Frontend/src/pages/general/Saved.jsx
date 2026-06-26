import React, { useEffect, useState } from 'react'
import '../../styles/profile.css'
import '../../styles/reels.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Saved = () => {
    const [ videos, setVideos ] = useState([])
    const [ userAddress, setUserAddress ] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        // Fetch saved items
        axios.get("http://localhost:3000/api/food/save", { withCredentials: true })
            .then(response => {
                const savedFoods = (response.data.savedFoods || []).map((item) => ({
                    _id: item.food._id,
                    video: item.food.video,
                    name: item.food.name,
                    description: item.food.description,
                    price: item.food.price,
                    likeCount: item.food.likeCount,
                    savesCount: item.food.savesCount,
                    foodPartner: item.food.foodPartner,
                }))
                setVideos(savedFoods)
            })

        // Fetch user address for top bar
        axios.get("http://localhost:3000/api/auth/user/me", { withCredentials: true })
            .then(res => setUserAddress(res.data?.address || ''))
            .catch(() => setUserAddress(''))
    }, [])

    const removeSaved = async (item) => {
        try {
            await axios.post("http://localhost:3000/api/food/save", { foodId: item._id }, { withCredentials: true })
            // Remove from local list
            setVideos(prev => prev.filter(v => v._id !== item._id))
        } catch (err) {
            console.error('Error removing saved item', err)
        }
    }

    const truncatedAddress = userAddress 
        ? (userAddress.length > 25 ? userAddress.substring(0,22) + '...' : userAddress)
        : 'Set your delivery address'

    return (
        <main className="profile-page">
            {/* address bar (reuse reels styles for consistent look) */}
            <div className="address-bar">
                <div className="location-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 21s-8-4.5-8-11a8 8 0 1 1 16 0c0 6.5-8 11-8 11z" />
                        <circle cx="12" cy="10" r="3" />
                    </svg>
                </div>
                <div className="address-block">
                    <div className="delivery-label">Delivery to:</div>
                    <div className="address-text">{truncatedAddress}</div>
                </div>
            </div>

            <section className="profile-header" style={{ marginTop: '64px' }}>
                <div className="profile-meta">
                    <img className="profile-avatar" src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=60" alt="Saved" />
                    <div className="profile-info">
                        <h1 className="profile-pill profile-business">Saved</h1>
                        <p className="profile-pill profile-address">Your saved reels and meals</p>
                    </div>
                </div>
            </section>

            <hr className="profile-sep" />

            <section className="profile-grid" aria-label="Saved videos">
                {videos.length === 0 ? (
                    <div style={{ gridColumn: '1/-1', padding: '48px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                        No saved items yet.
                    </div>
                ) : (
                    videos.map((v) => (
                        <div key={v._id} className="profile-grid-item" style={{ position: 'relative', overflow: 'hidden', borderRadius: '8px' }}>
                            <video
                                className="profile-grid-video"
                                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                src={v.video}
                                muted
                                loop
                                playsInline
                                preload="metadata"
                            />

                            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '8px', gap: '8px', pointerEvents: 'none' }}>
                                <div style={{ pointerEvents: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ background: 'rgba(0,0,0,0.4)', color: '#fff', padding: '6px 8px', borderRadius: '999px', fontSize: '0.85rem' }}>{v.name || ''}</div>
                                    <button onClick={() => removeSaved(v)} style={{ pointerEvents: 'auto', background: 'rgba(255,255,255,0.9)', border: 'none', padding: '6px 8px', borderRadius: '8px', cursor: 'pointer' }}>Remove</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </section>
        </main>
    )
}

export default Saved