import {
    Card,
    Group,
    Text,
    Progress,
    Badge,
    Button,
    Stack,
  } from '@mantine/core';
  import { IconCalendarCheck } from '@tabler/icons-react';
  
  export default function AttendanceCard() {
    return (
      <Card radius="md" withBorder shadow='sm'>
        <Group align="center">
          <IconCalendarCheck size={24} color="#22c55e" />
          <Stack gap={0}>
            <Text fw={600}>Attendance</Text>
            <Text size="xs" c="dimmed">
              Current month report
            </Text>
          </Stack>
        </Group>
  
        <Group justify="space-between" mt="md">
          <Text size="sm">Status</Text>
          <Badge color="green">Completed</Badge>
        </Group>
  
        <Progress value={100} mt="sm" size="sm" color="green" radius="md" />
  
        <Group justify="space-between" mt="xs" c="gray.6" fz="sm">
          <Text>Present: 20</Text>
          <Text>Missed: 0</Text>
        </Group>
  
        <Button fullWidth mt="md" color="green" radius="md">
          View Report
        </Button>
      </Card>
    );
  }