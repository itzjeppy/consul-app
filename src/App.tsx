import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from '@mantine/core';
import NavBar from './Components/Global/NavBar';
import Dashboard from './Components/Dashboard/Dashboard';
import ProfilePage from './Components/Profile/ProfilePage';
import UploadResumePage from './Components/Resume/UploadResume';
import AuthPage from './Components/Auth/AuthPage';
import OpportunitiesPage from './Components/Opportunities/OpportunitiesPage';
import ApplicationsPage from './Components/Opportunities/ApplicationsPage';
import { TrainingsPage } from './Components/Trainings/TrainingsPage';
import { MyTrainingsPage } from './Components/Trainings/MyTrainingsPage';
import ProfileEditPage from './Components/Profile/EditProfile';
import AttendanceReport from './Components/Attendance/AttendanceReport';
import React from 'react';

// Simple auth check (replace with real auth in production)
function isAuthenticated() {
  return localStorage.getItem('isLoggedIn') === 'true';
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!isAuthenticated()) {
    return <Navigate to="/auth?tab=signup" replace />;
  }
  return <>{children}</>;
}

export default function App() {
  return (
    <>
      <NavBar />
      <Container size="lg" pt={80}>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/"
            element={
              isAuthenticated() ? <Navigate to="/dashboard" /> : <Navigate to="/auth?tab=signup" />
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/edit"
            element={
              <ProtectedRoute>
                <ProfileEditPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload-resume"
            element={
              <ProtectedRoute>
                <UploadResumePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trainings"
            element={
              <ProtectedRoute>
                <TrainingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mytrainings"
            element={
              <ProtectedRoute>
                <MyTrainingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/opportunities"
            element={
              <ProtectedRoute>
                <OpportunitiesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/applications"
            element={
              <ProtectedRoute>
                <ApplicationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendance-report"
            element={
              <ProtectedRoute>
                <AttendanceReport />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Container>
    </>
  );
}
