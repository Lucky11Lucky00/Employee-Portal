import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlane, FaHotel, FaCar, FaCalendarAlt, FaMapMarkerAlt, FaExternalLinkAlt } from 'react-icons/fa';
import './Travel.css';

const Travel = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const navigate = useNavigate();

  // Sample travel data
  const travelData = {
    upcoming: [
      {
        id: 1,
        purpose: 'AWS re:Invent Conference',
        destination: 'Las Vegas, USA',
        date: '2025-11-30 to 2025-12-04',
        status: 'Approved',
        type: 'flight',
        budget: '$3,800'
      },
      {
        id: 2,
        purpose: 'Client Security Review',
        destination: 'Berlin, Germany',
        date: '2025-09-15 to 2025-09-18',
        status: 'Pending Approval',
        type: 'flight',
        budget: '$2,900'
      }
    ],
    policies: [
      "All international trips require 30-day advance approval",
      "Use corporate travel code: ITDEPT2025 when booking",
      "Preferred airlines: Delta, United, Lufthansa for international",
      "Maximum $250/night for hotel (major cities)",
      "$75/day meal allowance (receipts required over $25)",
      "Ground transportation: Uber Business preferred"
    ]
  };

  const handleNewTripRequest = () => {
    navigate('/travel/new');
  };

  const handleViewTripDetails = (tripId) => {
    navigate(`/travel/details/${tripId}`);
  };

  // Proper external link handling
  const handleExternalLink = (url) => {
    // Ensure URL has proper protocol
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    
    // Verify URL is safe (in a real app, you'd have more validation)
    if (isValidUrl(fullUrl)) {
      window.open(fullUrl, '_blank', 'noopener,noreferrer');
    } else {
      console.error('Invalid URL:', url);
      alert('This travel portal link is not properly configured. Please contact IT support.');
    }
  };

  // Simple URL validation
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="travel-portal">
      <div className="travel-header">
        <h2><FaPlane /> IT Department Travel Portal</h2>
        <button 
          className="request-btn" 
          onClick={handleNewTripRequest}
          aria-label="Request new trip"
        >
          + New Trip Request
        </button>
      </div>

      <div className="travel-tabs">
        <button 
          className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming Trips
        </button>
        <button 
          className={`tab-btn ${activeTab === 'past' ? 'active' : ''}`}
          onClick={() => setActiveTab('past')}
        >
          Past Trips
        </button>
        <button 
          className={`tab-btn ${activeTab === 'policies' ? 'active' : ''}`}
          onClick={() => setActiveTab('policies')}
        >
          Travel Policies
        </button>
      </div>

      <div className="travel-content">
        {activeTab === 'upcoming' && (
          <div className="trips-list">
            {travelData.upcoming.map(trip => (
              <div 
                key={trip.id} 
                className="trip-card"
                onClick={() => handleViewTripDetails(trip.id)}
                role="button"
                tabIndex={0}
              >
                <div className="trip-icon">
                  {trip.type === 'flight' ? <FaPlane /> : <FaCar />}
                </div>
                <div className="trip-details">
                  <h3>{trip.purpose}</h3>
                  <p><FaMapMarkerAlt /> {trip.destination}</p>
                  <p><FaCalendarAlt /> {trip.date}</p>
                  <div className="trip-meta">
                    <span className={`status ${trip.status.toLowerCase().replace(' ', '-')}`}>
                      {trip.status}
                    </span>
                    <span className="budget">{trip.budget}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'policies' && (
          <div className="policies-list">
            <h3>IT Department Travel Policies</h3>
            <ul>
              {travelData.policies.map((policy, index) => (
                <li key={index}>{policy}</li>
              ))}
            </ul>
            
            <div className="quick-links">
              <h4>Quick Links</h4>
              <div className="link-item">
                <button
                  onClick={() => handleExternalLink('https://travel.itcompany.com')}
                  className="external-link"
                >
                  Corporate Travel Portal <FaExternalLinkAlt />
                </button>
                <span className="link-desc">Book flights, hotels, and rental cars</span>
              </div>
              
              <div className="link-item">
                <button
                  onClick={() => handleExternalLink('https://expenses.itcompany.com')}
                  className="external-link"
                >
                  Expense Reporting <FaExternalLinkAlt />
                </button>
                <span className="link-desc">Submit travel receipts and expenses</span>
              </div>
              
              <div className="link-item">
                <button
                  onClick={() => handleExternalLink('https://visa.itcompany.com')}
                  className="external-link"
                >
                  Visa Assistance <FaExternalLinkAlt />
                </button>
                <span className="link-desc">Get help with visas and work permits</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Travel;