import React, { useState } from 'react';
import { FaUsers, FaSearch, FaCheckCircle, FaChartLine } from 'react-icons/fa';
import './TeamDashboard.css';

const mockTeamData = [
  { name: 'Sujatha', role: 'Frontend Developer', status: 'present', tasks: 5 },
  { name: 'Ruthu', role: 'Backend Developer', status: 'leave', tasks: 3 },
  { name: 'Alice ', role: 'UI/UX Designer', status: 'present', tasks: 4 },
  { name: 'Michael ', role: 'QA Engineer', status: 'present', tasks: 6 },
  { name: 'Vinay', role: 'DevOps Engineer', status: 'leave', tasks: 2 },
  { name: 'Madhukar', role: 'Product Manager', status: 'present', tasks: 7 },
  { name: 'Evan', role: 'Fullstack Developer', status: 'present', tasks: 4 },
  { name: 'Mayu', role: 'Scrum Master', status: 'present', tasks: 6 },
  { name: 'Aarav Patel', role: 'Data Analyst', status: 'leave', tasks: 1 },
  { name: 'Priya Nair', role: 'Business Analyst', status: 'present', tasks: 3 },
];

const TeamDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTeam = mockTeamData.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const presentCount = mockTeamData.filter(m => m.status === 'present').length;
  const leaveCount = mockTeamData.filter(m => m.status === 'leave').length;
  const totalTasks = mockTeamData.reduce((sum, m) => sum + m.tasks, 0);

  return (
    <div className="team-dashboard">
      <div className="header">
        <FaUsers className="icon" />
        <h2>Team Dashboard</h2>
      </div>

      <div className="stats">
        <div className="stat-card">
          <FaCheckCircle className="stat-icon" />
          <div>
            <h3>{presentCount}</h3>
            <p>Present Today</p>
          </div>
        </div>
        <div className="stat-card">
          <FaChartLine className="stat-icon" />
          <div>
            <h3>{leaveCount}</h3>
            <p>On Leave</p>
          </div>
        </div>
        <div className="stat-card">
          <FaChartLine className="stat-icon" />
          <div>
            <h3>{totalTasks}</h3>
            <p>Total Tasks</p>
          </div>
        </div>
      </div>

      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search team member..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="team-table">
        <h3>Team Members</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Tasks</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeam.map((member, index) => (
              <tr key={index}>
                <td>{member.name}</td>
                <td>{member.role}</td>
                <td>
                  <span className={`status ${member.status}`}>
                    {member.status}
                  </span>
                </td>
                <td>{member.tasks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamDashboard;
