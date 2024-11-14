import { BrowserRouter as Router, Routes, Route, useLocation,Navigate  } from 'react-router-dom';
import TaskManager from './pages/TaskManager';
import Login from './pages/Login';
import Navbar from './pages/Navbar';
import './App.css';

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
        <Route path="/dashboard" element={<TaskManager />} />
      </Routes>
    </Router>
  );
}

export default App;
