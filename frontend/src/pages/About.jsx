import React from 'react'
import { assets } from '../assets/assets'
import './About.css'
const About = () => {
  return (
    <div>
      <div className="about-us">
      <div className="about-image">
        <img
          src={assets.aboutus}
          alt="About Us"
        />
      </div>
      <div className="about-text">
        <h2>About Our Clinic</h2>
        <p>
          At our clinic, we are committed to providing the highest quality healthcare services. Our experienced and compassionate medical professionals are dedicated to helping patients achieve their wellness goals. We offer a range of medical services tailored to meet the unique needs of each individual.
        </p>
        <p>
          Our mission is to create a welcoming and inclusive environment where patients feel respected, supported, and empowered to take charge of their health. We believe in the power of preventive care and strive to offer the best medical solutions that enhance the quality of life for all our patients.
        </p>
      </div>
    </div>
    </div>
  )
}

export default About
