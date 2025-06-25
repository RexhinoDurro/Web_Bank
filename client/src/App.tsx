import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Nav'
 import Home from "./components/Home";   
import Dashboard from "./components/dashboard";
import Login from "./components/logIn";

import SignUp from "./components/SignUp";
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* Add more routes here as needed */}
        </Routes>
      </div>
    </Router>
  )
}

export default App