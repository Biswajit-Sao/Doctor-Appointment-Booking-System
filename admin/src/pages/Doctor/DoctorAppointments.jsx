import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { GiCancel } from "react-icons/gi";
import { GrCompliance } from "react-icons/gr";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import "./DoctorAppointments.css"; // Import the CSS file

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { calculateAge, slotDateFormate } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="appointments-container">
      <p className="appointments-header">All Appointments</p>
      <div className="appointments-table">
        <div className="table-header">
          <p>#</p>
          <p>PATIENT</p>
          <p>PAYMENT</p>
          <p>AGE</p>
          <p>DATE & TIME</p>
          <p>FEES</p>
          <p>ACTION</p>
        </div>
        {appointments.reverse().map((item, index) => (
          <div className="table-row" key={index}>
            <p>{index + 1}</p>
            <div className="patient-info">
              <img
                src={item.userData.image}
                alt="Patient"
                className="patient-img"
              />
              <p>{item.userData.name}</p>
            </div>
            <div className="payment-info">
              <p>{item.payment ? "ONLINE" : "CASH"}</p>
            </div>
            <p>{calculateAge(item.userData.dob)}</p>
            <p>
              {slotDateFormate(item.slotDate)}, {item.slotTime}
            </p>
            <p>
              <MdOutlineCurrencyRupee /> {item.amount}
            </p>
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
  );
};

export default DoctorAppointments;
