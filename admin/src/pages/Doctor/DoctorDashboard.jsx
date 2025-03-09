import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { FaUserDoctor } from "react-icons/fa6";
import { GrAppsRounded } from "react-icons/gr";
import { CiCircleList } from "react-icons/ci";

import { MdCurrencyRupee } from "react-icons/md";
import { AppContext } from '../../context/AppContext';

import { GiCancel } from "react-icons/gi";
import { GrCompliance } from "react-icons/gr";
const DoctorDashboard = () => {

  const {dashData,
    setDashData,
    getDashData,dToken,completeAppointment,cancelAppointment}=useContext(DoctorContext)

    const {slotDateFormate}=useContext(AppContext)

    useEffect(()=>{
      if(dToken){
        getDashData()
      }
    },[dToken])

  return dashData &&  (
      <div className="dashboard">
        <div className="dashboard-stats">
          <div className="stat-card">
            <MdCurrencyRupee className="stat-icon" />
            <div>
              <p className="stat-number"> <MdCurrencyRupee/>{dashData.earnings}</p>
              <p className="stat-label">Earnings</p>
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
                <img src={item.docData.image} alt={item.userData.name} className="doctor-imageles" />
                <div className="appointment-info">
                  <p className="doctor-name">{item.userData.name}</p>
                  <p className="appointment-date">{slotDateFormate(item.slotDate)}</p>
                </div>
                {item.cancelled ? (
              <p className="cancelled-part-sate">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="cancellede-part-sate">Completed</p>
            ) : (
              <div className="action-icons">
                <GiCancel
                  onClick={() => cancelAppointment(item._id)}
                  className="cancel-icon"
                />
                <GrCompliance
                  onClick={() => completeAppointment(item._id)}
                  className="compliance-icon"
                />
              </div>
            )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
      

  
}

export default DoctorDashboard
