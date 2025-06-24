import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from '@mantine/core';
import NavBar from './Components/Global/NavBar';
import Dashboard from './Components/Dashboard/Dashboard';
import ProfilePage from './Components/Profile/ProfilePage';
import UploadResumePage from './Components/Resume/UploadResume';
import AuthPage from './Components/Auth/AuthPage';

export default function App() {
  return (
    <>
      <NavBar />
      <Container size="lg" pt={80}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/upload-resume" element={<UploadResumePage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </Container>
    </>
  );
}
