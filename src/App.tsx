import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TripDetailsPage from './pages/TripDetailsPage';
import ServerStatus from './components/ServerStatus';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ChatPage from './pages/Chat';
import CollagePage from './pages/Collage';
import CollageView from './pages/CollageView';

function App() {
  return (
    <Router>
      <div className="">
        {/* Animated Background Elements */}
        {/* <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200  mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200  mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-75"></div>
          <div className="absolute top-40 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-pink-200  mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-150"></div>
        </div>
        */}
        <div className="">
           
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/trip/:id" element={<TripDetailsPage />} />
            <Route path="/chat" element={<ChatPage/>}/>
            <Route path='/collage' element={<CollagePage/>}/>
            <Route path='/collage/:name/:id' element={<CollageView/>}/>
            <Route path="*" element={<Navigate to="/" replace />} />
            
          </Routes>
        </div>

        {/* Server Status Floating Button */}
        <ServerStatus />
      </div>
    </Router>
  );
}

export default App;