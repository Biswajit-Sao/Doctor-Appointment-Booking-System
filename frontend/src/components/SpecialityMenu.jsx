import React from 'react'
import "./SpecialityMenu.css"
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div className='speciality'>
      <h1>Find Your Speciality</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, accusamus!</p>
      <div className='container-value'>
        <Link onClick={() => scrollTo(0, 0)} className='value-set' to={'/doctors/General physician'}>
          <div className='menu-item'>
            <img src={assets.GeneralPhysicianimg} alt="General Physician" />
            <p>General Physician</p>
          </div>
        </Link>
        <Link onClick={() => scrollTo(0, 0)} className='value-set' to={'/doctors/Gynecologist'}>
          <div className='menu-item'>
            <img src={assets.Gynecologistimg} alt="Gynecologist" />
            <p>Gynecologist</p>
          </div>
        </Link>
        <Link onClick={() => scrollTo(0, 0)} className='value-set' to={'/doctors/Dermatologist'}>
          <div className='menu-item'>
            <img src={assets.Dermatologistimg} alt="Dermatologist" />
            <p>Dermatologist</p>
          </div>
        </Link>
        <Link onClick={() => scrollTo(0, 0)} className='value-set' to={'/doctors/Pediatrician'}>
          <div className='menu-item'>
            <img src={assets.Pediatriciansimg} alt="Pediatrician" />
            <p>Pediatrician</p>
          </div>
        </Link>
        <Link onClick={() => scrollTo(0, 0)} className='value-set' to={'/doctors/Neurologist'}>
          <div className='menu-item'>
            <img src={assets.Neurologistimg} alt="Neurologist" />
            <p>Neurologist</p>
          </div>
        </Link>
        <Link onClick={() => scrollTo(0, 0)} className='value-set' to={'/doctors/Gastroenterologist'}>
          <div className='menu-item'>
            <img src={assets.Gastroenterologistimg} alt="Gastroenterologist" />
            <p>Gastroenterologist</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default SpecialityMenu
