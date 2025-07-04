import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaClock, FaCalendarAlt, FaLaptop, FaUserClock, FaChartLine, FaCalendarPlus } from 'react-icons/fa';
import './Attendance.css';

const Attendance = () => {
  const navigate = useNavigate();

  // Sample data - in a real app this would come from API
  const attendanceData = {
    currentMonth: {
      attendanceRate: 96,
      lateArrivals: 2,
      remoteDays: 8,
      overtimeHours: 12.5
    },
    recentLogs: [
      { date: '2023-06-15', checkIn: '09:02', checkOut: '18:15', status: 'On-time' },
      { date: '2023-06-14', checkIn: '10:15', checkOut: '19:30', status: 'Late' },
      { date: '2023-06-13', checkIn: '08:55', checkOut: '17:45', status: 'On-time' }
    ]
  };

  const handleRemoteRequest = () => {
    // Navigate to remote request form
    navigate('/remote-request');
    console.log("Navigating to remote request form");
  };

  const handleShiftRequest = (shiftType) => {
    // Process shift request
    console.log(`Requesting ${shiftType} shift`);
    // In a real app, this would trigger an API call or form
    alert(`${shiftType} shift request submitted!`);
  };

  return (
    <div className="attendance-page">
      <h2><FaUserClock className="header-icon" /> Attendance</h2>
      
      <div className="attendance-grid">
        {/* Main Attendance Stats */}
        <div className="attendance-card primary">
          <div className="card-header">
            <FaChartLine className="card-icon" />
            <h3>Monthly Performance</h3>
          </div>
          <div className="card-content">
            <div className="metric">
              <span className="value">{attendanceData.currentMonth.attendanceRate}%</span>
              <span className="label">Attendance Rate</span>
            </div>
            <div className="metric">
              <span className="value">{attendanceData.currentMonth.lateArrivals}</span>
              <span className="label">Late Arrivals</span>
            </div>
            <div className="metric">
              <span className="value">{attendanceData.currentMonth.remoteDays}</span>
              <span className="label">Remote Days</span>
            </div>
            <div className="metric">
              <span className="value">{attendanceData.currentMonth.overtimeHours}h</span>
              <span className="label">Overtime</span>
            </div>
          </div>
        </div>

        {/* Daily Log */}
        <div className="attendance-card">
          <div className="card-header">
            <FaClock className="card-icon" />
            <h3>Recent Logs</h3>
          </div>
          <div className="card-content">
            <table className="log-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Check-In</th>
                  <th>Check-Out</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.recentLogs.map((log, index) => (
                  <tr key={index}>
                    <td>{log.date}</td>
                    <td>{log.checkIn}</td>
                    <td>{log.checkOut}</td>
                    <td className={`status ${log.status.toLowerCase().replace('-', '')}`}>{log.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Actions */}
        <div className="attendance-card">
          <div className="card-header">
            <FaLaptop className="card-icon" />
            <h3>Remote Work</h3>
          </div>
          <div className="card-content">
            <p>Request remote work days for server maintenance or on-call support</p>
            <button 
              className="action-btn"
              onClick={handleRemoteRequest}
            >
              <FaCalendarPlus /> Request Remote Day
            </button>
          </div>
        </div>

        <div className="attendance-card">
          <div className="card-header">
            <FaCalendarAlt className="card-icon" />
            <h3>Flex Time</h3>
          </div>
          <div className="card-content">
            <p>IT Department allows flexible hours for system updates and maintenance windows</p>
            <div className="flex-options">
              <button 
                className="action-btn secondary"
                onClick={() => handleShiftRequest('Early')}
              >
                Early Shift
              </button>
              <button 
                className="action-btn secondary"
                onClick={() => handleShiftRequest('Late')}
              >
                Late Shift
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;