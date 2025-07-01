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
} from '@mantine/core';
import { IconBriefcase } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RECOMMENDED_OPPS_KEY = 'recommended_opportunities';

export default function OpportunitiesCard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [opps, setOpps] = useState<any[]>([]);
  const [totalRecommended, setTotalRecommended] = useState<'N/A' | number>('N/A');

  const emp_id =
    localStorage.getItem('employeeId') || sessionStorage.getItem('employeeId');

  useEffect(() => {
    async function fetchOpportunities() {
      if (!emp_id) {
        setLoading(false);
        return;
      }
      try {
        // Get consultant ID
        const consultantRes = await axios.get(
          `http://127.0.0.1:5000/consultant/getConsultantByEmpId/${emp_id}`
        );
        const consultant_id = consultantRes.data.consultant?.id;
        if (!consultant_id) {
          setOpps([]);
          setLoading(false);
          return;
        }

        // Get consultant opportunities
        const oppsRes = await axios.get(
          `http://127.0.0.1:5000/consultantOpportunity/getOpportunitiesByConsultant/${consultant_id}`
        );
        setOpps(oppsRes.data.opportunities || []);
      } catch (e) {
        setOpps([]);
      }
      setLoading(false);
    }

    // Read recommended opportunities count if any
    const cached = localStorage.getItem(RECOMMENDED_OPPS_KEY);
    if (cached) {
      try {
        const ids = JSON.parse(cached);
        if (Array.isArray(ids)) {
          setTotalRecommended(ids.length);
        }
      } catch {
        setTotalRecommended('N/A');
      }
    }

    fetchOpportunities();
  }, [emp_id]);

  const applied = opps.filter(
    (o) =>
      o.selection_status?.toLowerCase() === 'pending' ||
      o.selection_status?.toLowerCase() === 'selected'
  ).length;

  const progress =
    typeof totalRecommended === 'number' && totalRecommended > 0
      ? Math.round((applied / totalRecommended) * 100)
      : 0;

  return (
    <Card radius="md" withBorder shadow="sm">
      <Group align="center">
        <IconBriefcase size={24} color="#eab308" />
        <Stack gap={0}>
          <Text fw={600}>Opportunities</Text>
          <Text size="xs" c="dimmed">
            Potential projects
          </Text>
        </Stack>
      </Group>

      {loading ? (
        <Group justify="center" my="md">
          <Loader size="sm" />
        </Group>
      ) : (
        <>
          <Group justify="space-between" mt="md">
            <Text size="sm">Status</Text>
            {totalRecommended === 'N/A' ? (
              <Badge color="gray">N/A</Badge>
            ) : (
              <Badge color="yellow">Active</Badge>
            )}
          </Group>

          <Progress
            value={progress}
            mt="sm"
            size="sm"
            color="yellow"
            radius="md"
          />

          <Group justify="space-between" mt="xs" c="gray.6" fz="sm">
            <Text>
              Total:{' '}
              {typeof totalRecommended === 'number'
                ? totalRecommended
                : 'N/A'}
            </Text>
            <Text>Applied: {applied}</Text>
          </Group>
        </>
      )}

      <Button
        fullWidth
        mt="md"
        color="yellow"
        radius="md"
        onClick={() => navigate('/opportunities')}
      >
        View Opportunities
      </Button>
    </Card>
  );
}
