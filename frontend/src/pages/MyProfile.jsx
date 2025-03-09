import React, { useContext, useState } from 'react';
import './MyProfile.css';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile  = () => {
  const [isEditing, setIsEditing] = useState(false);


  const [isEdit,setImage]=useState(false)

  const updateUserProfileData=async()=>{
      try {
        
        const formData=new FormData()

        formData.append('name',userData.name)
        formData.append('phone',userData.phone)
        formData.append('address',userData.address)
        formData.append('gender',userData.gender)
        formData.append('dob',userData.dob)


        isEdit && formData.append('image',isEdit)

        const {data} =await axios.post(backendUrl+'/api/user/update-profile',formData,{headers:{token}})

        if(data.success){
          toast.success(data.message)
          await loadUserProfileData()
          setImage(false)
        }else{
          toast.error(data.message)
        }
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
  }
  
  const{userData,setUserData,backendUrl,loadUserProfileData,token}=useContext(AppContext)


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };



  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return userData && (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-image">
        <img
          src={userData.image || 'https://via.placeholder.com/150'}
          alt="Profile"
        />
        {isEditing && (
          <input type="file" onChange={(e)=>{setImage(e.target.files[0])}} />
        )}
      </div>
      <div className="profile-info">
        <div className="info-group">
          <label>Name:</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
            />
          ) : (
            <span>{userData.name}</span>
          )}
        </div>
        <div className="info-group">
          <label>Email:</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
            />
          ) : (
            <span>{userData.email}</span>
          )}
        </div>
        <div className="info-group">
          <label>Phone:</label>
          {isEditing ? (
            <input
              type="text"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
            />
          ) : (
            <span>{userData.phone}</span>
          )}
        </div>
        <div className="info-group">
          <label>Address:</label>
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={userData.address}
              onChange={handleInputChange}
            />
          ) : (
            <span>{userData.address}</span>
          )}
        </div>
        <div className="info-group">
          <label>Gender:</label>
          {isEditing ? (
            <select
              name="gender"
              value={userData.gender}
              onChange={handleInputChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <span>{userData.gender}</span>
          )}
        </div>
        <div className="info-group">
          <label>Birthday:</label>
          {isEditing ? (
            <input
              type="date"
              name="dob"
              value={userData.dob}
              onChange={handleInputChange}
            />
          ) : (
            <span>{userData.dob}</span>
          )}
        </div>
      </div>
      <div className="profile-buttons" onClick={toggleEdit}>

        {
          isEditing ?

          <button onClick={updateUserProfileData}>Save Information</button> 

          :
          <button>Edit</button>
        }
      </div>
    </div>
  );
};

export default MyProfile ;
