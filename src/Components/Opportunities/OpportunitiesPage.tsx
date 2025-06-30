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
import { getOpportunitiesByIds } from '../../api/opportunity';

export default function OpportunitiesPage() {
  const theme = useMantineTheme();
  const colorScheme = useComputedColorScheme('light');
  const isDark = colorScheme === 'dark';
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [allOpportunities, setAllOpportunities] = useState<any[]>([]);
  const [aiRecommendedIds, setAiRecommendedIds] = useState<number[]>([]);
  const [error, setError] = useState('');

  // Replace with actual emp_id logic (from auth/session)
  const emp_id = localStorage.getItem('employeeId') || sessionStorage.getItem('employeeId');

  // Fetch AI-recommended opportunity IDs and then the corresponding opportunities
  useEffect(() => {
    async function fetchRecommendations() {
      setLoading(true);
      setError('');
      try {
        // Step 1: Ask the agent for recommended opportunity IDs
        const aiRes = await axios.post(
          '/api/agent/opportunity_matcher_agent',
          {},
          {
            headers: {
              'X-Emp-ID': emp_id,
            },
          }
        );
        if (aiRes.data && Array.isArray(aiRes.data.matches)) {
          setAiRecommendedIds(aiRes.data.matches);
          // Step 2: Fetch opportunity details by IDs
          if (aiRes.data.matches.length > 0) {
            const opps = await getOpportunitiesByIds(aiRes.data.matches);
            setOpportunities(opps);
          } else {
            setOpportunities([]);
          }
        } else {
          setError('No recommendations found.');
          setOpportunities([]);
        }
      } catch (e: any) {
        setError(
          e?.response?.data?.error ||
            'Failed to fetch recommended opportunities.'
        );
        setOpportunities([]);
      }
      setLoading(false);
    }

    fetchRecommendations();
  }, [emp_id]);

  // Optionally fetch all opportunities for searching/filtering beyond AI recommendations
  useEffect(() => {
    async function fetchAll() {
      try {
        const res = await axios.get('/opportunity/getAllOpportunities');
        setAllOpportunities(res.data.opportunities || []);
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
    (filter === '' || (job.level === filter))
  );

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
                  style={{
                    fontWeight: 600,
                    color: isDark ? theme.colors.dark[7] : '#222',
                    background: isDark ? theme.colors.yellow[6] : undefined,
                  }}
                  // onClick={() => ...}
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