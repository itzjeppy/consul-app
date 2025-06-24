import { Stack, Title } from '@mantine/core';
import PersonalInfo from './PersonalInfo';
import SkillsCard from './SkillsCard';
import CertificationsCard from './CertificationsCard';
import ProfessionalInfo from './ProfessionalInfo';

export default function ProfilePage() {
  return (
    <Stack gap="xl">
      <Title order={2}>Consultant Profile</Title>
      <PersonalInfo
        name="Sarah Johnson"
        empId="E12345"
        mobile="+91 98765 43210"
        email="sarah.johnson@example.com"
        address="123 Main St, New Delhi, India"
        currentRole="Frontend Consultant"
      />
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
  );
}
