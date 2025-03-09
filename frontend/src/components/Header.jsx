import React from 'react';
import "./Header.css";
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';



const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-content">
        <h1>Book Your Appointment with Trusted Doctors</h1>
        <p>Get quality healthcare consultations with ease. Schedule appointments with experienced professionals who prioritize your health and well-being.</p>
          
          <button onClick={() => { navigate('/login'); scrollTo(0, 0); }}className="header-button" >Book Appointment</button>
      </div>
      <div className="header-image">
        <img src={assets.banner} alt="Doctor" />
      </div>
    </header>
  );
}

export default Header;
