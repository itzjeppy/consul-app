import {
  Card,
  Group,
  Text,
  Progress,
  Badge,
  Button,
  Stack,
} from '@mantine/core';
import { IconFile } from '@tabler/icons-react';

export default function ResumeCard() {
  return (
    <Card radius="md" withBorder shadow="sm">
      {/* Top: Icon + Title */}
      <Group align="center">
        <IconFile size={24} color="#228be6" />
        <Stack gap={0}>
          <Text fw={600}>Resume Status</Text>
          <Text size="xs" c="dimmed">
            Last updated 2 weeks ago
          </Text>
        </Stack>
      </Group>

      {/* Status */}
      <Group justify="space-between" mt="md">
        <Text size="sm">Status</Text>
        <Badge color="blue">Pending</Badge>
      </Group>

      {/* Progress */}
      <Progress value={40} mt="sm" size="sm" color="blue" radius="md" />

      {/* Metadata Row (filler info like other cards) */}
      <Group justify="space-between" mt="xs" c="gray.6" fz="sm">
        <Text>‎ </Text>
        <Text>‎ </Text>
      </Group>

      {/* CTA */}
      <Button fullWidth mt="md" color="blue" radius="md">
        Update Resume
      </Button>
    </Card>
  );
}
