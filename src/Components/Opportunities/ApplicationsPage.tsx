import {
    Card,
    Title,
    Text,
    Badge,
    Stack,
    SimpleGrid,
    Group,
    Box,
    ActionIcon,
    useMantineTheme,
    useComputedColorScheme,
    // Divider, // removed unused import
    // rem, // removed unused import
  } from '@mantine/core';
  import { IconArrowLeft, IconBriefcase } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
  
  const dummyApplications = [
    {
      id: 1,
      name: 'Frontend Developer',
      skills_expected: 'React, TypeScript',
      years_of_experience_required: 2,
      deadline: '2025-07-10',
      status: 'Under Review',
    },
    {
      id: 2,
      name: 'Backend Developer',
      skills_expected: 'Node.js, Express',
      years_of_experience_required: 3,
      deadline: '2025-07-15',
      status: 'Interview Scheduled',
    },
    {
      id: 3,
      name: 'AI Research Intern',
      skills_expected: 'Python, ML',
      years_of_experience_required: 0,
      deadline: '2025-07-20',
      status: 'Applied',
    },
  ];
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Interview Scheduled':
        return 'blue';
      case 'Under Review':
        return 'yellow';
      case 'Applied':
        return 'teal'; // Changed from gray to teal for better dark theme contrast
      default:
        return 'gray';
    }
  };
  
  export default function ApplicationsPage() {
    const theme = useMantineTheme();
    const colorScheme = useComputedColorScheme('light');
    const isDark = colorScheme === 'dark';
    const navigate = useNavigate();
  
    return (
      <Box p="lg">
        <Group justify="flex-start" mb="xl" gap="md">
          <ActionIcon
            variant="subtle"
            color="yellow.7"
            onClick={() => navigate(-1)}
            size="lg"
          >
            <IconArrowLeft />
          </ActionIcon>
          <Title order={2}>My Applications</Title>
        </Group>
  
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
          {dummyApplications.map((app) => (
            <Card
              key={app.id}
              withBorder
              shadow="md"
              radius="md"
              p="lg"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: 240,
                background: isDark ? '#2d3142' : '#fff',
                borderColor: isDark ? theme.colors.dark[4] : theme.colors.gray[3],
              }}
            >
              <Stack gap="xs">
                <Group justify="space-between" align="flex-start">
                  <Group gap={8} align="center" style={{ width: '100%' }}>
                    <IconBriefcase size={22} color={theme.colors.yellow[6]} />
                    <Title order={5} style={{ fontWeight: 700, fontSize: 18, color: isDark ? theme.white : '#222', flex: 1 }}>{app.name}</Title>
                    <Badge
                      color={getStatusColor(app.status)}
                      size="md"
                      style={{
                        fontWeight: 700,
                        fontSize: 13,
                        color: app.status === 'Interview Scheduled' ? '#fff' : app.status === 'Applied' ? '#fff' : isDark ? theme.colors.dark[7] : '#222',
                        background:
                          app.status === 'Under Review'
                            ? isDark
                              ? theme.colors.yellow[6]
                              : '#fef9c3'
                            : app.status === 'Interview Scheduled'
                            ? isDark
                              ? theme.colors.blue[6]
                              : theme.colors.blue[2]
                            : app.status === 'Applied'
                            ? isDark
                              ? theme.colors.teal[6]
                              : theme.colors.teal[2]
                            : undefined,
                        borderRadius: 999,
                        padding: '4px 16px',
                        textTransform: 'uppercase',
                        letterSpacing: 0.5,
                        marginLeft: 8,
                        height: 28,
                        alignSelf: 'center',
                      }}
                    >
                      {app.status}
                    </Badge>
                  </Group>
                </Group>
                <Group gap={8} align="center" mt={4} mb={2}>
                  <Badge color="yellow" variant="light" size="sm" style={{ color: isDark ? theme.colors.dark[7] : '#222', background: isDark ? theme.colors.yellow[6] : '#fef9c3' }}>Skills</Badge>
                  <Text size="sm" style={{ color: isDark ? theme.white : '#222', fontWeight: 500 }}>{app.skills_expected}</Text>
                </Group>
                <Group gap={8} align="center" mb={2}>
                  <Badge color="yellow" variant="light" size="sm" style={{ color: isDark ? theme.colors.dark[7] : '#222', background: isDark ? theme.colors.yellow[6] : '#fef9c3' }}>Experience</Badge>
                  <Text size="sm" style={{ color: isDark ? theme.white : '#222' }}>{app.years_of_experience_required} year{app.years_of_experience_required !== 1 ? 's' : ''}</Text>
                </Group>
                <Group gap={8} align="center">
                  <Badge color="yellow" variant="light" size="sm" style={{ color: isDark ? theme.colors.dark[7] : '#222', background: isDark ? theme.colors.yellow[6] : '#fef9c3' }}>Deadline</Badge>
                  <Text size="sm" style={{ color: isDark ? theme.white : '#222' }}>{app.deadline}</Text>
                </Group>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    );
  }