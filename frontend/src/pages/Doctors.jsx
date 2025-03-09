import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Doctors.css";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const navigate = useNavigate();
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div className="contner">
      <div className="sidebar">
        <h3>Specialties</h3>
        <ul>
          {[
            "General physician",
            "Gynecologist",
            "Dermatologist",
            "Pediatricians",
            "Neurologist",
            "Gastroenterologist",
          ].map((spec) => (
            <li key={spec} onClick={() => navigate(`/doctors/${spec}`)}>
              {spec}
            </li>
          ))}
        </ul>
      </div>

      <div className="maneu-valu">
        {filterDoc.map((item) => (
          <div
            key={item._id}
            className="doctor-carde"
            onClick={() => navigate(`/appointment/${item._id}`)}
          >
            <img
              src={item.image ? item.image : "https://via.placeholder.com/250"} // Use a valid placeholder image URL
              className="doctor-card-imagee"
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

export default Doctors;
