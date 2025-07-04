import React, { useState } from 'react';
import './Training.css';
import { FaBook, FaCheckCircle, FaClock, FaPlay } from 'react-icons/fa';

const Training = () => {
  const [trainings, setTrainings] = useState([
    {
      id: 1,
      title: 'Advanced React Patterns',
      type: 'Online Course',
      duration: '8h',
      deadline: '30/06/2025',
      status: 'Pending Approval'
    },
    {
      id: 2,
      title: 'AWS Certification',
      type: 'Certification',
      duration: '40h',
      deadline: '15/08/2025',
      status: 'In Progress'
    }
  ]);

  const [availableCourses] = useState([
    'Microservices Architecture',
    'Docker & Kubernetes',
    'GraphQL Fundamentals',
    'CI/CD Pipelines'
  ]);

  const handleEnroll = (courseName) => {
    alert(`You have successfully enrolled in "${courseName}"`);
    // Optional: Add to "My Trainings" list dynamically
    // setTrainings([...trainings, { id: Date.now(), title: courseName, type: 'Online Course', status: 'Pending Approval' }]);
  };

  return (
    <div className="training-page">
      <h2><FaBook className="icon-heading" /> Training & Development</h2>

      <div className="training-grid">
        <div className="training-card">
          <h3>📚 My Trainings</h3>
          <table className="training-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {trainings.map(training => (
                <tr key={training.id}>
                  <td>{training.title}</td>
                  <td>{training.type}</td>
                  <td>
                    <span className={`status-tag ${training.status.replace(' ', '').toLowerCase()}`}>
                      {training.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="training-card">
          <h3>🚀 Available Courses</h3>
          <ul className="course-list">
            {availableCourses.map((course, index) => (
              <li key={index}>
                <span><FaPlay /> {course}</span>
                <button className="enroll-btn" onClick={() => handleEnroll(course)}>Enroll</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Training;
