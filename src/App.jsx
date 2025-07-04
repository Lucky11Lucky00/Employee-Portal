// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import CustomNavbar from './components/CustomNavbar';
import Sidebar from './components/Sidebar';

// Pages
import Dashboard from './pages/Dashboard';
import Leave from './pages/Leave';
import Attendance from './pages/Attendance';
import Payslip from './pages/Payslip';
import Training from './pages/Training';
import Travel from './pages/Travel';
import Profile from './pages/Profile';
import UpdateRequest from './pages/UpdateRequest';

// Manager Pages
import Approvals from './pages/Manager/Approvals';
import TeamDashboard from './pages/Manager/TeamDashboard';
import Performance from './pages/Manager/Performance';
import ProjectAssign from './pages/Manager/ProjectAssign';

function App() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleToggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleLogin = (username) => {
    setLoggedInUser(username); // ✅ Will update user after login
  };

  return (
    <div className="app">
      <Router>
        <CustomNavbar
          toggleSidebar={handleToggleSidebar}
          onLogin={handleLogin}            // ✅ correctly passed
          loggedInUser={loggedInUser}
        />
        <div className="main-content">
          <Sidebar isVisible={isSidebarVisible} />
          <div className="content-area">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/leave" element={<Leave />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/payslip" element={<Payslip />} />
              <Route path="/training" element={<Training />} />
              <Route path="/travel" element={<Travel />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/update-request" element={<UpdateRequest />} />
              <Route path="/approvals" element={<Approvals />} />
              <Route path="/team-dashboard" element={<TeamDashboard />} />
              <Route path="/performance" element={<Performance />} />
              <Route path="/project-assign" element={<ProjectAssign />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
