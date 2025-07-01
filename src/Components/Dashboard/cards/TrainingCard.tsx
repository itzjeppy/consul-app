import React, { useEffect, useState } from 'react';
import {
  Card,
  Group,
  Text,
  Progress,
  Badge,
  Button,
  Stack,
  Loader,
  Center,
} from '@mantine/core';
import { IconSchool } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { getConsultantByEmpId } from '../../../api/consultant';
import { getConsultantTrainingsByConsultantId } from '../../../api/ConsultantTrainings';

interface TrainingInfo {
  completedModules: number;
  totalModules: number;
  dueInDays: number;
  status: 'In Progress' | 'Completed';
}

export default function TrainingCard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [training, setTraining] = useState<TrainingInfo | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchTrainingData() {
      try {
        const empId = localStorage.getItem('employeeId');
        if (!empId) {
          setError('Employee ID not found');
          setLoading(false);
          return;
        }

        const consultantRes = await getConsultantByEmpId(Number(empId));
        const consultantId = consultantRes.consultant?.id;

        if (!consultantId) {
          setError('Consultant not found');
          setLoading(false);
          return;
        }

        const trainingRes = await getConsultantTrainingsByConsultantId(consultantId);
        const trainingData = trainingRes.consultant_trainings || [];

        if (trainingData.length === 0) {
          setTraining(null);
        } else {
          const completedModules = trainingData.filter((t: any) => t.completed).length;
          const totalModules = trainingData.length;
          const dueInDays = 5; // Replace with actual logic if needed

          setTraining({
            completedModules,
            totalModules,
            dueInDays,
            status: completedModules === totalModules ? 'Completed' : 'In Progress',
          });
        }
      } catch (err) {
        setError('Failed to load training data');
      } finally {
        setLoading(false);
      }
    }

    fetchTrainingData();
  }, []);

  if (loading) {
    return (
      <Card radius="md" withBorder shadow="sm" p="lg">
        <Center><Loader /></Center>
      </Card>
    );
  }

  if (error) {
    return (
      <Card radius="md" withBorder shadow="sm" p="lg">
        <Text color="red">{error}</Text>
      </Card>
    );
  }

  if (!training) {
    return (
      <Card radius="md" withBorder shadow="sm" p="lg">
        <Stack align="center" justify="space-between" h="100%">
        <Group align="center">
          <IconSchool size={24} color="#a855f7" />
          <Stack gap={0}>
            <Text fw={600}>Training</Text>
            <Text size="xs" c="dimmed">Your trainings</Text>
          </Stack>
        <Text size="sm" mt="md">You haven't started any trainings yet.</Text>
        </Group>
        <Button fullWidth mt="md" color="purple" radius="md" onClick={() => navigate('/trainings')}>
          View Trainings
        </Button>
      </Stack>
      </Card>
    );
  }

  const { completedModules, totalModules, dueInDays, status } = training;
  const progress = Math.round((completedModules / totalModules) * 100);

  return (
    <Card radius="md" withBorder shadow="sm" p="lg">
      <Group align="center">
        <IconSchool size={24} color="#a855f7" />
        <Stack gap={0}>
          <Text fw={600}>Training</Text>
          <Text size="xs" c="dimmed">Current progress</Text>
        </Stack>
      </Group>

      <Group justify="space-between" mt="md">
        <Text size="sm">Status</Text>
        <Badge color="purple">{status}</Badge>
      </Group>

      <Progress value={progress} mt="sm" size="sm" color="purple" radius="md" />

      <Group justify="space-between" mt="xs" c="gray.6" fz="sm">
        <Text>Modules: {completedModules}/{totalModules}</Text>
        <Text>Due: {dueInDays} days</Text>
      </Group>

      <Button fullWidth mt="md" color="purple" radius="md" onClick={() => navigate('/trainings')}>
        Continue Training
      </Button>
    </Card>
  );
}
