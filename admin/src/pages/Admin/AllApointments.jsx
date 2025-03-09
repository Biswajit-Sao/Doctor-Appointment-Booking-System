import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import './AllAppointments.css'

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancleAppointment } = useContext(AdminContext)
  const { calculateAge, slotDateFormate } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className="contnervalu-and-amrge">
      <div className="container">
        <h2>All Appointments</h2>
        <ul className="appointment-header">
          <li>#</li>
          <li>PATIENT</li>
          <li>AGE</li>
          <li>DATE & TIME</li>
          <li>DOCTOR</li>
          <li>FEES</li>
          <li>PAYMENT</li>
          <li>ACTIONS</li>
        </ul>

        <ul className="appointment-list">
          {appointments.reverse().map((item, index) => (
            <li className="appointment-item" key={index}>
              <span className="cell">{index + 1}</span>
              <div className="cell patient-info">
                <img src={item.userData.image} alt="Patient" /> 
                <span>{item.userData.name}</span>
              </div>
              <span className="cell">{calculateAge(item.userData.dob)}</span>
              <span className="cell">{slotDateFormate(item.slotDate)}, {item.slotTime}</span>
              <div className="cell doctor-info">
                <img src={item.docData.image} alt="Doctor" /> 
                <span>{item.docData.name}</span>
              </div>
              <span className="cell">Rs:{item.amount}</span>
              <span className="cell">{item.payment ? 'PAID' : 'UNPAID'}</span>
              {
                item.cancelled 
                ? <span className="cancelled">Cancelled</span> 
                :item.isCompleted  
                ?<p className='khddf-fjsgdfgfbs'>Completed</p> :<button onClick={() => cancleAppointment(item._id)} className="cell cancel-button">Cancel</button>
              }
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AllAppointments
