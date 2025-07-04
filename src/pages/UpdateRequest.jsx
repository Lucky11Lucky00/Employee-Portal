import React, { useState } from 'react';
import './UpdateRequest.css';

const UpdateRequest = () => {
  const [requests, setRequests] = useState([
    { id: 1, type: 'Personal Information Update', status: 'pending', date: '2023-06-15', description: 'Name change request' },
    { id: 2, type: 'Document Upload', status: 'approved', date: '2023-05-20', description: 'Degree certificate upload' },
    { id: 3, type: 'Access Request', status: 'rejected', date: '2023-04-10', description: 'Request for admin access' }
  ]);

  const [formData, setFormData] = useState({
    requestType: '',
    description: '',
    attachments: null
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate API call
    setSubmissionStatus('submitting');
    
    setTimeout(() => {
      const newRequest = {
        id: requests.length + 1,
        type: formData.requestType || 'Personal Information Update',
        status: Math.random() > 0.5 ? 'approved' : 'rejected',
        date: new Date().toISOString().split('T')[0],
        description: formData.description
      };
      
      setRequests([newRequest, ...requests]);
      setFormData({
        requestType: '',
        description: '',
        attachments: null
      });
      
      setSubmissionStatus('success');
      setTimeout(() => setSubmissionStatus(null), 3000);
    }, 1500);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return 'status-approved';
      case 'rejected': return 'status-rejected';
      default: return 'status-pending';
    }
  };

  return (
    <div className="update-request-page">
      <h2>Update Request</h2>
      
      <div className="update-request-content">
        {/* Request Form */}
        <div className="request-form">
          <h3>Submit Update Request</h3>
          
          {submissionStatus === 'success' && (
            <div className="alert alert-success">
              Your request has been submitted successfully!
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="requestType">Request Type</label>
              <select 
                id="requestType" 
                name="requestType"
                className="form-control"
                value={formData.requestType}
                onChange={handleChange}
                required
              >
                <option value="">Select request type</option>
                <option value="Personal Information Update">Personal Information Update</option>
                <option value="Document Upload">Document Upload</option>
                <option value="Access Request">Access Request</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea 
                id="description" 
                name="description"
                className="form-control" 
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Please describe your request in detail"
                required
              ></textarea>
            </div>
            
            <div className="form-group">
              <label htmlFor="attachments">Attachments (Optional)</label>
              <input 
                type="file" 
                id="attachments" 
                name="attachments"
                className="form-control"
                onChange={handleChange}
              />
            </div>
            
            <button 
              type="submit" 
              className="submit-btn"
              disabled={submissionStatus === 'submitting'}
            >
              {submissionStatus === 'submitting' ? 'Submitting...' : 'Submit Request'}
            </button>
          </form>
        </div>
        
        {/* Request History */}
        <div className="request-history">
          <h3>Your Previous Requests</h3>
          
          {requests.length === 0 ? (
            <p>No previous requests found</p>
          ) : (
            <div className="history-list">
              {requests.map(request => (
                <div key={request.id} className="history-item">
                  <p><strong>Request #{request.id}</strong> - {request.type}</p>
                  <p>Description: {request.description}</p>
                  <p>Status: <span className={getStatusColor(request.status)}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span></p>
                  <p>Submitted: {request.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateRequest;