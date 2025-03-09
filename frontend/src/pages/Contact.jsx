import React from 'react'
import './Contact.css'
import {assets} from '../assets/assets'

const Contact = () => {
  return (
    <div>
      <div className="contact-us">
      <div className="contact-image">
        <img
          src={assets.cuncatus}
          alt="Contact Us"
        />
      </div>
      <div className="contact-text">
        <h2>Contact Us</h2>
        <p>
          We would love to hear from you! Whether you have questions about our services, need assistance, or want to explore job opportunities, feel free to reach out. Our team is here to support you in every way possible.
        </p>
        <p>
          Interested in joining us? Click below to discover our open positions and explore a rewarding career with us.
        </p>
        <p>explor@gamil.com</p>
        <p>+913873792</p>

        <button className="explore-button">Explore Jobs</button>
      </div>
    </div>
    </div>
  )
}

export default Contact
