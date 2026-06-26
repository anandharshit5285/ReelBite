import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserRegister from '../pages/auth/UserRegister';
import UserLogin from '../pages/auth/UserLogin';
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister';
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin';
import Landing from '../pages/general/Landing';
import Home from '../pages/general/Home';
import Saved from '../pages/general/Saved';
import Cart from '../pages/general/Cart';
import Profile from '../pages/general/Profile';
import BottomNav from '../components/BottomNav';
import CreateFood from '../pages/food-partner/CreateFood';
import FoodPartnerProfile from '../pages/food-partner/Profile';
import PlaceCOD from '../pages/general/PlaceCOD';


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
        <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
        
        {/* Main App Routes - with Bottom Navigation */}
        <Route path="/reels" element={<><Home /><BottomNav /></>} />
        <Route path="/saved" element={<><Saved /><BottomNav /></>} />
        <Route path="/profile" element={<><Profile /><BottomNav /></>} />
        
        {/* Other Routes */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/create-food" element={<CreateFood />} />
        <Route path="/food-partner/:id" element={<FoodPartnerProfile />} />
        <Route path="/place-cod" element={<PlaceCOD />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes