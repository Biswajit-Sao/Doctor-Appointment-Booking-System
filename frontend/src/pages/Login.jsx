// Auth.js
import React, { useContext, useEffect, useState } from 'react';
import './Login.css';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login= () => {


    const{token,setToken,backendUrl}=useContext(AppContext)

    const navigate =useNavigate()



  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async(e) => {
    e.preventDefault();

    const name=formData.name
    const email=formData.email
    const password =formData.password
    try {

        if(isSignUp){

          const {data}=await axios.post(backendUrl+'/api/user/register',{name,email,password})
          console.log(name,email,password);
          if(data.success){
            localStorage.setItem('token',data.token)
            setToken(data.token)
          }
          else{
            toast.error(data.message)
          }
        }else{

          const {data}=await axios.post(backendUrl+'/api/user/login',{password,email})
          if(data.success){
            localStorage.setItem('token',data.token)
            setToken(data.token)
          }
          else{
            toast.error(data.message)
          }



        }

      
    } catch (error) {

      toast.error(error.message)
      
    }



   
  };

  useEffect(()=>{
    if(token){
        navigate('/')
    }
  },[token])




  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setFormData({ name: '', email: '', password: '' }); // Reset form data
  };





  return (
    <div className="auth-container">
      <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        {isSignUp && (
          <input
            type="text"
            name="name"
            placeholder="Username"
            value={formData.name}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="button-login" >{isSignUp ? 'Sign Up' : 'Login'}</button>
      </form>
      <p onClick={toggleForm} className="toggle-link">
        {isSignUp ? 'Already have an account? Login' : 'Don’t have an account? Sign Up'}
      </p>
    </div>
  );
};

export default Login;
