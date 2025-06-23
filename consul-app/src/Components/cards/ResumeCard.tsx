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
      <Card radius="md" withBorder>
        <Group align="center">
          <IconFile size={24} color="#3b82f6" />
          <Stack gap={0}>
            <Text fw={600}>Resume Status</Text>
            <Text size="xs" c="dimmed">
              Last updated 2 weeks ago
            </Text>
          </Stack>
        </Group>
  
        <Group justify="space-between" mt="md">
          <Text size="sm">Status</Text>
          <Badge color="blue">Pending</Badge>
        </Group>
  
        <Progress value={50} mt="sm" size="sm" color="blue" radius="md" />
  
        <Button fullWidth mt="md" color="blue" radius="md">
          Update Resume
        </Button>
      </Card>
    );
  }
  