import { useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';

import LanguageSelect from './pages/LanguageSelect';
import Learn from './pages/Learn';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Shop from './pages/Shop';
import Sidebar from './pages/Sidebar';
import Signup from './pages/Signup';
import RefrshHandler from './RefrshHandler';
import Home from './pages/Home';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const location = useLocation();

  const sidebarRoutes = ['/home', '/learn', '/profile', '/shop'];

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />

      {sidebarRoutes.includes(location.pathname) && <Sidebar/>}

      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/learn" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/LanguageSelect" element={<PrivateRoute element={<LanguageSelect />} />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/learn" element={<PrivateRoute element={<Learn />} />} />
        <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
        <Route path="/shop" element={<PrivateRoute element={<Shop />} />} />
      </Routes>
    </div>
  );
}
export default App;