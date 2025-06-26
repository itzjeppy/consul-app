import {
    Card,
    Text,
    Stack,
    useMantineColorScheme
  } from '@mantine/core';
import { IconBuilding, IconBriefcase, IconFolder, IconCalendarEvent, IconCalendarCheck } from '@tabler/icons-react';
  
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
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const cardBg = isDark
    ? 'linear-gradient(90deg, #232946 60%, #3b3b5b 100%)'
    : 'linear-gradient(90deg, #f8fafc 60%, #e0e7ff 100%)';
  const titleColor = isDark ? 'gray.0' : 'indigo.7';
  const labelColor = isDark ? 'gray.5' : 'gray.6';
  const valueColor = isDark ? 'gray.1' : 'indigo.8';

    return (
      <Card withBorder shadow="md" radius="md" p="lg" style={{ background: cardBg }}>
        <Text fw={700} size="lg" mb="sm" c={titleColor} style={{ letterSpacing: 0.5 }}>Professional Information</Text>
        <Stack gap="md">
          <Stack gap={0}>
            <Text size="sm" c={labelColor} fw={500} mb={2}><IconBuilding size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} /> Last Worked Organization</Text>
            <Text size="md" fw={600} c={valueColor}>{organization}</Text>
          </Stack>
          <Stack gap={0}>
            <Text size="sm" c={labelColor} fw={500} mb={2}><IconBriefcase size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} /> Recent Role</Text>
            <Text size="md" fw={600} c={isDark ? 'gray.1' : undefined}>{recentRole}</Text>
          </Stack>
          <Stack gap={0}>
            <Text size="sm" c={labelColor} fw={500} mb={2}><IconFolder size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} /> Recent Project</Text>
            <Text size="md" fw={600} c={isDark ? 'gray.1' : undefined}>{recentProject}</Text>
          </Stack>
          <Stack gap={0}>
            <Text size="sm" c={labelColor} fw={500} mb={2}><IconCalendarEvent size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} /> Recent Start Date</Text>
            <Text size="md" fw={600} c={isDark ? 'gray.1' : undefined}>{recentStartDate}</Text>
          </Stack>
          <Stack gap={0}>
            <Text size="sm" c={labelColor} fw={500} mb={2}><IconCalendarCheck size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} /> Recent Project Release Date</Text>
            <Text size="md" fw={600} c={isDark ? 'gray.1' : undefined}>{recentReleaseDate}</Text>
          </Stack>
        </Stack>
      </Card>
    );
  }
