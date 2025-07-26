import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CandidateAnalytics from './pages/CandidateAnalytics';
import CandidateDetails from './pages/CandidateDetails';
import JobRoleIntelligence from './pages/JobRoleIntelligence';
import JobRoleDetails from './pages/JobRoleDetails';
import Profile from './pages/Profile';

import './styles/animations.css';
import Settings from './pages/About';
import About from './pages/About';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const HRRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const user = localStorage.getItem('user');
  const userRole = user ? JSON.parse(user).role : null;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (userRole !== 'hr') {
    return <Navigate to="/dashboard" />;
  }
  
  return children;
};

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route 
            path="candidates" 
            element={
              <HRRoute>
                <CandidateAnalytics />
              </HRRoute>
            } 
          />
          <Route 
            path="candidates/:id" 
            element={
              <HRRoute>
                <CandidateDetails />
              </HRRoute>
            } 
          />
          <Route path="job-roles" element={<JobRoleIntelligence />} />
          <Route path="job-roles/:id" element={<JobRoleDetails />} />
          <Route path="profile" element={<Profile />} />
          {/* <Route path="market-mapping" element={<div className="p-4">Market Mapping coming soon</div>} />
          <Route path="competitors" element={<div className="p-4">Competitor Analysis coming soon</div>} /> */}
          <Route path="about" element={
            <About />
          } />
          <Route path="*" element={<div className="p-4">Page not found</div>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;