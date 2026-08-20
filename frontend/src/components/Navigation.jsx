import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="nav-container">
      <Link to="/" className="nav-logo">MedCare+</Link>
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/doctors" className="nav-link">Doctors</Link>
      <Link to="/booking" className="nav-link">Booking</Link>
    </nav>
  );
};

export default Navigation;
