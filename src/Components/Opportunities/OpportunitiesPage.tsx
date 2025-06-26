import {
     Box,
     Card,
     Title,
     Text,
     Button,
     SimpleGrid,
     Stack,
     Badge,
     Group,
     ActionIcon,
     TextInput,
     Select,
    } from '@mantine/core';
    import {
     IconBriefcase,
     IconArrowRight,
     IconArrowLeft,
     IconSearch,
     IconFilter,
    } from '@tabler/icons-react';
    import { useNavigate } from 'react-router-dom';
    import { useState } from 'react';
    
    const dummyOpportunities = [
     {
      title: 'Frontend Developer',
      company: 'TechCorp',
      description: 'Work with React and TypeScript to build modern UIs.',
      level: 'Intermediate',
     },
     {
      title: 'Backend Developer',
      company: 'ServerBase',
      description: 'Develop scalable APIs with Node.js and Express.',
      level: 'Advanced',
     },
     {
      title: 'AI Research Intern',
      company: 'MindLabs',
      description: 'Contribute to ML model training and analysis.',
      level: 'Beginner',
     },
    ];
    
    export default function OpportunitiesPage() {
     const navigate = useNavigate();
     const [search, setSearch] = useState('');
     const [filter, setFilter] = useState('');
    
     const filteredOpportunities = dummyOpportunities.filter((job) =>
      (job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase())) &&
      (filter === '' || job.level === filter)
     );
    
     return (
      <Box p="lg">
       <Group align="center" justify="space-between" mb="xl">
        <Group align="center">
         <ActionIcon variant="subtle" color="yellow.7" onClick={() => navigate(-1)}>
          <IconArrowLeft />
         </ActionIcon>
         <Title order={2}>Recommended Opportunities</Title>
        </Group>
        <Button
         variant="light"
         color="yellow.8"
         rightSection={<IconArrowRight size={16} />}
         onClick={() => navigate('/applications')}
        >
         View Applications
        </Button>
       </Group>
    
       {/* Search and Filter Controls */}
       <Group mb="lg" gap="md" wrap="wrap">
        <TextInput
         leftSection={<IconSearch size={16} />}
         placeholder="Search roles or companies..."
         value={search}
         onChange={(e) => setSearch(e.currentTarget.value)}
        />
        <Select
         leftSection={<IconFilter size={16} />}
         placeholder="Filter by level"
         data={['Beginner', 'Intermediate', 'Advanced']}
         value={filter}
         onChange={(v) => setFilter(v || '')}
         clearable
        />
       </Group>
    
       {/* Opportunity Cards */}
       <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {filteredOpportunities.map((job, index) => (
         <Card
          key={index}
          shadow="md"
          radius="md"
          withBorder
          p="lg"
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 220 }}
         >
          <Stack gap="xs">
           <Group justify="space-between">
            <Group gap="xs">
             <IconBriefcase size={20} />
             <Title order={5}>{job.title}</Title>
            </Group>
            <Badge color="yellow" variant="light">
             {job.level}
            </Badge>
           </Group>
    
           <Text size="sm" c="dimmed">
            {job.company}
           </Text>
           <Text size="sm">{job.description}</Text>
          </Stack>
    
          <Button mt="md" fullWidth color="yellow" variant="filled">
           Apply Now
          </Button>
         </Card>
        ))}
       </SimpleGrid>
    
       {filteredOpportunities.length === 0 && (
        <Text size="sm" c="dimmed" mt="lg" ta="center">
         No opportunities match your search or filter.
        </Text>
       )}
      </Box>
     );
    }