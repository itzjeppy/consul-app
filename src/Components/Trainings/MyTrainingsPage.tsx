import {
     Box,
     Title,
     Stack,
     Card,
     Group,
     Badge,
     Text,
     ActionIcon,
     Divider,
     Progress,
     Button,
     Collapse,
    } from '@mantine/core';
    import {
     IconArrowLeft,
     IconSchool,
     IconCheck,
     IconProgress,
     IconDownload,
    } from '@tabler/icons-react';
    import { useNavigate } from 'react-router-dom';
    import { useState } from 'react';
    
    // Dummy training data
    const trainings = [
     { title: 'React Fundamentals', status: 'In Progress', date: '2024-05-10', progress: 60 },
     { title: 'Agile Basics', status: 'Completed', date: '2024-04-01', certificateUrl: '#' },
     { title: 'TypeScript Essentials', status: 'Completed', date: '2023-11-25', certificateUrl: '#' },
     { title: 'Backend with Node.js', status: 'In Progress', date: '2023-10-12', progress: 35 },
    ];
    
    // Utility: Group trainings by year
    const groupByYear = (list: typeof trainings) => {
     return list.reduce((acc: Record<string, typeof trainings>, curr) => {
      const year = new Date(curr.date).getFullYear().toString();
      acc[year] = acc[year] ? [...acc[year], curr] : [curr];
      return acc;
     }, {});
    };
    
    export function MyTrainingsPage() {
     const navigate = useNavigate();
     const grouped = groupByYear(trainings);
     const [expandedYears, setExpandedYears] = useState<Record<string, boolean>>({});
    
     const toggleYear = (year: string) => {
      setExpandedYears((prev) => ({ ...prev, [year]: !prev[year] }));
     };
    
     const getStatusBadge = (status: string) => (
      <Badge color={status === 'Completed' ? 'green' : 'grape'} variant="light">
       {status}
      </Badge>
     );
    
     const getStatusIcon = (status: string) =>
      status === 'Completed' ? (
       <IconCheck size={20} color="green" />
      ) : (
       <IconProgress size={20} color="orange" />
      );
    
     return (
      <Box p="md">
       <Group align="center" mb="xl">
        <ActionIcon variant="subtle" color="grape.7" onClick={() => navigate(-1)}>
         <IconArrowLeft />
        </ActionIcon>
        <Title order={3}>My Trainings & History</Title>
       </Group>
    
       <Stack gap="lg">
        {Object.keys(grouped)
         .sort((a, b) => Number(b) - Number(a)) // newest year first
         .map((year) => (
          <Box key={year}>
           <Group justify="space-between" mb="xs">
            <Title order={4}>{year}</Title>
            <Button
             size="xs"
             variant="subtle"
             color="grape.7"
             onClick={() => toggleYear(year)}
            >
             {expandedYears[year] ? 'Hide' : 'Show'} Trainings
            </Button>
           </Group>
    
           <Collapse in={expandedYears[year] ?? true}>
            <Stack gap="md">
             {grouped[year].map((t, i) => (
              <Card key={i} withBorder shadow="sm" radius="md" p="md">
               <Group justify="space-between" align="flex-start" mb="xs">
                <Group gap="sm">
                 <IconSchool size={24} color="#AE3EC9" />
                 <div>
                  <Text fw={600}>{t.title}</Text>
                  <Text size="xs" c="dimmed">
                   {t.date}
                  </Text>
                 </div>
                </Group>
                <Group gap="xs">
                 {getStatusIcon(t.status)}
                 {getStatusBadge(t.status)}
                </Group>
               </Group>
    
               <Divider />
    
               {t.status === 'Completed' ? (
                <Group justify="space-between" mt="xs">
                 <Text size="sm" c="dimmed">
                  You successfully completed this training.
                 </Text>
                 <Button
                  size="xs"
                  variant="light"
                  color="green"
                  leftSection={<IconDownload size={14} />}
                  component="a"
                  href={t.certificateUrl}
                  target="_blank"
                 >
                  Certificate
                 </Button>
                </Group>
               ) : (
                <Box mt="xs">
                 <Text size="sm" mb={4} c="dimmed">
                  Progress: {t.progress}%
                 </Text>
                 <Progress value={t.progress ?? 0} color="grape.7" radius="md" />
                </Box>
               )}
              </Card>
             ))}
            </Stack>
           </Collapse>
          </Box>
         ))}
       </Stack>
      </Box>
     );
    }