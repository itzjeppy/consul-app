import {
    Paper,
    Title,
    Text,
    Button,
    Group,
    Stack,
  } from '@mantine/core';
  
  interface WelcomeBannerProps {
    userName: string;
  }
  
  export default function WelcomeBanner({ userName }: WelcomeBannerProps) {
    return (
      <Paper
        radius="md"
        p="lg"
        style={{
          background: 'linear-gradient(to right, #5c6ac4, #805ad5)',
          color: 'white',
        }}
      >
        <Group justify="space-between" align="center" wrap="wrap">
          <Stack gap="xs">
            <Title order={2}>Welcome back, {userName}!</Title>
            <Text c="white" opacity={0.85}>
              Here's your current status and action items
            </Text>
          </Stack>
          <Button variant="white" color="dark">
            View Full Profile
          </Button>
        </Group>
      </Paper>
    );
  }
  