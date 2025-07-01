import {
  Box,
  Card,
  Title,
  Text,
  Button,
  SimpleGrid,
  Stack,
  Badge,
  Group,
  ActionIcon,
  TextInput,
  Select,
  useMantineTheme,
  useComputedColorScheme,
  Loader,
} from '@mantine/core';
import {
  IconBriefcase,
  IconArrowRight,
  IconArrowLeft,
  IconSearch,
  IconFilter,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getOpportunitiesByIds, getAllOpportunities } from '../../api/opportunity';
import { addConsultantOpportunity } from '../../api/consultantOpportunity';

const RECOMMENDED_OPPS_KEY = 'recommended_opportunities';
const RECOMMENDED_OPPS_TS_KEY = 'recommended_opportunities_timestamp';
const RECOMMENDED_OPPS_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

async function fetchRecommendedOpportunities(emp_id: string | null): Promise<number[]> {
  if (!emp_id) return [];
  try {
    const aiRes = await fetch('http://127.0.0.1:5000/api/agent/OpportunityMatcher', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Emp-ID': emp_id,
      },
      body: JSON.stringify({}),
    });
    const aiData = await aiRes.json();
    if (aiData && Array.isArray(aiData.matches)) {
      return aiData.matches;
    }
    return [];
  } catch {
    return [];
  }
}

