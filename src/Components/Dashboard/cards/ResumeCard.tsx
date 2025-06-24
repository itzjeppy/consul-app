import {
  Card,
  Title,
  Text,
  Badge,
  Progress,
  Button,
  Group,
  Stack,
} from '@mantine/core';
import { IconFile } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export default function ResumeCard() {
  const navigate = useNavigate();

  return (
    <Card withBorder radius="md" shadow="sm" p="md">
      <Stack gap="xs">
        {/* Header */}
        <Group gap="xs">
          <IconFile size={20} color="#228be6" />
          <div>
            <Title order={5}>Resume Status</Title>
            <Text size="xs" c="gray.6">
              Last updated 2 weeks ago
            </Text>
          </div>
        </Group>

        {/* Status */}
        <Group justify="space-between" align="center">
          <Text size="sm">Status</Text>
          <Badge color="blue" variant="filled" size="sm" radius="sm">
            PENDING
          </Badge>
        </Group>

        {/* Progress bar */}
        <Progress value={40} color="blue" size="sm" radius="xl" />

        {/* Filler row */}
        <Group justify="space-between" mt="xs" c="gray.6" fz="sm">
          <Text size="sm" c="gray.6">
            ‎ 
          </Text>
        </Group>

        {/* Button with navigation */}
        <Button
          fullWidth
          color="blue"
          radius="md"
          mt="xs"
          onClick={() => navigate('/upload-resume')}
        >
          Update Resume
        </Button>
      </Stack>
    </Card>
  );
}
