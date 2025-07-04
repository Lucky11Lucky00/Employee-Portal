import React from 'react';
import {
  FaCalendarAlt,
  FaUserClock,
  FaFileInvoiceDollar,
  FaChalkboardTeacher,
} from 'react-icons/fa';
import './Dashboard.css';

const EmployeeDashboard = () => {
  const handleCardClick = (type) => {
    alert(`${type} card clicked! You can navigate or open a modal.`);
  };

  return (
    <div className="employee-portal">
      <div className="dashboard-content">
        <h2 className="dashboard-title">Welcome to Your Dashboard</h2>
        <div className="metrics-grid">
          <div className="metric-card" onClick={() => handleCardClick('Leave')}>
            <div className="metric-header">
              <FaCalendarAlt className="metric-icon leave" />
              <h3>Leave</h3>
            </div>
            <div className="metric-value">3.4 Days Avg</div>
          </div>

          <div className="metric-card" onClick={() => handleCardClick('Attendance')}>
            <div className="metric-header">
              <FaUserClock className="metric-icon attendance" />
              <h3>Attendance</h3>
            </div>
            <div className="metric-value">96% Present</div>
          </div>

          <div className="metric-card" onClick={() => handleCardClick('Payslip')}>
            <div className="metric-header">
              <FaFileInvoiceDollar className="metric-icon payslip" />
              <h3>Payslip</h3>
            </div>
            <div className="metric-value highlight">View Payslip</div>
          </div>

          <div className="metric-card" onClick={() => handleCardClick('Training')}>
            <div className="metric-header">
              <FaChalkboardTeacher className="metric-icon training" />
              <h3>Training</h3>
            </div>
            <div className="metric-value highlight">Enroll</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
