// Appointments.js
import React, { useContext, useEffect, useState } from 'react';
import './MyAppointments.css';
import {assets} from '../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';




const MyAppointments = () => {

  const {backendUrl,token,getDoctorsData}=useContext(AppContext)

  const navigate=useNavigate()

  const [appointments,setAppointments]=useState([])

  const months = [
    ' ',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const slotDateFormate=(slotDate)=>{
    const dateArray=slotDate.split('_')
    return dateArray[0]+" "+months[Number(dateArray[1])]+" "+dateArray[2]
  }

  const getUserAppointments=async()=>{
    try {
      
      const {data}=await axios.get(backendUrl +'/api/user/appointments',{headers:{token}})

      if(data.success){
        setAppointments(data.appointments.reverse())
        console.log(data.appointments)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment=async (appointmentId)=>{
    try {
      
        const {data}=await axios.post(backendUrl+'/api/user/cancel-appointment',{appointmentId},{headers:{token}})
        if(data.success){
          toast.success(data.message)
          getUserAppointments()
          getDoctorsData()
        }
        else{
          toast.error(data.message)
        }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const initPay=(order)=>{
    const options={
      key:import.meta.VITE_RAZORPAY_KEY_ID,
      amount:order.amount,
      currency:order.currency,
      name:'Appointment Payment',
      description:'Appointment Payment',
      order_id:order.id,
      receipt:order.receipt,
      handler:async (response)=>{
        console.log(response)
        try {
          const {data}=await axios.post(backendUrl+'/api/user/verifyRazorpay',response,{headers:{token}})
          if(data.success){
            getUserAppointments()
            navigate('/my-appointments')
          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      }
    }
    const rzp=new window.Razorpay(options)
    rzp.open()
  }

  const appointmentRazorpay=async (appointmentId)=>{
      try {
        
        const {data}=await axios.post(backendUrl+'/api/user/payment-razorpay',{appointmentId},{headers:{token}})

        if(data.success){
          initPay(data.order)
        }

      } catch (error) {
        
      }
  }

  useEffect(()=>{
    if(token){
      getUserAppointments()
    }
  },[token])

  console.log(appointments)
  return (
    <div className="appointments-container">
      <h2>My Appointments</h2>
      <div className="appointments-list">
        {appointments.map((appointment) => (
          <div className="appointment-card" key={appointment.id}>
            <div className="doctor-info">
              <img src={appointment.docData.image} alt="Doctor" />
              <div className="doctor-details">
                <h3>{appointment.docData.name}</h3>
                <p>{appointment.docData.degree}</p>
                <p>{appointment.docData.address}</p>
              </div>
            </div>
            <div className="appointment-details">
              <p><strong>Date:</strong> {slotDateFormate(appointment.slotDate)}</p>
              <p><strong>Time:</strong> {appointment.slotTime}</p>
              <div className="appointment-buttons">
                {!appointment.cancelled && appointment.payment&& !appointment.isCompleted &&<button className="cancele-btn">paid</button>}
                {!appointment.cancelled && !appointment.payment&&!appointment.isCompleted &&<button onClick={()=>appointmentRazorpay(appointment._id)} >Pay Online</button>}
                {!appointment.cancelled && !appointment.isCompleted &&<button onClick={()=>cancelAppointment(appointment._id)}  className="cancel-btn">Cancel Appointment</button>}
                {appointment.cancelled && !appointment.isCompleted &&<button onClick={()=>cancelAppointment(appointment._id)} className='cancel-apporetment'> Appointment cancelled </button> }
                {appointment.isCompleted&& <button className='compliterd-color'>Completed</button>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
