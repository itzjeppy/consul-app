import React, { useEffect, useState } from 'react';
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

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return date.toLocaleDateString(undefined, { weekday: 'long' });
  } else {
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
}

export default function ResumeCard() {
  const navigate = useNavigate();
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);

  useEffect(() => {
    const storedDate = localStorage.getItem('last_resume_update');
    if (storedDate) {
      setLastUpdate(storedDate);
    }
  }, []);

  const handleUpload = () => {
    const today = new Date().toISOString();
    localStorage.setItem('last_resume_update', today);
    setLastUpdate(today);
    navigate('/upload-resume');
  };

  const status = lastUpdate ? 'UPDATED' : 'PENDING';
  const progress = lastUpdate ? 100 : 0;
  const lastUpdateText = lastUpdate
    ? `Last updated ${formatDate(lastUpdate)}`
    : 'You have not uploaded your resume yet';

  return (
    <Card withBorder radius="md" shadow="sm" p="md">
      <Stack gap="xs">
        {/* Header */}
        <Group gap="xs">
          <IconFile size={20} color="#228be6" />
          <div>
            <Title order={5}>Resume Status</Title>
            <Text size="xs" c="gray.6">
              {lastUpdateText}
            </Text>
          </div>
        </Group>

        {/* Status */}
        <Group justify="space-between" align="center">
          <Text size="sm">Status</Text>
          <Badge color="blue" variant="filled" size="sm" radius="sm">
            {status}
          </Badge>
        </Group>

        {/* Progress bar */}
        <Progress value={progress} color="blue" size="sm" radius="xl" />

        {/* Spacer row */}
        <Group justify="space-between" mt="xs" c="gray.6" fz="sm">
          <Text size="sm" c="gray.6">
            ‎
          </Text>
        </Group>

        {/* Button */}
        <Button
          fullWidth
          color="blue"
          radius="md"
          mt="xs"
          onClick={handleUpload}
        >
          {lastUpdate ? 'Update Resume' : 'Upload Resume'}
        </Button>
      </Stack>
    </Card>
  );
}
