import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="hero-section">
        <h1>Welcome to MedCare Plus</h1>
        <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
          Experience world-class healthcare with our modern, seamless hospital appointment system. 
          Your health is our priority.
        </p>
        <button className="btn-primary" onClick={() => navigate('/booking')}>
          Book an Appointment
        </button>
      </div>
      
      <div className="cards-grid" style={{ marginTop: '3rem' }}>
        <div className="form-card" style={{ maxWidth: '100%' }}>
          <h3>Specialized Doctors</h3>
          <p>Consult with our top-tier specialized professionals tailored for your needs.</p>
        </div>
        <div className="form-card" style={{ maxWidth: '100%' }}>
          <h3>Instant Booking</h3>
          <p>Schedule, manage, and confirm your appointments with a few simple clicks.</p>
        </div>
        <div className="form-card" style={{ maxWidth: '100%' }}>
          <h3>24/7 Availability</h3>
          <p>We are always here for you, ensuring round-the-clock premium healthcare support.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
