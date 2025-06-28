import React, { useEffect, useState } from 'react';
import {
  Card,
  Group,
  Text,
  Avatar,
  Stack,
  Divider,
  Grid,
  Box,
  ActionIcon,
  useMantineColorScheme,
  Loader,
} from '@mantine/core';
import {
  IconIdBadge2,
  IconPhone,
  IconMail,
  IconMapPin,
  IconEdit,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { getConsultantByEmpId } from '../../api/consultant';

interface PersonalInfoProps {
  empId: string;
}

interface Consultant {
  name: string;
  emp_id: string;
  mobile_no: string;
  email: string;
  address: string;
  current_role: string;
}

function getInitialsSeed(name: string) {
  return name
    .split(' ')
    .map((word) => word[0]?.toUpperCase())
    .join('');
}

export default function PersonalInfo({ empId }: PersonalInfoProps) {
  const navigate = useNavigate();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const cardBg = isDark
    ? 'linear-gradient(90deg, #232946 60%, #3b3b5b 100%)'
    : 'linear-gradient(90deg, #f8fafc 60%, #e0e7ff 100%)';

  const nameColor = isDark ? 'gray.0' : 'indigo.8';
  const roleColor = isDark ? 'gray.5' : 'gray.6';
  const labelColor = isDark ? 'gray.5' : 'gray.7';

  const [consultant, setConsultant] = useState<Consultant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchConsultant() {
      setLoading(true);
      setError('');
      try {
        const data = await getConsultantByEmpId(Number(empId));
        if (data?.consultant) {
          setConsultant(data.consultant);
        } else {
          setError('Consultant not found');
        }
      } catch (err: any) {
        setError(err?.response?.data?.message || 'Failed to load consultant');
      } finally {
        setLoading(false);
      }
    }

    fetchConsultant();
  }, [empId]);

  if (loading) {
    return (
      <Card withBorder shadow="md" radius="md" p="lg" style={{ background: cardBg }}>
        <Loader color="indigo" />
      </Card>
    );
  }

  if (error) {
    return (
      <Card withBorder shadow="md" radius="md" p="lg" style={{ background: cardBg }}>
        <Text c="red">{error}</Text>
      </Card>
    );
  }

  if (!consultant) {
    return null; // Shouldn't happen, but safety check
  }

  const avatarSeed = getInitialsSeed(consultant.name || 'C');

  return (
    <Card withBorder shadow="md" radius="md" p="lg" style={{ background: cardBg }}>
      <Group align="flex-start" gap="md" wrap="nowrap">
        <Avatar
          size={80}
          radius="xl"
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${avatarSeed}`}
          alt="Profile"
          style={{ boxShadow: isDark ? '0 2px 12px #232946' : '0 2px 12px #e0e7ff' }}
        />

        <Stack gap="xs" style={{ flex: 1 }}>
          <Box>
            <Group gap="xs" align="center">
              <Text fw={700} size="xl" c={nameColor} style={{ letterSpacing: 0.5 }}>
                {consultant.name || 'N/A'}
              </Text>
              <ActionIcon variant="subtle" color="indigo" onClick={() => navigate('./edit')}>
                <IconEdit />
              </ActionIcon>
            </Group>
            <Text size="sm" c={roleColor} mb={2}>
              {consultant.current_role || 'N/A'}
            </Text>
          </Box>

          <Divider my="xs" />

          <Grid gutter="xs">
            <Grid.Col span={6}>
              <Group gap="xs">
                <IconIdBadge2 size={16} color="#6366f1" />
                <Text size="sm" c={labelColor}>
                  <strong>Emp ID:</strong> {consultant.emp_id || 'N/A'}
                </Text>
              </Group>
            </Grid.Col>
            <Grid.Col span={6}>
              <Group gap="xs">
                <IconPhone size={16} color="#6366f1" />
                <Text size="sm" c={labelColor}>
                  <strong>Mobile:</strong> {consultant.mobile_no || 'N/A'}
                </Text>
              </Group>
            </Grid.Col>
            <Grid.Col span={6}>
              <Group gap="xs">
                <IconMail size={16} color="#6366f1" />
                <Text size="sm" c={labelColor}>
                  <strong>Email:</strong> {consultant.email || 'N/A'}
                </Text>
              </Group>
            </Grid.Col>
            <Grid.Col span={6}>
              <Group gap="xs">
                <IconMapPin size={16} color="#6366f1" />
                <Text size="sm" c={labelColor}>
                  <strong>Address:</strong> {consultant.address || 'N/A'}
                </Text>
              </Group>
            </Grid.Col>
          </Grid>
        </Stack>
      </Group>
    </Card>
  );
}