export default function OpportunitiesPage() {
  const theme = useMantineTheme();
  const colorScheme = useComputedColorScheme('light');
  const isDark = colorScheme === 'dark';
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [applyingId, setApplyingId] = useState<number | null>(null);
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [allOpportunities, setAllOpportunities] = useState<any[]>([]);
  const [aiRecommendedIds, setAiRecommendedIds] = useState<number[]>([]);
  const [error, setError] = useState('');

  // Replace with actual emp_id logic (from auth/session)
  const emp_id =
    localStorage.getItem('employeeId') || sessionStorage.getItem('employeeId');

  // Fetch and cache AI-recommended opportunity IDs
  useEffect(() => {
    async function loadRecommendations() {
      setLoading(true);
      setError('');

      // Try to read from localStorage first
      const cachedIdsStr = localStorage.getItem(RECOMMENDED_OPPS_KEY);
      const cachedTsStr = localStorage.getItem(RECOMMENDED_OPPS_TS_KEY);
      const now = Date.now();
      let useCache = false;
      let matches: number[] = [];

      // Check if there are cached opportunities in localStorage and valid timestamp
      if (cachedIdsStr && cachedTsStr) {
        const cachedIds = JSON.parse(cachedIdsStr);
        const cachedTs = parseInt(cachedTsStr, 10);
        if (Array.isArray(cachedIds) && cachedIds.length > 0 && now - cachedTs < RECOMMENDED_OPPS_TTL_MS) {
          useCache = true;
          matches = cachedIds;
        }
      }

      // If there are no cached opportunities, call the AI agent API
      if (!useCache && emp_id) {
        matches = await fetchRecommendedOpportunities(emp_id);
        // Store in localStorage if there are any matches
        if (matches.length > 0) {
          localStorage.setItem(RECOMMENDED_OPPS_KEY, JSON.stringify(matches));
          localStorage.setItem(RECOMMENDED_OPPS_TS_KEY, now.toString());
        }
      }

      setAiRecommendedIds(matches);

      // Fetch opportunity details by IDs
      if (matches.length > 0) {
        try {
          const opps = await getOpportunitiesByIds(matches);
          setOpportunities(opps);
        } catch (e: any) {
          setError(
            e?.message ||
              'Failed to fetch recommended opportunities details.'
          );
          setOpportunities([]);
        }
      } else {
        setOpportunities([]);
      }

      setLoading(false);
    }

    loadRecommendations();
  }, [emp_id]);

  // Optionally fetch all opportunities for searching/filtering beyond AI recommendations
  useEffect(() => {
    async function fetchAll() {
      try {
        const opportunities = await getAllOpportunities();
        setAllOpportunities(opportunities || []);
      } catch (e) {
        setAllOpportunities([]);
      }
    }
    fetchAll();
  }, []);

  // Filtering logic for search and filter on recommended opportunities
  const filteredOpportunities = opportunities.filter((job) =>
    (job.name.toLowerCase().includes(search.toLowerCase()) ||
      job.skills_expected.toLowerCase().includes(search.toLowerCase())) &&
    (filter === '' || job.level === filter)
  );

  // Handler for Apply Now button
  const handleApply = async (opportunityId: number) => {
    console.log('handleApply CALLED', opportunityId);
    if (!emp_id) {
      setError('Employee ID not found.');
      console.log('NO EMP_ID, returning early');
      return;
    }
    setApplyingId(opportunityId);
    try {
      // 1. Get consultant's DB id using emp_id
      const consultantRes = await axios.get(
        `http://127.0.0.1:5000/consultant/getConsultantByEmpId/${emp_id}`
      );
      const consultant_id = consultantRes.data.consultant?.id;
      if (!consultant_id) {
        setError('Consultant not found for this employee ID.');
        setApplyingId(null);
        console.log('NO CONSULTANT_ID, returning early');
        return;
      }
  
      // 2. Use consultant_id for the opportunity application
      const addResp = await addConsultantOpportunity(
        consultant_id,
        opportunityId,
        'Pending'
      );
      console.log('addConsultantOpportunity response:', addResp);
  
      // 3. (Optional) Show success message or refresh applications
      navigate('/applications');
    } catch (e: any) {
      setError(
        e?.response?.data?.error ||
        e?.message ||
        'Failed to apply for the opportunity.'
      );
    }
    setApplyingId(null);
  };

  return (
    <Box p="lg">
      <Group align="center" justify="space-between" mb="xl">
        <Group align="center">
          <ActionIcon
            variant="subtle"
            color="yellow.7"
            onClick={() => navigate(-1)}
          >
            <IconArrowLeft />
          </ActionIcon>
          <Title order={2}>Recommended Opportunities</Title>
        </Group>
        <Button
          variant="light"
          color="yellow.8"
          rightSection={<IconArrowRight size={16} />}
          onClick={() => navigate('/applications')}
        >
          View Applications
        </Button>
      </Group>

      {/* Search and Filter Controls */}
      <Group mb="lg" gap="md" wrap="wrap">
        <TextInput
          leftSection={<IconSearch size={16} />}
          placeholder="Search roles or skills..."
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
        <Select
          leftSection={<IconFilter size={16} />}
          placeholder="Filter by level"
          data={['Beginner', 'Intermediate', 'Advanced']}
          value={filter}
          onChange={(v) => setFilter(v || '')}
          clearable
        />
      </Group>

      {loading ? (
        <Group justify="center" my={60}><Loader size="xl" /></Group>
      ) : error ? (
        <Text size="sm" c="red" ta="center" my="lg">
          {error}
        </Text>
      ) : (
        <>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
            {filteredOpportunities.map((job) => (
              <Card
                key={job.id}
                shadow="md"
                radius="md"
                withBorder
                p="lg"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: 240,
                  background: isDark ? '#2d3142' : '#fff',
                  borderColor: isDark ? theme.colors.dark[4] : theme.colors.gray[3],
                }}
              >
                <Stack gap="xs">
                  <Group justify="space-between" align="flex-start">
                    <Group gap={8} align="center" style={{ width: '100%' }}>
                      <IconBriefcase size={22} color={theme.colors.yellow[6]} />
                      <Title
                        order={4}
                        style={{
                          fontWeight: 700,
                          fontSize: 20,
                          color: isDark ? theme.white : '#222',
                          flex: 1,
                        }}
                      >
                        {job.name}
                      </Title>
                      {job.level && (
                        <Badge
                          color="yellow"
                          size="md"
                          style={{
                            fontWeight: 700,
                            fontSize: 13,
                            color: isDark
                              ? theme.colors.dark[7]
                              : '#222',
                            background: isDark
                              ? theme.colors.yellow[6]
                              : '#fef9c3',
                            borderRadius: 999,
                            padding: '4px 16px',
                            textTransform: 'uppercase',
                            letterSpacing: 0.5,
                            marginLeft: 8,
                            height: 28,
                            alignSelf: 'center',
                          }}
                        >
                          {job.level}
                        </Badge>
                      )}
                    </Group>
                  </Group>
                  <Group gap={8} align="center" mt={4} mb={2}>
                    <Badge
                      color="yellow"
                      variant="light"
                      size="sm"
                      style={{
                        color: isDark ? theme.colors.dark[7] : '#222',
                        background: isDark
                          ? theme.colors.yellow[6]
                          : '#fef9c3',
                      }}
                    >
                      Skills
                    </Badge>
                    <Text
                      size="sm"
                      style={{
                        color: isDark ? theme.white : '#222',
                        fontWeight: 500,
                      }}
                    >
                      {job.skills_expected}
                    </Text>
                  </Group>
                  <Group gap={8} align="center" mb={2}>
                    <Badge
                      color="yellow"
                      variant="light"
                      size="sm"
                      style={{
                        color: isDark ? theme.colors.dark[7] : '#222',
                        background: isDark
                          ? theme.colors.yellow[6]
                          : '#fef9c3',
                      }}
                    >
                      Experience
                    </Badge>
                    <Text
                      size="sm"
                      style={{ color: isDark ? theme.white : '#222' }}
                    >
                      {job.years_of_experience_required} year
                      {job.years_of_experience_required !== 1 ? 's' : ''}
                    </Text>
                  </Group>
                  <Group gap={8} align="center">
                    <Badge
                      color="yellow"
                      variant="light"
                      size="sm"
                      style={{
                        color: isDark ? theme.colors.dark[7] : '#222',
                        background: isDark
                          ? theme.colors.yellow[6]
                          : '#fef9c3',
                      }}
                    >
                      Deadline
                    </Badge>
                    <Text
                      size="sm"
                      style={{ color: isDark ? theme.white : '#222' }}
                    >
                      {job.deadline}
                    </Text>
                  </Group>
                </Stack>
                <Button
                  mt="md"
                  fullWidth
                  color="yellow.5"
                  variant="filled"
                  radius="md"
                  size="md"
                  loading={applyingId === job.id}
                  style={{
                    fontWeight: 600,
                    color: isDark ? theme.colors.dark[7] : '#222',
                    background: isDark ? theme.colors.yellow[6] : undefined,
                  }}
                  onClick={() => handleApply(job.id)}
                  disabled={applyingId !== null}
                >
                  Apply Now
                </Button>
              </Card>
            ))}
          </SimpleGrid>
          {filteredOpportunities.length === 0 && (
            <Text size="sm" c="dimmed" mt="lg" ta="center">
              No opportunities match your search or filter.
            </Text>
          )}
        </>
      )}
    </Box>
  );
}