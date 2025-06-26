import {
    Box,
    Card,
    Title,
    Text,
    Badge,
    Button,
    Group,
    Stack,
    Grid,
    ActionIcon,
    Input,
    TextInput,
    Select,
    SimpleGrid,
    Divider,
  } from '@mantine/core';
  import {
    IconSchool,
    IconArrowRight,
    IconArrowLeft,
    IconSearch,
    IconFilter,
  } from '@tabler/icons-react';
  import { useNavigate } from 'react-router-dom';
  import { useState } from 'react';
import TrainingCard from './TrainingCard';
  
  const recommendedTrainings = [
    {
      title: 'Advanced React Development',
      description: 'Deepen your React knowledge with hooks, context, and performance optimization.',
      level: 'Intermediate',
      tags: ['React', 'Frontend', 'Web'],
    },
    {
      title: 'Backend with Node.js & Express',
      description: 'Learn how to build scalable backend services using Express and Node.',
      level: 'Beginner',
      tags: ['Node.js', 'Backend', 'API'],
    },
  ];
  
  const allTrainings = [
    ...recommendedTrainings,
    {
      title: 'AI-Powered Resume Writing',
      description: 'Craft smarter resumes using AI tools to better match opportunities.',
      level: 'Beginner',
      tags: ['Resume', 'AI', 'Career'],
    },
    {
      title: 'Mastering TypeScript',
      description: 'Enhance your JavaScript code with TypeScript for better reliability and productivity.',
      level: 'Advanced',
      tags: ['TypeScript', 'JavaScript'],
    },
  ];
  
  export function TrainingsPage() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');
  
    const filteredTrainings = allTrainings.filter(
      (t) =>
        (t.title.toLowerCase().includes(search.toLowerCase()) ||
          t.description.toLowerCase().includes(search.toLowerCase())) &&
        (filter === '' || t.level === filter)
    );
  
    return (
      <Box p="md">
        <Group align="center" justify="space-between" gap="xl" mb="xl">
        <Group align="center" justify="flex-start">   
          <ActionIcon variant="subtle" color="grape.7" onClick={() => navigate(-1)}>
            <IconArrowLeft />
          </ActionIcon>
          <Title order={1}>
            <Group gap="xs">
              <IconSchool size={24} /> Recommended Trainings for You
            </Group>
          </Title>
          </Group>
          <Button
            variant="light"
            color="grape.7"
            rightSection={<IconArrowRight size={16} />}
            onClick={() => navigate("/mytrainings")}
          >
            Your Trainings
          </Button>
        </Group>
  
        <Grid gutter="md" mb="xl">
          {recommendedTrainings.map((training, index) => (
            <Grid.Col span={{ base: 12, sm: 6 }} key={index}>
              <TrainingCard training={training} priority={true} />
            </Grid.Col>
          ))}
        </Grid>
            
        <Divider mb="lg"/>
        <Title order={2} mb="lg">Other Trainings</Title>
        <Group mb="md">
          <TextInput
            leftSection={<IconSearch size={16} />}
            placeholder="Search trainings..."
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
          />
          <Select
            leftSection={<IconFilter size={16} />}
            data={["Beginner", "Intermediate", "Advanced"]}
            placeholder="Filter by level"
            value={filter}
            onChange={(v) => setFilter(v || '')}
            clearable
          />
        </Group>
  
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          {filteredTrainings.map((training, index) => (
            <TrainingCard key={index} training={training} />
          ))}
        </SimpleGrid>
      </Box>
    );
  }
  
  