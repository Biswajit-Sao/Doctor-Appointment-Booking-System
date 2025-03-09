import React, { useContext, useState } from "react";
import "./AddDoctor.css";
import { FcBusinessman } from "react-icons/fc";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
const AddDoctor = () => {

  const[docImg,setDocImg]=useState(false)
  const[name,setName]=useState('')
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const[experience,setExperience]=useState('1 Year')
  const[fees,setFees]=useState('')
  const[about,setAbout]=useState('')
  const[speciality,setSpeciality]=useState('General physician')
  const[degree,setDegree]=useState('')
  const[address1,setAddress1]=useState('')
  const[address2,setAddress2]=useState('')

  const {backendUrl,aToken}=useContext(AdminContext)

  const onSubmitHandler=async (event)=>{
    event.preventDefault()
    console.log(name)
    
    
    try {
      if(!docImg){
        // return toast.error('Image Not Selected')
      }

      const formData =new FormData()

      formData.append('image',docImg)
      formData.append('name',name)
      formData.append('email',email)
      formData.append('password',password)
      formData.append('experience',experience)
      formData.append('fees',Number(fees))
      formData.append('about',about)
      formData.append('speciality',speciality)
      formData.append('degree',degree)
      formData.append('address',address1)


      formData.forEach((value,key)=>{
        console.log(`${key}: ${value}`)
      })
      

      const {data} =await axios.post(backendUrl + '/api/admin/add-doctor',formData,{headers:{aToken}})

      if(data.success){
        toast.success(data.message)
        setDocImg(false)
        setAbout('')
        setAddress1('')
        setAddress2('')
        setEmail('')
        setExperience('')
        setFees('')
        setName('')
        setPassword('')

      }
      else{
        toast.error(data.message)
        console.log(error);
      }








    } catch (error) {
      
    }
  }

  return (
    <div className="from-contner-size">
      <div className="form-container">
        <form className="doctor-form" onSubmit={onSubmitHandler}>
          <div className="form-image-section">
            <div className="image-placeholder">
              {
                docImg ? <img src={URL.createObjectURL(docImg)}/> :<FcBusinessman className="abtar-image" />
                
              }
              
            </div>
            <span>picture</span>
          </div>
          <div className="form-group">
            <label>Upload doctor picture</label>
            <input type="file" onChange={(e)=>{setDocImg(e.target.files[0])}} required />
          </div>
          <div className="form-group">
            <label>Doctor name</label>
            <input type="text" placeholder="Name" onChange={(e)=>{setName(e.target.value)}} value={name} required />
          </div>
          <div className="form-group">
            <label>Doctor Email</label>
            <input type="email" placeholder="email" onChange={(e)=>{setEmail(e.target.value)}} value={email} required />
          </div>
          <div className="form-group">
            <label>Doctor Password</label>
            <input type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} value={password} required />
          </div>
          <div className="form-group">
            <label>Experience</label>
            <select name="" id="" onChange={(e)=>{setExperience(e.target.value)}} value={experience}>
              <option value="1 Year">1 Year</option>
              <option value="2 Year">2 Year</option>
              <option value="3 Year">3 Year</option>
              <option value="4 Year">4 Year</option>
              <option value="5 Year">5 Year</option>
              <option value="6 Year">6 Year</option>
              <option value="7 Year">7 Year</option>
              <option value="8 Year">8 Year</option>
              <option value="9 Year">9 Year</option>
              <option value="10 Year">10 Year</option>
              <option value="11 Year">11 Year</option>
            </select>
          </div>
          <div className="form-group">
            <label>Fees</label>
            <input type="text" placeholder="Your fees" onChange={(e)=>{setFees(e.target.value)}} value={fees}required />
          </div>
          <div className="form-group">
            <label>Speciality</label>
            <select onChange={(e)=>{setSpeciality(e.target.value)}} value={speciality}>
              <option value="General physician">General physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatricians">Pediatricians</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>

            </select>
          </div>
          <div className="form-group">
            <label>Education</label>
            <input type="text" placeholder="Education" onChange={(e)=>{setDegree(e.target.value)}} value={degree} required />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input type="text" placeholder="Address 1" onChange={(e)=>{setAddress1(e.target.value)}} value={address1} required />
            <input type="text" placeholder="Address 2" onChange={(e)=>{setAddress2(e.target.value)}} value={address2} />
          </div>
          <div className="form-group">
            <label>About doctor</label>
            <textarea placeholder="Write about doctor" onChange={(e)=>{setAbout(e.target.value)}} value={about}></textarea>
          </div>
          <button type='submit' className="submit-btn">
            Add doctor
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
