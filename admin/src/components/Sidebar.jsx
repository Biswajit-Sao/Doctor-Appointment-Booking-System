import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';
import { NavLink } from 'react-router-dom';
import { ImHome } from 'react-icons/im';
import { FaCalendarAlt, FaAddressCard } from 'react-icons/fa';
import { MdOutlineAddToPhotos } from 'react-icons/md';
import './Sidebar.css';

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isCollapsed ? '☰' : '✖'}
      </button>
      <div className="sidebar-items">
        {aToken && (
          <>
            <NavLink to="/admin-dashboard" className="sidebar-item">
              <ImHome className="icon" />
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/all-appointments" className="sidebar-item">
              <FaCalendarAlt className="icon" />
              <span>Appointments</span>
            </NavLink>
            <NavLink to="/add-doctor" className="sidebar-item">
              <MdOutlineAddToPhotos className="icon" />
              <span>Add Doctor</span>
            </NavLink>
            <NavLink to="/doctor-list" className="sidebar-item">
              <FaAddressCard className="icon" />
              <span>Doctors List</span>
            </NavLink>
          </>
        )}
        {dToken && (
          <>
            <NavLink to="/doctor-dashboard" className="sidebar-item">
              <ImHome className="icon" />
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/doctor-appointments" className="sidebar-item">
              <FaCalendarAlt className="icon" />
              <span>Appointments</span>
            </NavLink>
            <NavLink to="/doctor-profile" className="sidebar-item">
              <FaAddressCard className="icon" />
              <span>Profile</span>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};