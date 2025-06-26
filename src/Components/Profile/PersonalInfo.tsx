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
} from '@mantine/core';
import {
  IconIdBadge2,
  IconPhone,
  IconMail,
  IconMapPin,
  IconEdit,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import ActionItems from '../Dashboard/ActionItems';

interface PersonalInfoProps {
  name: string;
  empId: string;
  mobile: string;
  email: string;
  address: string;
  currentRole: string;
}

// Utility to extract initials like "Sarah Johnson" → "SJ"
function getInitialsSeed(name: string) {
  return name
    .split(' ')
    .map((word) => word[0]?.toUpperCase())
    .join('');
}

export default function PersonalInfo({
  name,
  empId,
  mobile,
  email,
  address,
  currentRole,
}: PersonalInfoProps) {
  const avatarSeed = getInitialsSeed(name);
  const navigate = useNavigate();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const cardBg = isDark
    ? 'linear-gradient(90deg, #232946 60%, #3b3b5b 100%)'
    : 'linear-gradient(90deg, #f8fafc 60%, #e0e7ff 100%)';
  const nameColor = isDark ? 'gray.0' : 'indigo.8';
  const roleColor = isDark ? 'gray.5' : 'gray.6';
  const labelColor = isDark ? 'gray.5' : 'gray.7';

  return (
    <Card withBorder shadow="md" radius="md" p="lg" style={{ background: cardBg }}>
      <Group align="flex-start" gap="md" wrap="nowrap">
        {/* Avatar with dynamic seed */}
        <Avatar
          size={80}
          radius="xl"
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${avatarSeed}`}
          alt="Profile"
          style={{ boxShadow: isDark ? '0 2px 12px #232946' : '0 2px 12px #e0e7ff' }}
        />

        {/* Info Stack */}
        <Stack gap="xs" style={{ flex: 1 }}>
          <Box>
            <Group gap="xs" align="center">
              <Text fw={700} size="xl" c={nameColor} style={{ letterSpacing: 0.5 }}>
                {name}
              </Text>
              <ActionIcon variant="subtle" color="indigo" onClick={() => navigate("./edit")}> <IconEdit/> </ActionIcon>
            </Group>
            <Text size="sm" c={roleColor} mb={2}>
              {currentRole}
            </Text>
          </Box>

          <Divider my="xs" />

          <Grid gutter="xs">
            <Grid.Col span={6}>
              <Group gap="xs">
                <IconIdBadge2 size={16} color="#6366f1" />
                <Text size="sm" c={labelColor}>
                  <strong>Emp ID:</strong> {empId}
                </Text>
              </Group>
            </Grid.Col>
            <Grid.Col span={6}>
              <Group gap="xs">
                <IconPhone size={16} color="#6366f1" />
                <Text size="sm" c={labelColor}>
                  <strong>Mobile:</strong> {mobile}
                </Text>
              </Group>
            </Grid.Col>
            <Grid.Col span={6}>
              <Group gap="xs">
                <IconMail size={16} color="#6366f1" />
                <Text size="sm" c={labelColor}>
                  <strong>Email:</strong> {email}
                </Text>
              </Group>
            </Grid.Col>
            <Grid.Col span={6}>
              <Group gap="xs">
                <IconMapPin size={16} color="#6366f1" />
                <Text size="sm" c={labelColor}>
                  <strong>Address:</strong> {address}
                </Text>
              </Group>
            </Grid.Col>
          </Grid>
        </Stack>
      </Group>
    </Card>
  );
}
