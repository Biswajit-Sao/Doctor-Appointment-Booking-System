import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import './DoctorsList.css';

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="doctor-data-container">
      {doctors.map((item, index) => (
        <div className="doctor-card" key={index}>
          <img src={item.image} alt={`${item.name}`} className="doctor-image" />
          <div className="doctor-info">
            <h2 className="doctor-name">{item.name}</h2>
            <p className="doctor-specialization">{item.speciality}</p>
            <div className="availability">
              <input
                type="checkbox"
                onChange={() => changeAvailability(item._id)}
                checked={item.available}
              />
              <label>Available</label>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoctorsList;
