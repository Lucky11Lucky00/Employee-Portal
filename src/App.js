import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import './App.css';
import CustomNavbar from './components/CustomNavbar';
import Sidebar from './components/Sidebar';

import Dashboard from './pages/Dashboard';
import Leave from './pages/Leave';
import Attendance from './pages/Attendance';
import Payslip from './pages/Payslip';
import Training from './pages/Training';
import Travel from './pages/Travel';
import Profile from './pages/Profile';
import UpdateRequest from './pages/UpdateRequest';
import Approvals from './pages/Manager/Approvals';
import TeamDashboard from './pages/Manager/TeamDashboard';
import Performance from './pages/Manager/Performance';
import ProjectAssign from './pages/Manager/ProjectAssign';

const AppContent = () => {
  const location = useLocation();
  const [activePage, setActivePage] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const pathToPage = {
      '/': 'Dashboard',
      '/dashboard': 'Dashboard',
      '/leave': 'Leave',
      '/attendance': 'Attendance',
      '/payslip': 'Payslip',
      '/training': 'Training',
      '/travel': 'Travel',
      '/profile': 'Profile',
      '/update-request': 'UpdateRequest',
      '/approvals': 'Approvals',
      '/team-dashboard': 'TeamDashboard',
      '/performance': 'Performance',
      '/project-assign': 'ProjectAssign'
    };
    const currentPage = pathToPage[location.pathname] || 'Dashboard';
    setActivePage(currentPage);
  }, [location]);

  const pageComponents = {
    Dashboard: <Dashboard />,
    Leave: <Leave />,
    Attendance: <Attendance />,
    Payslip: <Payslip />,
    Training: <Training />,
    Travel: <Travel />,
    Profile: <Profile />,
    UpdateRequest: <UpdateRequest />,
    Approvals: <Approvals />,
    TeamDashboard: <TeamDashboard />,
    Performance: <Performance />,
    ProjectAssign: <ProjectAssign />
  };

  return (
    <div className="app">
      <CustomNavbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="main-content">
        <Sidebar activePage={activePage} setActivePage={setActivePage} isOpen={isSidebarOpen} />
        <div className="content-area">
          {pageComponents[activePage]}
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
