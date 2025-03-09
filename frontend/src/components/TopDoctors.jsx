import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import './TopDoctors.css';

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="container">
      <h1 className="title">Top Doctors List</h1>
      <div className="doctor-manage">
        {doctors.slice(0, 12).map((item) => (
          <div 
            key={item._id} 
            className="doctor-card" 
            onClick={() => navigate(`/appointment/${item._id}`)}
          >
            <img 
              src={item.image ? item.image : 'https://via.placeholder.com/250'} // Use a valid placeholder image URL
              className="doctor-card-image" 
              alt={item.name} 
            />
            <div className="doctor-card-content">
              <h2 className="doctor-card-name">{item.name}</h2>
              <p className="doctor-card-specialization">{item.speciality}</p>
              <div className="doctor-card-availability">
                <p
                  className={` ${
                    item.available ? "available" : "unavailable"
                  } `}
                >
                  {item.available ? "Available" : "Unavailable"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopDoctors;
