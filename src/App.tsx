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

export default function App() {
  return (
    <>
      <NavBar />
      <Container size="lg" pt={80}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfilePage />}/>
          <Route path="/profile/edit" element={<ProfileEditPage/>}/>
          <Route path="/upload-resume" element={<UploadResumePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/trainings" element={<TrainingsPage/>}/>
          <Route path ="/mytrainings" element={<MyTrainingsPage/>}/>
          <Route path="/opportunities" element={<OpportunitiesPage/>}/>
          <Route path="/applications" element={<ApplicationsPage/>}/>
          <Route path="/attendance-report" element={<AttendanceReport />} />
        </Routes>
      </Container>
    </>
  );
}
