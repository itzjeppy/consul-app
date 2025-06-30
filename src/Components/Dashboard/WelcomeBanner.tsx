import {
  Paper,
  Title,
  Text,
  Button,
  Group,
  Stack,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { getConsultantByEmpId } from '../../api/consultant';

interface WelcomeBannerProps {
  userName: string;
}

export default function WelcomeBanner({ userName }: WelcomeBannerProps) {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
      <Paper
          radius="md"
          p="lg"
          shadow="sm"
          style={{
              background: 'linear-gradient(to right,rgb(84, 104, 231),rgb(172, 93, 232))',
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
              <Button 
                  variant="white" 
                  color="dark" 
                  onClick={() => navigate('/profile')} // Add onClick handler
              >
                  View Full Profile
              </Button>
          </Group>
      </Paper>
  );
}