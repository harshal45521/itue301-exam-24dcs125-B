import React from 'react';
import './AppointmentCard.css';

const AppointmentCard = ({ patientName, doctorName, date, timeSlot, status }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'confirmed':
        return 'status-confirmed';
      case 'cancelled':
        return 'status-cancelled';
      case 'pending':
      default:
        return 'status-pending';
    }
  };

  return (
    <div className={`appointment-card ${getStatusClass(status)}`}>
      <h3>Appointment Details</h3>
      <p><strong>Patient:</strong> {patientName}</p>
      <p><strong>Doctor:</strong> {doctorName}</p>
      <p><strong>Date:</strong> {date}</p>
      <p><strong>Time Slot:</strong> {timeSlot}</p>
      <p><strong>Status:</strong> <span className="status-badge">{status}</span></p>
    </div>
  );
};

export default AppointmentCard;
