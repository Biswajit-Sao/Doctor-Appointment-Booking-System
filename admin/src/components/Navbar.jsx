import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import './Navbar.css';
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    navigate('/');
    if (aToken) {
      setAToken('');
      localStorage.removeItem('aToken');
    }
    if (dToken) {
      setDToken('');
      localStorage.removeItem('dToken');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate('/')}>MyApp</div>
      <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <a className="navbar-link">{aToken ? "ADMIN" : "DOCTOR"}</a>
        <a onClick={logout} className="navbar-link">Log Out</a>
      </div>
      <button className="navbar-toggle" onClick={toggleMenu}>
        <span className="toggle-bar"></span>
        <span className="toggle-bar"></span>
        <span className="toggle-bar"></span>
      </button>
    </nav>
  );
};

export default Navbar;