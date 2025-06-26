import {
    Card,
    Group,
    Text,
    Progress,
    Badge,
    Button,
    Stack,
  } from '@mantine/core';
  import { IconSchool } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
  
  export default function TrainingCard() {

    const navigate = useNavigate();
    return (
      <Card radius="md" withBorder shadow='sm'>
        <Group align="center">
          <IconSchool size={24} color="#a855f7" />
          <Stack gap={0}>
            <Text fw={600}>Training</Text>
            <Text size="xs" c="dimmed">
              Current progress
            </Text>
          </Stack>
        </Group>
  
        <Group justify="space-between" mt="md">
          <Text size="sm">Status</Text>
          <Badge color="purple">In Progress</Badge>
        </Group>
  
        <Progress value={65} mt="sm" size="sm" color="purple" radius="md" />
  
        <Group justify="space-between" mt="xs" c="gray.6" fz="sm">
          <Text>Modules: 4/6</Text>
          <Text>Due: 5 days</Text>
        </Group>
  
        <Button fullWidth mt="md" color="purple" radius="md" onClick={() => navigate("/trainings")}>
          Continue Training
        </Button>
      </Card>
    );
  }