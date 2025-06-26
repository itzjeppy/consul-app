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
    Divider,
    rem,
  } from '@mantine/core';
  import { IconArrowLeft, IconBriefcase } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
  
  const dummyApplications = [
    {
      title: 'Frontend Developer',
      company: 'TechCorp',
      status: 'Under Review',
    },
    {
      title: 'Backend Developer',
      company: 'ServerBase',
      status: 'Interview Scheduled',
    },
    {
      title: 'AI Research Intern',
      company: 'MindLabs',
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
      default:
        return 'gray';
    }
  };
  
  export default function ApplicationsPage() {
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
          {dummyApplications.map((app, index) => (
            <Card
              key={index}
              withBorder
              shadow="md"
              radius="md"
              p="lg"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: rem(200),
              }}
            >
              <Stack gap="xs" h="100%">
                <Group justify="space-between">
                  <Title order={5}>{app.title}</Title>
                  <Badge color={getStatusColor(app.status)} variant="filled">
                    {app.status}
                  </Badge>
                </Group>
  
                <Text size="sm" c="dimmed">
                  <IconBriefcase size={14} style={{ marginRight: 4 }} />
                  {app.company}
                </Text>
  
                <Divider my="xs" />
  
                <Text size="sm">
                  Status update:
                  <Text span fw={600} c="dark">
                    {' '}
                    {app.status}
                  </Text>
                </Text>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    );
  }