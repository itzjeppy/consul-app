import {
  Box,
  Title,
  Stack,
  Card,
  Group,
  Badge,
  Text,
  ActionIcon,
  Divider,
  Progress,
  Button,
  Collapse,
  Loader,
} from '@mantine/core';
import {
  IconArrowLeft,
  IconSchool,
  IconCheck,
  IconProgress,
  IconDownload,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { showNotification } from '@mantine/notifications';
import { getConsultantTrainingsByConsultantId } from '../../api/ConsultantTrainings';
import { getTrainingsByIds } from '../../api/training';
import { getConsultantByEmpId } from '../../api/consultant';

// Utility: Group trainings by year
const groupByYear = (list: any[]) => {
  return list.reduce((acc: Record<string, any[]>, curr) => {
    const year = new Date(curr.date).getFullYear().toString();
    acc[year] = acc[year] ? [...acc[year], curr] : [curr];
    return acc;
  }, {});
};

export function MyTrainingsPage() {
  const navigate = useNavigate();
  const [expandedYears, setExpandedYears] = useState<Record<string, boolean>>({});
  const [trainings, setTrainings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // For simulating attended_hours increase
  const [simulated, setSimulated] = useState<Record<number, number>>({});

  // Replace with actual emp_id logic (from auth/session)
  const emp_id =
    localStorage.getItem('employeeId') || sessionStorage.getItem('employeeId');

  useEffect(() => {
    async function fetchMyTrainings() {
      setLoading(true);
      try {
        if (!emp_id) {
          throw new Error('Employee ID not found');
        }
        // 1. Get consultant id by emp_id
        const consultantData = await getConsultantByEmpId(Number(emp_id));
        const consultant_id: number =
          (consultantData && consultantData.consultant && consultantData.consultant.id) ||
          consultantData.id;
        if (!consultant_id) throw new Error('Consultant not found for this employee ID');

        // 2. Get consultant's trainings (join table)
        const trainingsData = await getConsultantTrainingsByConsultantId(consultant_id);
        // trainingsData.consultant_trainings: [{ training_id, attended_hours, ... }]
        const consultantTrainings: any[] = trainingsData.consultant_trainings || [];
        if (consultantTrainings.length === 0) {
          setTrainings([]);
          setLoading(false);
          return;
        }

        // 3. Get the details for all unique training IDs, cast to number[]
        const trainingIds: number[] = Array.from(
          new Set(
            consultantTrainings
              .map((ct: any) => Number(ct.training_id))
              .filter((id: number) => typeof id === 'number' && !isNaN(id))
          )
        );
        const detailedTrainings = await getTrainingsByIds(trainingIds);

        // Create a map for fast lookup
        const trainingDetailsMap: Record<number, any> = {};
        detailedTrainings.forEach((dt: any) => {
          trainingDetailsMap[dt.id as number] = dt;
        });

        // 4. Merge progress/status info from consultantTrainings into detailedTrainings
        const merged = consultantTrainings.map((ct: any) => {
          const details = trainingDetailsMap[Number(ct.training_id)] || {};
          let attended_hours =
            simulated[ct.training_id] !== undefined
              ? simulated[ct.training_id]
              : ct.attended_hours || 0;
          let status: string;
          let certificateUrl: string | undefined = undefined;
          let duration = details.duration || 1;
          let progress = Math.round((attended_hours / duration) * 100);
          if (
            typeof attended_hours === 'number' &&
            typeof duration === 'number' &&
            attended_hours >= duration
          ) {
            status = 'Completed';
            certificateUrl = details.certificate_url || '#'; // Adjust to your backend's return
            progress = 100;
          } else {
            status = 'In Progress';
            if (progress > 100) progress = 100;
            if (progress < 0) progress = 0;
          }
          return {
            ...details,
            ...ct,
            // Prefer details.title/description/etc
            title: details.title || details.training_name || 'Untitled Training',
            description: details.description || details.technologies_learnt || '',
            duration: duration,
            status,
            progress,
            certificateUrl,
            attended_hours,
            date:
              ct.updated_at ||
              ct.created_at ||
              ct.date ||
              details.date ||
              new Date().toISOString().slice(0, 10), // fallback
          };
        });

        setTrainings(merged);
      } catch (e: any) {
        showNotification({
          color: 'red',
          title: 'Error',
          message: e?.message || 'Failed to fetch your trainings.',
        });
      }
      setLoading(false);
    }

    fetchMyTrainings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emp_id, simulated]);

  const grouped = groupByYear(trainings);

  const toggleYear = (year: string) => {
    setExpandedYears((prev) => ({ ...prev, [year]: !prev[year] }));
  };

  const getStatusBadge = (status: string) => (
    <Badge color={status === 'Completed' ? 'green' : 'grape'} variant="light">
      {status}
    </Badge>
  );

  const getStatusIcon = (status: string) =>
    status === 'Completed' ? (
      <IconCheck size={20} color="green" />
    ) : (
      <IconProgress size={20} color="orange" />
    );

  // Simulate increasing attended_hours for a training (for demonstration)
  const handleSimulateProgress = (training_id: number, maxHours: number, currentHours: number) => {
    setSimulated((prev) => ({
      ...prev,
      [training_id]: Math.min(currentHours + Math.max(1, Math.floor(maxHours / 10)), maxHours),
    }));
  };

  return (
    <Box p="md">
      <Group align="center" mb="xl">
        <ActionIcon variant="subtle" color="grape.7" onClick={() => navigate(-1)}>
          <IconArrowLeft />
        </ActionIcon>
        <Title order={3}>My Trainings & History</Title>
      </Group>

      {loading ? (
        <Group justify="center" my={60}>
          <Loader size="xl" />
        </Group>
      ) : trainings.length === 0 ? (
        <Box c="dimmed" ta="center" my="lg">
          You have not started any trainings yet.
        </Box>
      ) : (
        <Stack gap="lg">
          {Object.keys(grouped)
            .sort((a, b) => Number(b) - Number(a)) // newest year first
            .map((year) => (
              <Box key={year}>
                <Group justify="space-between" mb="xs">
                  <Title order={4}>{year}</Title>
                  <Button
                    size="xs"
                    variant="subtle"
                    color="grape.7"
                    onClick={() => toggleYear(year)}
                  >
                    {expandedYears[year] ? 'Hide' : 'Show'} Trainings
                  </Button>
                </Group>

                <Collapse in={expandedYears[year] ?? true}>
                  <Stack gap="md">
                    {grouped[year].map((t, i) => (
                      <Card key={i} withBorder shadow="sm" radius="md" p="md">
                        <Group justify="space-between" align="flex-start" mb="xs">
                          <Group gap="sm">
                            <IconSchool size={24} color="#AE3EC9" />
                            <div>
                              <Text fw={600}>{t.title}</Text>
                              <Text size="xs" c="dimmed">
                                {t.date}
                              </Text>
                            </div>
                          </Group>
                          <Group gap="xs">
                            {getStatusIcon(t.status)}
                            {getStatusBadge(t.status)}
                          </Group>
                        </Group>

                        <Divider />

                        <Text size="sm" mb={4} mt={4}>
                          {t.description}
                        </Text>

                        <Text size="sm" mt={4}>
                          Attended Hours: {t.attended_hours} / {t.duration}
                        </Text>

                        {t.status === 'Completed' ? (
                          <Group justify="space-between" mt="xs">
                            <Text size="sm" c="dimmed">
                              You successfully completed this training.
                            </Text>
                            <Button
                              size="xs"
                              variant="light"
                              color="green"
                              leftSection={<IconDownload size={14} />}
                              component="a"
                              href={t.certificateUrl}
                              target="_blank"
                              disabled={!t.certificateUrl || t.certificateUrl === '#'}
                            >
                              Certificate
                            </Button>
                          </Group>
                        ) : (
                          <Box mt="xs">
                            <Text size="sm" mb={4} c="dimmed">
                              Progress: {t.progress}%
                            </Text>
                            <Progress value={t.progress ?? 0} color="grape.7" radius="md" />

                            <Button
                              size="xs"
                              mt="sm"
                              variant="outline"
                              color="grape.7"
                              onClick={() =>
                                handleSimulateProgress(
                                  t.training_id,
                                  t.duration,
                                  t.attended_hours
                                )
                              }
                              disabled={t.progress >= 100}
                            >
                              Simulate Attend Hour +
                            </Button>
                          </Box>
                        )}
                      </Card>
                    ))}
                  </Stack>
                </Collapse>
              </Box>
            ))}
        </Stack>
      )}
    </Box>
  );
}