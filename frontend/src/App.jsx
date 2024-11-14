import { BrowserRouter as Router, Routes, Route, useLocation,Navigate  } from 'react-router-dom';
import TaskManager from './pages/TaskManager';
import Login from './pages/Login';
import Navbar from './pages/Navbar';
import './App.css';

const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  return token && token !== '';
};



function NavbarWrapper() {
  const location = useLocation(); 
  return location.pathname !== "/" ? <Navbar /> : null;
}

function App() {
  return (
    <Router>
      <NavbarWrapper /> 
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/dashboard" element={<TaskManager />} /> */}
        <Route 
          path="/dashboard" 
          element={isAuthenticated() ? <TaskManager /> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
