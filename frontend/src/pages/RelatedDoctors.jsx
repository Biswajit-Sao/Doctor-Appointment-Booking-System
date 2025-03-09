import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import './RelatedDoctors.css'; // Ensure to import your CSS file

const RelatedDoctors = ({ docId, speciality }) => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  const [relDoc, setRelDocs] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId);
      setRelDocs(doctorsData);
    }
  }, [docId, speciality, doctors]);

  return (
    <div className="related-doctors">
      <h1>Related Doctors</h1>
      <div className="doctor-manage">
        {relDoc.slice(0, 6).map((item) => (
          <div
            key={item._id}
            className="doctor-card"
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
          >
            <img src={item.image} alt={`${item.name}`} className="doctor-card-image" />
            <div className="doctor-card-content">
              <h2 className="doctor-card-name">{item.name}</h2>
              <p className="doctor-card-specialization">{item.speciality}</p>
              <p className={`doctor-card-availability ${item.available ? 'available' : 'unavailable'}`}>
              {item.available ? 'Available' : 'Unavailable'}
            </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedDoctors;
