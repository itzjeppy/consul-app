import {
    Card,
    Group,
    Text,
    Progress,
    Badge,
    Button,
    Stack,
  } from '@mantine/core';
  import { IconBriefcase } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
  
  export default function OpportunitiesCard() {

    const navigate = useNavigate();


    return (
      <Card radius="md" withBorder shadow='sm'>
        <Group align="center">
          <IconBriefcase size={24} color="#eab308" />
          <Stack gap={0}>
            <Text fw={600}>Opportunities</Text>
            <Text size="xs" c="dimmed">
              Potential projects
            </Text>
          </Stack>
        </Group>
  
        <Group justify="space-between" mt="md">
          <Text size="sm">Status</Text>
          <Badge color="yellow">Active</Badge>
        </Group>
  
        <Progress value={75} mt="sm" size="sm" color="yellow" radius="md" />
  
        <Group justify="space-between" mt="xs" c="gray.6" fz="sm">
          <Text>Total: 12</Text>
          <Text>Applied: 9</Text>
        </Group>
  
        <Button fullWidth mt="md" color="yellow" radius="md" onClick={() => navigate("/opportunities")}>
          View Opportunities
        </Button>
      </Card>
    );
  }
  