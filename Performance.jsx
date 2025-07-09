import React, { useState } from 'react';
import './Performance.css';
import {
  FaStar, FaUserTie, FaTasks, FaCommentDots,
  FaPlus, FaSave, FaEdit, FaTrash, FaShare
} from 'react-icons/fa';

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
  const [reviews, setReviews] = useState([
    { id: 1, name: '', employeeId: '', title: '', notes: '', editable: true, shared: false }
  ]);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (id, field, value) => {
    setReviews(prev =>
      prev.map(r => r.id === id ? { ...r, [field]: value } : r)
    );
  };

  const handleSave = (id) => {
    setReviews(prev =>
      prev.map(r => r.id === id ? { ...r, editable: false } : r)
    );
  };

  const handleEdit = (id) => {
    setReviews(prev =>
      prev.map(r => r.id === id ? { ...r, editable: true } : r)
    );
  };

  const handleDelete = (id) => {
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  const handleAddNew = () => {
    const newId = reviews.length + 1;
    setReviews(prev => [
      ...prev,
      { id: newId, name: '', employeeId: '', title: '', notes: '', editable: true, shared: false }
    ]);
  };

  const handleCheckbox = (id, checked) => {
    setReviews(prev =>
      prev.map(r => r.id === id ? { ...r, shared: checked } : r)
    );

    // If checked, store in localStorage (simulate sending to manager)
    if (checked) {
      const sharedReview = reviews.find(r => r.id === id);
      if (
        sharedReview.name && sharedReview.employeeId &&
        sharedReview.title && sharedReview.notes
      ) {
        const existing = JSON.parse(localStorage.getItem('sharedToManager')) || [];
        const updated = [...existing, sharedReview];
        localStorage.setItem('sharedToManager', JSON.stringify(updated));
      }
    }
  };

  const handleSubmit = () => {
    // Save locally
    localStorage.setItem('submittedReviews', JSON.stringify(reviews));
    setSubmitMessage('✅ Submitted Successfully! Reviews saved locally.');

    // Reset form (optional)
    setReviews([
      { id: 1, name: '', employeeId: '', title: '', notes: '', editable: true, shared: false }
    ]);
  };

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

      <h2 className="performance-title">📝 Year-End Review Submission</h2>

      {reviews.map((rev) => (
        <div key={rev.id} className="review-card">
          <label>
            Name:
            <input
              type="text"
              value={rev.name}
              disabled={!rev.editable}
              onChange={(e) => handleInputChange(rev.id, 'name', e.target.value)}
            />
          </label>
          <label>
            Employee ID:
            <input
              type="text"
              value={rev.employeeId}
              disabled={!rev.editable}
              onChange={(e) => handleInputChange(rev.id, 'employeeId', e.target.value)}
            />
          </label>
          <label>
            Review Title:
            <input
              type="text"
              value={rev.title}
              disabled={!rev.editable}
              onChange={(e) => handleInputChange(rev.id, 'title', e.target.value)}
            />
          </label>
          <label>
            Notes:
            <textarea
              value={rev.notes}
              disabled={!rev.editable}
              onChange={(e) => handleInputChange(rev.id, 'notes', e.target.value)}
            />
          </label>

          <label className="checkbox-label">
            <FaShare /> Share with Manager:
            <input
              type="checkbox"
              checked={rev.shared}
              onChange={(e) => handleCheckbox(rev.id, e.target.checked)}
            />
          </label>

          <div className="review-actions">
            {rev.editable ? (
              <button onClick={() => handleSave(rev.id)}><FaSave /> Save</button>
            ) : (
              <button onClick={() => handleEdit(rev.id)}><FaEdit /> Edit</button>
            )}
            <button onClick={() => handleDelete(rev.id)}><FaTrash /> Delete</button>
          </div>
        </div>
      ))}

      <div className="review-controls">
        <button onClick={handleAddNew}><FaPlus /> Add New Review</button>
        <button onClick={handleSubmit}>Submit All</button>
      </div>

      {submitMessage && (
        <div className="success-message">
          {submitMessage}
        </div>
      )}
    </div>
  );
};

export default Performance;
