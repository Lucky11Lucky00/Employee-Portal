import React from 'react';
import './Performance.css';
import { FaStar, FaUserTie, FaTasks, FaCommentDots } from 'react-icons/fa';

const performanceData = [
  {
    id: 1,
    name: 'Sujatha',
    designation: 'Software Engineer',
    rating: 4.9,
    progress: 85,
    feedback: 'Excellent problem-solving and collaboration.'
  },
  {
    id: 2,
    name: 'Ruthu',
    designation: 'Frontend Developer',
    rating: 4.5,
    progress: 72,
    feedback: 'Good UI work. Needs improvement in testing.'
  },
  {
    id: 3,
    name: 'Sneha Sharma',
    designation: 'Backend Developer',
    rating: 3.8,
    progress: 90,
    feedback: 'Strong API skills and reliable delivery.'
  }
];

const Performance = () => {
  return (
    <div className="performance-container">
      <h2 className="performance-title">
        <FaTasks className="icon-title" /> Employee Performance Overview
      </h2>
      <div className="performance-grid">
        {performanceData.map((emp) => (
          <div key={emp.id} className="card">
            <div className="card-header">
              <FaUserTie className="user-icon" />
              <div>
                <h3>{emp.name}</h3>
                <p className="designation">{emp.designation}</p>
              </div>
            </div>
            <div className="card-body">
              <div className="progress-label">Goal Completion</div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${emp.progress}%` }}></div>
              </div>
              <div className="rating-section">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < Math.round(emp.rating) ? 'star filled' : 'star'}
                  />
                ))}
                <span className="rating-score">{emp.rating.toFixed(1)}</span>
              </div>
              <div className="feedback">
                <FaCommentDots className="feedback-icon" /> {emp.feedback}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Performance;
