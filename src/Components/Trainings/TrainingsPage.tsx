import {
  Box,
  Title,
  Button,
  Group,
  TextInput,
  Select,
  SimpleGrid,
  Divider,
  Loader,
  ActionIcon,
  Grid,
} from '@mantine/core';
import {
  IconSchool,
  IconArrowRight,
  IconArrowLeft,
  IconSearch,
  IconFilter,
  IconPlayerPlay,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TrainingCard from './TrainingCard';
import { getTrainingsByIds, getAllTrainings } from '../../api/training';
import { addConsultantTraining } from '../../api/ConsultantTrainings';
import { showNotification } from '@mantine/notifications';
import { getConsultantByEmpId } from '../../api/consultant';

export function TrainingsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [recommendedTrainings, setRecommendedTrainings] = useState<any[]>([]);
  const [allTrainings, setAllTrainings] = useState<any[]>([]);
  const [starting, setStarting] = useState<number | null>(null); // training id being started
  const [consultantId, setConsultantId] = useState<number | null>(null);

  // Replace with actual emp_id logic (from auth/session)
  const emp_id =
    localStorage.getItem('employeeId') || sessionStorage.getItem('employeeId');

  // On mount, fetch consultant_id using emp_id
  useEffect(() => {
    async function fetchConsultantId() {
      if (!emp_id) {
        setConsultantId(null);
        return;
      }
      try {
        const data = await getConsultantByEmpId(Number(emp_id));
        // Assume backend returns { consultant: { id: ..., ... } } or similar
        if (data && data.consultant && data.consultant.id) {
          setConsultantId(data.consultant.id);
        } else if (data && data.id) {
          setConsultantId(data.id);
        } else {
          setConsultantId(null);
          showNotification({
            color: 'red',
            title: 'Error',
            message: 'Consultant not found for your employee ID.',
          });
        }
      } catch (e: any) {
        setConsultantId(null);
        showNotification({
          color: 'red',
          title: 'Error',
          message: e?.message || 'Failed to fetch consultant information.',
        });
      }
    }
    fetchConsultantId();
  }, [emp_id]);

  // Helper to normalize backend objects to frontend shape
  function normalizeTraining(t: any) {
    return {
      id: t.id,
      title: t.title || t.training_name || '',
      description: t.description || t.technologies_learnt || '',
      level: t.level || t.level_of_training || '',
      duration: t.duration,
      technologies_learnt: t.technologies_learnt || ''
    };
  }

  // Fetch recommended trainings from agent
  useEffect(() => {
    async function fetchRecommendations() {
      setLoading(true);
      try {
        // 1. Call LLM agent for recommended training IDs
        const aiRes = await fetch('http://127.0.0.1:5000/api/agent/TrainingsMatcher', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Emp-ID': emp_id ?? '', // fallback for robustness
          },
          body: JSON.stringify({}),
        });
        const aiData = await aiRes.json();
        const matches: number[] = Array.isArray(aiData.matches) ? aiData.matches : [];

        // 2. Get the training details for the recommended IDs
        let recTrainings: any[] = [];
        if (matches.length > 0) {
          recTrainings = await getTrainingsByIds(matches);
        }
        setRecommendedTrainings(recTrainings.map(normalizeTraining));

        // 3. Fetch all trainings for display below
        const allTrs = await getAllTrainings();
        setAllTrainings((allTrs || []).map(normalizeTraining));
      } catch (e: any) {
        showNotification({
          color: 'red',
          title: 'Error',
          message: e?.message || 'Failed to fetch recommended trainings or all trainings.',
        });
        setRecommendedTrainings([]);
        setAllTrainings([]);
      }
      setLoading(false);
    }

    fetchRecommendations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emp_id]);

  // Exclude recommended from "all" for "other trainings"
  const recommendedIds = new Set(recommendedTrainings.map((t) => t.id));
  const otherTrainings = allTrainings.filter((t) => !recommendedIds.has(t.id));
  const filteredTrainings = otherTrainings.filter(
    (t) =>
      (t.title?.toLowerCase().includes(search.toLowerCase()) ||
        t.description?.toLowerCase().includes(search.toLowerCase())) &&
      (filter === '' || t.level === filter)
  );

  // Handler for "Start Training"
  async function handleStartTraining(training_id: number) {
    if (!consultantId) {
      showNotification({
        color: 'red',
        title: 'Error',
        message: 'Consultant ID not available. Please contact support.',
      });
      return;
    }
    setStarting(training_id);
    try {
      await addConsultantTraining({
        consultant_id: consultantId,
        training_id,
        attended_hours: 0,
      });
      navigate('/mytrainings'); // <-- Navigate after success
    } catch (e: any) {
      showNotification({
        color: 'red',
        title: 'Error',
        message: e?.message || 'Failed to start training.',
      });
    }
    setStarting(null);
  }

  // TrainingCard with Start Training button override
  function TrainingCardWithStart({ training, priority = false }: { training: any; priority?: boolean }) {
    return (
      <TrainingCard
        training={training}
        priority={priority}
        actionButton={
          <Button
            leftSection={<IconPlayerPlay size={16} />}
            variant="filled"
            color="grape.7"
            loading={starting === training.id}
            disabled={starting === training.id}
            onClick={() => handleStartTraining(training.id)}
            style={{ alignSelf: 'flex-end', marginTop: 'auto' }}
          >
            Start Training
          </Button>
        }
      />
    );
  }

  return (
    <Box p="md">
      <Group align="center" justify="space-between" gap="xl" mb="xl">
        <Group align="center" justify="flex-start">
          <ActionIcon variant="subtle" color="grape.7" onClick={() => navigate(-1)}>
            <IconArrowLeft />
          </ActionIcon>
          <Title order={1}>
            <Group gap="xs">
              <IconSchool size={24} /> Recommended Trainings for You
            </Group>
          </Title>
        </Group>
        <Button
          variant="light"
          color="grape.7"
          rightSection={<IconArrowRight size={16} />}
          onClick={() => navigate("/mytrainings")}
        >
          Your Trainings
        </Button>
      </Group>

      {loading ? (
        <Group justify="center" my={60}><Loader size="xl" /></Group>
      ) : (
        <>
          {/* Recommended Trainings */}
          <Grid gutter="md" mb="xl">
            {recommendedTrainings.length === 0 ? (
              <Box c="dimmed" p="md" ta="center">
                No personalized recommendations yet.
              </Box>
            ) : (
              recommendedTrainings.map((training, index) => (
                <Grid.Col span={{ base: 12, sm: 6 }} key={training.id || index}>
                  <TrainingCardWithStart training={training} priority={true} />
                </Grid.Col>
              ))
            )}
          </Grid>
          <Divider mb="lg" />
          {/* Other Trainings */}
          <Title order={2} mb="lg">Other Trainings</Title>
          <Group mb="md">
            <TextInput
              leftSection={<IconSearch size={16} />}
              placeholder="Search trainings..."
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
            />
            <Select
              leftSection={<IconFilter size={16} />}
              data={["Beginner", "Intermediate", "Advanced"]}
              placeholder="Filter by level"
              value={filter}
              onChange={(v) => setFilter(v || '')}
              clearable
            />
          </Group>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            {filteredTrainings.map((training, index) => (
              <TrainingCardWithStart key={training.id || index} training={training} />
            ))}
          </SimpleGrid>
        </>
      )}
    </Box>
  );
}