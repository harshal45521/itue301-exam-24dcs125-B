import React, { useState } from 'react';
import axios from 'axios';
import AppointmentCard from '../components/AppointmentCard';

const BookingPage = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    doctorName: '',
    date: '',
    timeSlot: ''
  });
  
  const [submittedAppointment, setSubmittedAppointment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:5000/api/v1/appointments', formData);
      setSubmittedAppointment(response.data);
      setFormData({
        patientName: '',
        doctorName: '',
        date: '',
        timeSlot: ''
      });
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2>Book an Appointment</h2>
        <p>Schedule your visit with our specialists in just a few clicks.</p>
      </div>
      
      <div className="form-card" style={{ width: '100%' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Patient Name</label>
            <input 
              className="form-input"
              type="text" 
              name="patientName" 
              value={formData.patientName} 
              onChange={handleChange} 
              placeholder="John Doe"
              required 
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Doctor Name</label>
            <input 
              className="form-input"
              type="text" 
              name="doctorName" 
              value={formData.doctorName} 
              onChange={handleChange} 
              placeholder="Dr. Alice Smith"
              required 
            />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Date</label>
              <input 
                className="form-input"
                type="date" 
                name="date" 
                value={formData.date} 
                onChange={handleChange} 
                required 
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Time Slot</label>
              <input 
                className="form-input"
                type="time" 
                name="timeSlot" 
                value={formData.timeSlot} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>
          
          {error && <div style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Booking...' : 'Confirm Booking'}
          </button>
        </form>
      </div>

      {submittedAppointment && (
        <div style={{ marginTop: '3rem', width: '100%', maxWidth: '600px', animation: 'fadeIn 0.5s ease' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Recently Booked</h3>
          <AppointmentCard 
            patientName={submittedAppointment.patientName}
            doctorName={submittedAppointment.doctorName}
            date={submittedAppointment.date}
            timeSlot={submittedAppointment.timeSlot}
            status={submittedAppointment.status}
          />
        </div>
      )}
    </div>
  );
};

export default BookingPage;
