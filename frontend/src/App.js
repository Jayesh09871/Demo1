import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useState } from 'react';
import RefrshHandler from './RefrshHandler';
import LanguageSelect from './pages/LanguageSelect';
import Dashboard from './pages/Dashboard';
import Learn from './pages/Learn';
import Profile from './pages/Profile';
import Shop from './pages/Shop';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  return (
    <div className="App">
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/LanguageSelect' element={ <LanguageSelect /> } />
        <Route path='/Dashboard' element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/learn" element={< Learn/>} />
        <Route path="/profile" element={< Profile/>} />
        <Route path="/shop" element={< Shop/>} />
      </Routes>
    </div>
  );
}

export default App;