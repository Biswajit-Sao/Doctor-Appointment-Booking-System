import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { FaUserDoctor } from "react-icons/fa6";
import { GrAppsRounded } from "react-icons/gr";
import { CiCircleList } from "react-icons/ci";
import { AppContext } from "../../context/AppContext";
import "./Dashboard.css"; // Add CSS file for styling

const Dashboard = () => {
  const { getDashData, dashData, cancleAppointment, aToken } =
    useContext(AdminContext);
  const { slotDateFormate } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className="dashboard">
        <div className="dashboard-stats">
          <div className="stat-card">
            <FaUserDoctor className="stat-icon" />
            <div>
              <p className="stat-number">{dashData.doctors}</p>
              <p className="stat-label">DOCTORS</p>
            </div>
          </div>

          <div className="stat-card">
            <GrAppsRounded className="stat-icon" />
            <div>
              <p className="stat-number">{dashData.appointments}</p>
              <p className="stat-label">APPOINTMENTS</p>
            </div>
          </div>

          <div className="stat-card">
            <FaUserDoctor className="stat-icon" />
            <div>
              <p className="stat-number">{dashData.patients}</p>
              <p className="stat-label">PATIENTS</p>
            </div>
          </div>
        </div>

        <div className="latest-booking">
          <div className="latest-booking-header">
            <CiCircleList className="latest-icon" />
            <p>LATEST BOOKING</p>
          </div>

          <div className="appointment-list">
            {dashData.latestAppointments.map((item, index) => (
              <div key={index} className="appointment-card">
                <img src={item.docData.image} alt={item.docData.name} className="doctor-imageles" />
                <div className="appointment-info">
                  <p className="doctor-name">{item.docData.name}</p>
                  <p className="appointment-date">{slotDateFormate(item.slotDate)}</p>
                </div>
                {
                item.cancelled 
                ? <span className="cancelled">Cancelled</span> 
                :item.isCompleted  
                ?<p className='khddf-fjsgdfgfbs'>Completed</p> :<button onClick={() => cancleAppointment(item._id)} className="cell cancel-button">Cancel</button>
              }
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
