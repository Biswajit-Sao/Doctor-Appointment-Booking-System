import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { FaIndianRupeeSign } from "react-icons/fa6";
import './DoctorProfile.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const DoctorProfile = () => {

  const{dToken,profileData,setProfileData,getProfileData,backendUrl}=useContext(DoctorContext)
  const{}=useContext(AppContext)

  const [isEdit,setIsEdit]=useState(false)

  const updateProfile =async ()=>{
    try {
      
      const updateData={
        address :profileData.address,
        fees :profileData.fees,
        available:profileData.available
      }

      const {data}=await axios.post(backendUrl+'/api/doctor/update-profile',updateData,{headers:{dToken}}) 

      if(data.success){
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      }
      else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(data.error)
      console.log(data.error)
      
    }
  }

  useEffect(()=>{
    if(dToken){
      getProfileData()
    }
  },[dToken])

   return profileData && (
    <div className="calles-contrill">
    <div className="doctor-profile">
    <div>
      <img src={profileData.image} alt="Doctor" />
    </div>
    <div>
      <p className="name">{profileData.name}</p>
  
      <div className="degree-speciality">
        <p>{profileData.degree} - {profileData.speciality}</p>
        <button className="experience-button">{profileData.experience}</button>
      </div>
  
      <div className="about-section">
        <p>About:</p>
        <p className="about-text">{profileData.about}</p>
      </div>
  
      <p className="fees">
        Appointment fee: <span><FaIndianRupeeSign /> {isEdit ? <input type="number" onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} value={profileData.fees} /> : profileData.fees}</span>
      </p>
  
      <div className="address">
        <p>Address:</p>
        {isEdit ? <input type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))} value={profileData.address} /> : profileData.address}
      </div>
  
      <div className="availability">
        <input onClick={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} checked={profileData.available} type="checkbox" />
        <label>Available</label>
      </div>
  
      {
        isEdit 
        ? <button className="save-button" onClick={updateProfile}>Save</button>
        : <button className="edit-button" onClick={() => setIsEdit(true)}>Edit</button>
      }
    </div>
  </div>
  </div>
  )
}

export default DoctorProfile
