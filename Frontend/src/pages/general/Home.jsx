import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../../styles/reels.css'
import ReelFeed from '../../components/ReelFeed'

const Home = () => { 
    const [ videos, setVideos ] = useState([])
    const [ userAddress, setUserAddress ] = useState('')
    // Autoplay behavior is handled inside ReelFeed

    useEffect(() => {
        // Fetch user details for address
        axios.get("http://localhost:3000/api/auth/user/me", { withCredentials: true })
            .then(response => {
                // Log the response to debug
                console.log('User data:', response.data);
                const address = response.data.address;
                console.log('Setting address:', address);
                setUserAddress(address);
            })
            .catch(error => {
                console.error('Error fetching user address:', error);
                setUserAddress('');
            })

        axios.get("http://localhost:3000/api/food/reels", { withCredentials: true })
            .then(response => {
                console.log("Reels response:", response.data);
                // Ensure proper initialization of video states
                const videosWithStates = response.data.foodItems.map(item => ({
                    ...item,
                    likeCount: typeof item.likeCount === 'number' ? item.likeCount : 0,
                    savesCount: typeof item.savesCount === 'number' ? item.savesCount : 0,
                    // Use the states from backend or default to false
                    isLiked: Boolean(item.isLiked),
                    isSaved: Boolean(item.isSaved)
                }));
                console.log("Processed videos with states:", videosWithStates);
                setVideos(videosWithStates);
            })
            .catch(error => {
                console.error("Error fetching reels:", error);
            })
    }, [])

    // Using local refs within ReelFeed; keeping map here for dependency parity if needed
 
    async function likeVideo(item) {
        if (!item._id) return;
        
        try {
            // First get the current state
            const currentVideo = videos.find(v => v._id === item._id);
            const wasLiked = currentVideo?.isLiked || false;
            
            // Update UI immediately
            setVideos(prev => prev.map(v => {
                if (v._id === item._id) {
                    return {
                        ...v,
                        isLiked: !wasLiked,
                        likeCount: (v.likeCount || 0) + (wasLiked ? -1 : 1)
                    };
                }
                return v;
            }));
            
            // Make API call
            const response = await axios.post(
                "http://localhost:3000/api/food/like", 
                { foodId: item._id }, 
                { withCredentials: true }
            );
            
            // Update state based on server response
            const serverUnliked = response.data.message.includes("unliked");
            
            setVideos(prev => prev.map(v => {
                if (v._id === item._id) {
                    return {
                        ...v,
                        isLiked: !serverUnliked,
                        likeCount: serverUnliked ? 
                            Math.max(0, (v.likeCount || 0) - 1) : 
                            (v.likeCount || 0)
                    };
                }
                return v;
            }));

            console.log(`Video ${serverUnliked ? 'unliked' : 'liked'} successfully`);
        } catch (error) {
            console.error("Error toggling like:", error);
            // Revert to original state on error
            setVideos(prev => prev.map(v => {
                if (v._id === item._id) {
                    return {
                        ...v,
                        isLiked: wasLiked,
                        likeCount: (v.likeCount || 0) + (wasLiked ? 1 : -1)
                    };
                }
                return v;
            }));
        }
    }

    async function saveVideo(item) {
        if (!item._id) return;
        
            try {
                // Get current state before update
                const currentVideo = videos.find(v => v._id === item._id);
                const wasSaved = currentVideo?.isSaved || false;
            
                // Update UI immediately
                setVideos(prev => prev.map(v => {
                    if (v._id === item._id) {
                        return {
                            ...v,
                            isSaved: !wasSaved,
                            savesCount: (v.savesCount || 0) + (wasSaved ? -1 : 1)
                        };
                    }
                    return v;
                }));
            
                // Make API call
                const response = await axios.post(
                    "http://localhost:3000/api/food/save", 
                    { foodId: item._id }, 
                    { withCredentials: true }
                );
            
                console.log("Save response:", response.data);
                const serverUnsaved = response.data.message.includes("unsaved");
            
                // Update state based on server response
                setVideos(prev => prev.map(v => {
                    if (v._id === item._id) {
                        return {
                            ...v,
                            isSaved: !serverUnsaved,
                            savesCount: serverUnsaved ? 
                                Math.max(0, (v.savesCount || 0) - 1) : 
                                (v.savesCount || 0)
                        };
                    }
                    return v;
                }));
            
                console.log(`Video ${serverUnsaved ? 'unsaved' : 'saved'} successfully`);
            } catch (error) {
                console.error("Error saving video:", error);
            
                // Revert to original state on error
                setVideos(prev => prev.map(v => {
                    if (v._id === item._id) {
                        const currentSaved = v.isSaved;
                        return {
                            ...v,
                            isSaved: !currentSaved,
                            savesCount: (v.savesCount || 0) + (!currentSaved ? -1 : 1)
                        };
                    }
                    return v;
                }));
            }
    }

    return (
        <ReelFeed  
            items={videos}
            onLike={likeVideo}
            onSave={saveVideo}
            emptyMessage="No videos available."
            userAddress={userAddress}
        />
    )
}

export default Home