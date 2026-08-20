import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DoctorsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/v1/doctors');
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch doctors');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) return (
    <div className="page-container" style={{ textAlign: 'center', padding: '4rem' }}>
      <h2>Loading our top specialists...</h2>
    </div>
  );
  
  if (error) return (
    <div className="page-container" style={{ textAlign: 'center', color: '#ef4444' }}>
      <h2>Error: {error}</h2>
    </div>
  );

  return (
    <div className="page-container">
      <h2>Meet Our Doctors</h2>
      <p style={{ maxWidth: '600px' }}>
        Our world-renowned specialists are here to provide the highest quality of medical care. 
        Filter and find the perfect doctor for your health needs.
      </p>
      
      <div className="cards-grid">
        {data.map(doctor => (
          <div key={doctor.id} className="doctor-card">
            <h3 style={{ color: 'var(--primary)' }}>{doctor.name}</h3>
            <p style={{ margin: '0 0 0.5rem 0' }}><strong>Specialisation:</strong> {doctor.specialisation}</p>
            
            <div className={`availability-badge ${!doctor.available ? 'unavailable' : ''}`}>
              {doctor.available ? 'Available Now' : 'Currently Unavailable'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsPage;
