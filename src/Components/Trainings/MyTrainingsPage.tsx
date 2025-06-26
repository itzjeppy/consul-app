import { Box, Title, Stack, Card, Group, Badge, Text } from "@mantine/core";

export function MyTrainingsPage() {
    const trainings = [
      { title: 'React Fundamentals', status: 'In Progress', date: '2024-05-10' },
      { title: 'Agile Basics', status: 'Completed', date: '2024-04-01' },
    ];
  
    return (
      <Box p="md">
        <Title order={3} mb="lg">
          My Trainings & History
        </Title>
  
        <Stack gap="md">
          {trainings.map((t, i) => (
            <Card key={i} withBorder shadow="sm" radius="md">
              <Group justify="space-between">
                <div>
                  <Text fw={500}>{t.title}</Text>
                  <Text size="xs" c="dimmed">
                    {t.status} • {t.date}
                  </Text>
                </div>
                <Badge color={t.status === 'Completed' ? 'green' : 'yellow'}>
                  {t.status}
                </Badge>
              </Group>
            </Card>
          ))}
        </Stack>
      </Box>
    );
  }