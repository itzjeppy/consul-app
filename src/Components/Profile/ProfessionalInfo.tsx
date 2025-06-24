import {
    Card,
    Text,
    Stack,
  } from '@mantine/core';
  
  interface ProfessionalInfoProps {
    organization: string;
    recentRole: string;
    recentProject: string;
    recentStartDate: string;
    recentReleaseDate: string;
  }
  
  export default function ProfessionalInfo({
    organization,
    recentRole,
    recentProject,
    recentStartDate,
    recentReleaseDate
}: ProfessionalInfoProps) {
    return (
      <Card withBorder shadow="sm" radius="md">
        <Text fw={600} mb="sm">Professional Information</Text>
        <Stack justify="xs">
          <Text><strong>Last Worked Organization:</strong> {organization}</Text>
          <Text><strong>Recent Role:</strong> {recentRole}</Text>
          <Text><strong>Recent Project:</strong> {recentProject}</Text>
          <Text><strong>Recent Start Date:</strong> {recentStartDate}</Text>
          <Text><strong>Recent Project Release Date:</strong> {recentReleaseDate}</Text>
        </Stack>
      </Card>
    );
  }
    