import { Paper, Stack, Title } from '@mantine/core';
import PersonalInfo from './PersonalInfo';
import SkillsCard from './SkillsCard';
import CertificationsCard from './CertificationsCard';
import ProfessionalInfo from './ProfessionalInfo';

export default function ProfilePage() {
  // Get employeeId from localStorage
  const empId = localStorage.getItem('employeeId') || '';
  return (
    <Paper pb="lg">
      <Stack gap="xl">
        <Title order={2}>Consultant Profile</Title>
        <PersonalInfo empId={empId} />
        <SkillsCard />
        <CertificationsCard />
        <ProfessionalInfo
          organization="Tech Solutions Inc."
          recentRole="Senior Frontend Developer"
          recentProject="E-commerce Platform Revamp"
          recentStartDate="2024-01-10"
          recentReleaseDate="2024-06-15"
        />
      </Stack>
    </Paper>
  );
}
