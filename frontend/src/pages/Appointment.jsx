import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./Appointment.css";
import { AppContext } from "../context/AppContext";
import RelatedDoctors from "./RelatedDoctors";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [weekDates, setWeekDates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const doc = doctors.find((doc) => doc._id === docId);
    if (doc) setDocInfo(doc);
  }, [doctors, docId]);

  useEffect(() => {
    const generateWeekDates = () => {
      const dates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return date;
      });
      setWeekDates(dates);
    };
    generateWeekDates();
  }, []);

  const generateTimeSlots = () => {
    if (!selectedDate || !docInfo) return [];

    const slots = [];
    let start = new Date(selectedDate);
    start.setHours(9, 0, 0, 0); // Start time: 9:00 AM
    let end = new Date(selectedDate);
    end.setHours(17, 0, 0, 0); // End time: 5:00 PM

    // If the selected date is today, start from the current time
    const now = new Date();
    if (selectedDate.toDateString() === now.toDateString()) {
      start = new Date(Math.max(start, now));
    }

    const day = selectedDate.getDate();
    const month = selectedDate.getMonth() + 1;
    const year = selectedDate.getFullYear();
    const slotDate = `${day}_${month}_${year}`;

    while (start < end) {
      const timeString = start.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const isSlotAvailable =
        !docInfo.slots_booked?.[slotDate]?.includes(timeString);

      if (isSlotAvailable) slots.push(timeString);
      start.setMinutes(start.getMinutes() + 30);
    }
    return slots;
  };

  const timeslots = generateTimeSlots();

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Please log in to book an appointment");
      return navigate("/login");
    }
    if (!selectedDate || !selectedTime) {
      toast.warn("Please select a date and time slot");
      return;
    }

    try {
      const day = selectedDate.getDate();
      const month = selectedDate.getMonth() + 1;
      const year = selectedDate.getFullYear();
      const slotDate = `${day}_${month}_${year}`;

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime: selectedTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to book appointment. Please try again.");
    }
  };

  return (
    <div className="appointment-container">
      {docInfo && (
        <div className="doctor-banner">
          <div>
            <img src={docInfo.image} alt="Doctor" className="doctor-image" />
          </div>
          <div className="doctor-info">
            <div>
              <h2>{docInfo.name}</h2>
              <p>{docInfo.degree}</p>
            </div>
            <div>
              <p>{docInfo.speciality}</p>
            </div>
            <div>
              <p className="about">{docInfo.about}</p>
              <p className="fee">Fee: {docInfo.fees}</p>
            </div>
          </div>
        </div>
      )}

      <div className="booking-section">
        <h2>Select a Date</h2>
        <div className="date-picker">
          {weekDates.map((date, index) => (
            <div
              key={index}
              className={`date-item ${
                selectedDate?.toDateString() === date.toDateString()
                  ? "selected"
                  : ""
              }`}
              onClick={() => {
                setSelectedDate(date);
                setSelectedTime(null); // Reset selected time when date changes
              }}
            >
              <p>{date.toDateString().split(" ")[0]}</p>
              <p>{date.getDate()}</p>
            </div>
          ))}
        </div>

        {selectedDate && (
          <>
            <h2>Select a Time</h2>
            <div className="time-picker">
              {timeslots.length > 0 ? (
                timeslots.map((time, index) => (
                  <div
                    key={index}
                    className={`time-item ${
                      selectedTime === time ? "selected" : ""
                    }`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </div>
                ))
              ) : (
                <p className="no-slots">No slots available for this date</p>
              )}
            </div>
          </>
        )}

        <button className="book-btn" onClick={bookAppointment}>
          Book Appointment
        </button>
      </div>

      {docInfo && (
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      )}
    </div>
  );
};

export default Appointment;
