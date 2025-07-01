import {
  Card,
  Title,
  Text,
  Badge,
  Stack,
  SimpleGrid,
  Group,
  Box,
  ActionIcon,
  useMantineTheme,
  useComputedColorScheme,
  Loader,
} from '@mantine/core';
import { IconArrowLeft, IconBriefcase } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getAllConsultantOpportunities } from '../../api/consultantOpportunity';
import { getOpportunitiesByIds } from '../../api/opportunity';

type ConsultantOpportunity = {
  id: number;
  consultant_id: number;
  opportunity_id: number;
  selection_status: 'selected' | 'rejected' | 'pending';
  remarks?: string;
};

type OpportunityDetail = {
  id: number;
  name: string;
  skills_expected: string;
  years_of_experience_required: number;
  deadline: string;
};

const STATUS_LABELS: Record<string, string> = {
  selected: 'Selected',
  pending: 'Pending',
  rejected: 'Rejected',
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Selected':
      return 'teal';
    case 'Pending':
      return 'yellow';
    case 'Rejected':
      return 'red';
    default:
      return 'gray';
  }
};

export default function ApplicationsPage() {
  const theme = useMantineTheme();
  const colorScheme = useComputedColorScheme('light');
  const isDark = colorScheme === 'dark';
  const navigate = useNavigate();

  const [applications, setApplications] = useState<(ConsultantOpportunity & OpportunityDetail)[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Replace with actual emp_id logic (from auth/session)
  const emp_id =
    localStorage.getItem('employeeId') || sessionStorage.getItem('employeeId');

  useEffect(() => {
    async function fetchApplications() {
      setLoading(true);
      setError('');
      try {
        // 1. Get consultant's DB id using emp_id
        let consultantId: number | null = null;
        if (emp_id) {
          try {
            const consultantRes = await axios.get(
              `http://127.0.0.1:5000/consultant/getConsultantByEmpId/${emp_id}`
            );
            consultantId = consultantRes.data.consultant?.id;
          } catch (e: any) {
            setError(
              e?.response?.data?.error ||
                e?.message ||
                'Consultant not found for this employee ID.'
            );
            setApplications([]);
            setLoading(false);
            return;
          }
        }

        const res = await getAllConsultantOpportunities();
        let consultantApps: ConsultantOpportunity[] =
          res.consultant_opportunities || res.consultant_opportunity_list || [];

        // Filter by current consultant (using consultantId)
        if (consultantId !== null) {
          consultantApps = consultantApps.filter(
            (app) => Number(app.consultant_id) === Number(consultantId)
          );
        }

        // Get all unique opportunity IDs
        const opportunityIds = [...new Set(consultantApps.map((a) => a.opportunity_id))];
        let opportunityDetails: OpportunityDetail[] = [];
        if (opportunityIds.length > 0) {
          opportunityDetails = await getOpportunitiesByIds(opportunityIds);
        }

        // Map by id for faster lookup
        const oppMap: Record<number, OpportunityDetail> = {};
        opportunityDetails.forEach((o) => (oppMap[o.id] = o));

        // Merge application and opportunity details for rendering
        const merged = consultantApps
          .map((app) => {
            const opp = oppMap[app.opportunity_id];
            if (!opp) return null;
            return {
              ...app,
              ...opp,
            };
          })
          .filter(Boolean) as (ConsultantOpportunity & OpportunityDetail)[];

        setApplications(merged);
      } catch (e: any) {
        setError(
          e?.response?.data?.error ||
          e?.message ||
          'Failed to load applications.'
        );
        setApplications([]);
      }
      setLoading(false);
    }

    fetchApplications();
  }, [emp_id]);

  return (
    <Box p="lg">
      <Group justify="flex-start" mb="xl" gap="md">
        <ActionIcon
          variant="subtle"
          color="yellow.7"
          onClick={() => navigate(-1)}
          size="lg"
        >
          <IconArrowLeft />
        </ActionIcon>
        <Title order={2}>My Applications</Title>
      </Group>

      {loading ? (
        <Group justify="center" my={60}><Loader size="xl" /></Group>
      ) : error ? (
        <Text size="sm" c="red" ta="center" my="lg">{error}</Text>
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
          {applications.map((app) => (
            <Card
              key={app.id}
              withBorder
              shadow="lg"
              radius="lg"
              p="xl"
              style={{
                background: isDark
                  ? `linear-gradient(135deg, #232946 60%, #393e5b 100%)`
                  : `linear-gradient(135deg, #fdf6e3 60%, #fffde4 100%)`,
                borderColor: isDark ? theme.colors.dark[4] : theme.colors.yellow[1],
                minHeight: 320,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow:
                  isDark
                    ? '0 4px 24px 0 rgba(0,0,0,0.5)'
                    : '0 4px 24px 0 rgba(255, 220, 100, 0.10)',
                ':hover': {
                  transform: 'translateY(-5px) scale(1.015)',
                  boxShadow:
                    isDark
                      ? '0 8px 32px 0 rgba(0,0,0,0.7)'
                      : '0 8px 32px 0 rgba(255, 220, 100, 0.15)',
                },
              }}
            >
              <Stack gap="md">
                {/* Header */}
                <Group justify="space-between" align="center" mb="xs">
                  <Group align="center" gap="xs">
                    <IconBriefcase size={28} color={theme.colors.yellow[7]} />
                    <Title
                      order={4}
                      style={{
                        fontWeight: 800,
                        fontSize: 22,
                        color: isDark ? theme.white : theme.colors.dark[6],
                        letterSpacing: 1,
                        lineHeight: 1.2,
                        marginRight: 10,
                        textShadow: isDark
                          ? '0 2px 8px #151a23'
                          : '0 2px 8px #fffde4',
                      }}
                    >
                      {app.name}
                    </Title>
                  </Group>
                  <Badge
                    color={getStatusColor(app.selection_status)}
                    size="lg"
                    variant={app.selection_status === 'pending' ? "outline" : "filled"}
                    style={{
                      fontWeight: 700,
                      fontSize: 15,
                      background:
                        app.selection_status === 'pending'
                          ? isDark
                            ? theme.colors.yellow[7]
                            : '#fef9c3'
                          : undefined,
                      color:
                        app.selection_status === 'pending'
                          ? isDark
                            ? theme.colors.dark[7]
                            : '#d97706'
                          : '#fff',
                      borderRadius: 999,
                      padding: '5px 18px',
                      textTransform: 'uppercase',
                      letterSpacing: 0.7,
                      boxShadow: isDark
                        ? '0 1px 6px #151a23'
                        : '0 1px 6px #fffde4',
                    }}
                  >
                    {STATUS_LABELS[app.selection_status] ?? app.selection_status}
                  </Badge>
                </Group>

                {/* Details */}
                <Stack gap="xs" mt="xs">
                  <Group gap={8} align="center">
                    <Badge
                      color="yellow"
                      variant="light"
                      size="md"
                      style={{
                        background: isDark
                          ? theme.colors.yellow[6]
                          : '#fffbe8',
                        fontWeight: 600,
                        color: isDark
                          ? theme.colors.dark[7]
                          : '#a27c1a',
                        letterSpacing: 0.5,
                        padding: '3px 14px',
                        borderRadius: 8,
                      }}
                    >
                      Skills
                    </Badge>
                    <Text size="md" style={{
                      color: isDark ? theme.white : theme.colors.dark[5],
                      fontWeight: 500,
                      letterSpacing: 0.2,
                    }}>{app.skills_expected}</Text>
                  </Group>
                  <Group gap={8} align="center">
                    <Badge
                      color="yellow"
                      variant="light"
                      size="md"
                      style={{
                        background: isDark
                          ? theme.colors.yellow[6]
                          : '#fffbe8',
                        fontWeight: 600,
                        color: isDark
                          ? theme.colors.dark[7]
                          : '#a27c1a',
                        letterSpacing: 0.5,
                        padding: '3px 14px',
                        borderRadius: 8,
                      }}
                    >
                      Experience
                    </Badge>
                    <Text size="md" style={{
                      color: isDark ? theme.white : theme.colors.dark[5],
                      fontWeight: 500,
                    }}>
                      {app.years_of_experience_required} year
                      {app.years_of_experience_required !== 1 ? 's' : ''}
                    </Text>
                  </Group>
                  <Group gap={8} align="center">
                    <Badge
                      color="yellow"
                      variant="light"
                      size="md"
                      style={{
                        background: isDark
                          ? theme.colors.yellow[6]
                          : '#fffbe8',
                        fontWeight: 600,
                        color: isDark
                          ? theme.colors.dark[7]
                          : '#a27c1a',
                        letterSpacing: 0.5,
                        padding: '3px 14px',
                        borderRadius: 8,
                      }}
                    >
                      Deadline
                    </Badge>
                    <Text size="md" style={{
                      color: isDark ? theme.white : theme.colors.dark[5],
                      fontWeight: 500,
                    }}>
                      {app.deadline}
                    </Text>
                  </Group>
                  {app.remarks && (
                    <Group gap={8} align="center">
                      <Badge
                        color="gray"
                        variant="light"
                        size="md"
                        style={{
                          background: isDark
                            ? theme.colors.dark[4]
                            : theme.colors.gray[1],
                          fontWeight: 600,
                          color: isDark
                            ? theme.colors.yellow[1]
                            : theme.colors.dark[7],
                          letterSpacing: 0.5,
                          padding: '3px 14px',
                          borderRadius: 8,
                        }}
                      >
                        Remarks
                      </Badge>
                      <Text size="md" style={{
                        color: isDark ? theme.colors.gray[2] : theme.colors.gray[7],
                        fontStyle: 'italic',
                        fontWeight: 400,
                      }}>
                        {app.remarks}
                      </Text>
                    </Group>
                  )}
                </Stack>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}