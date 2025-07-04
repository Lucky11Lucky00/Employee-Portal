import React, { useState } from 'react';
import './Leave.css';

const Leave = () => {
  // Leave types for IT company
  const leaveTypes = [
    'Paid Leave',
    'Sick Leave',
    'WFH Request',
    'Emergency Leave',
    'Maternity/Paternity',
    'Project Off'
  ];

  const [formData, setFormData] = useState({
    leaveType: 'Paid Leave',
    startDate: '',
    endDate: '',
    reason: '',
    contact: '',
    projectImpact: false,
    handoverPerson: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [leaveBalance, setLeaveBalance] = useState({
    paidLeave: 12,
    sickLeave: 8,
    wfh: 5
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Leave submitted:', formData);
    setSubmitted(true);
    // API call would go here
  };

  return (
    <div className="leave-page">
      <h2>Leave Management</h2>
      
      <div className="leave-container">
        {/* Leave Balance Card */}
        <div className="balance-card">
          <h3>Your Leave Balance</h3>
          <ul>
            <li>Paid Leave: <strong>{leaveBalance.paidLeave} days</strong></li>
            <li>Sick Leave: <strong>{leaveBalance.sickLeave} days</strong></li>
            <li>WFH Available: <strong>{leaveBalance.wfh} days</strong></li>
          </ul>
        </div>

        {/* Leave Application Form */}
        <div className="form-card">
          {submitted ? (
            <div className="success-message">
              <h3>✓ Leave Request Submitted</h3>
              <p>Your {formData.leaveType} request from {formData.startDate} to {formData.endDate} has been received.</p>
              <p>Request ID: IT-LEAVE-{Math.floor(Math.random() * 10000)}</p>
              <button onClick={() => setSubmitted(false)}>New Request</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Leave Type *</label>
                <select 
                  name="leaveType" 
                  value={formData.leaveType}
                  onChange={handleChange}
                  required
                >
                  {leaveTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="date-group">
                <div className="form-group">
                  <label>Start Date *</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>End Date *</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Reason *</label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Briefly explain the reason for leave"
                  required
                />
              </div>

              <div className="form-group">
                <label>Emergency Contact During Leave</label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="Phone number"
                />
              </div>

              {formData.leaveType !== 'WFH Request' && (
                <div className="form-group checkbox-group">
                  <input
                    type="checkbox"
                    id="projectImpact"
                    name="projectImpact"
                    checked={formData.projectImpact}
                    onChange={handleChange}
                  />
                  <label htmlFor="projectImpact">
                    This will impact any active project deadlines
                  </label>
                </div>
              )}

              {formData.projectImpact && (
                <div className="form-group">
                  <label>Handover To *</label>
                  <input
                    type="text"
                    name="handoverPerson"
                    value={formData.handoverPerson}
                    onChange={handleChange}
                    placeholder="Team member name"
                    required={formData.projectImpact}
                  />
                </div>
              )}

              <button type="submit" className="submit-btn">
                Submit Leave Request
              </button>
            </form>
          )}
        </div>

        {/* Leave History */}
        <div className="history-card">
          <h3>Recent Leave History</h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Days</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>15-20 Jun 2025</td>
                <td>Paid Leave</td>
                <td>5</td>
                <td className="approved">Approved</td>
              </tr>
              <tr>
                <td>5 May 2025</td>
                <td>WFH</td>
                <td>1</td>
                <td className="approved">Approved</td>
              </tr>
              <tr>
                <td>12 Apr 2025</td>
                <td>Sick Leave</td>
                <td>2</td>
                <td className="approved">Approved</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leave;