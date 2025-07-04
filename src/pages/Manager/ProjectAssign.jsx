import React, { useState } from 'react';
import './ProjectAssign.css';
import { FaClipboardList, FaUserPlus } from 'react-icons/fa';

const ProjectAssign = () => {
  const [formData, setFormData] = useState({
    employeeId: '',
    projectId: '',
    projectName: '',
    startDate: '',
    endDate: '',
  });

  const [assignments, setAssignments] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.employeeId &&
      formData.projectId &&
      formData.projectName &&
      formData.startDate &&
      formData.endDate
    ) {
      setAssignments(prev => [...prev, formData]);
      alert('Project assigned successfully');
      setFormData({
        employeeId: '',
        projectId: '',
        projectName: '',
        startDate: '',
        endDate: '',
      });
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <div className="project-assign-container">
      <h2 className="title">
        <FaClipboardList className="icon" /> Project Assignment
      </h2>

      <form className="assign-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Employee ID</label>
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            placeholder="E.g. EMP123"
            required
          />
        </div>

        <div className="form-group">
          <label>Project ID</label>
          <input
            type="text"
            name="projectId"
            value={formData.projectId}
            onChange={handleChange}
            placeholder="E.g. PRJ456"
            required
          />
        </div>

        <div className="form-group">
          <label>Project Name</label>
          <input
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            placeholder="E.g. CRM Redesign"
            required
          />
        </div>

        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="assign-btn">
          <FaUserPlus /> Assign Project
        </button>
      </form>

      <h3 className="assigned-title">Assigned Projects</h3>
      <ul className="assignment-list">
        {assignments.map((a, index) => (
          <li key={index} className="assignment-card">
            <strong>{a.projectName}</strong> ({a.projectId})<br />
            Assigned to: {a.employeeId}<br />
            Duration: {a.startDate} to {a.endDate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectAssign;
