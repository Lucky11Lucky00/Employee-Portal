import React, { useState } from 'react';
import './Approvals.css';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const mockRequests = [
  {
    id: 1,
    name: 'John Doe',
    type: 'Leave',
    reason: 'Fever - needs 2 days off',
    status: 'Pending'
  },
  {
    id: 2,
    name: 'Ravi Kumar',
    type: 'Travel',
    reason: 'Client Visit - Mumbai',
    status: 'Pending'
  }
];

const Approvals = () => {
  const [requests, setRequests] = useState(mockRequests);

  const handleApprove = (id) => {
    const updated = requests.map((req) =>
      req.id === id ? { ...req, status: 'Approved' } : req
    );
    setRequests(updated);
  };

  const handleReject = (id) => {
    const updated = requests.map((req) =>
      req.id === id ? { ...req, status: 'Rejected' } : req
    );
    setRequests(updated);
  };

  return (
    <div className="approvals-container">
      <h2 className="approvals-title">Manager Approvals</h2>

      {requests.length === 0 ? (
        <p className="no-requests">No pending requests.</p>
      ) : (
        <div className="cards-wrapper">
          {requests.map((req) => (
            <div key={req.id} className={`approval-card ${req.status.toLowerCase()}`}>
              <div className="card-header">
                <h3>{req.name}</h3>
                <span className="badge">{req.type}</span>
              </div>
              <p className="reason">{req.reason}</p>
              <div className="card-footer">
                <span className={`status ${req.status.toLowerCase()}`}>{req.status}</span>
                {req.status === 'Pending' && (
                  <div className="action-buttons">
                    <button className="approve" onClick={() => handleApprove(req.id)}>
                      <FaCheckCircle /> Approve
                    </button>
                    <button className="reject" onClick={() => handleReject(req.id)}>
                      <FaTimesCircle /> Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Approvals;
