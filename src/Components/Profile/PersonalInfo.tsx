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

  return (
    <Card withBorder shadow="sm" radius="md" p="md">
      <Group align="flex-start" gap="md" wrap="nowrap">
        {/* Avatar with dynamic seed */}
        <Avatar
          size={72}
          radius="xl"
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${avatarSeed}`}
          alt="Profile"
        />

        {/* Info Stack */}
        <Stack gap="xs" style={{ flex: 1 }}>
          <Box>
            <Group gap="xs" align="center">
            <Text fw={700} size="xl">
              {name}
            </Text>
            <ActionIcon variant="subtle" onClick={() => navigate("./edit")}><IconEdit/></ActionIcon>
            </Group>
            <Text size="sm" c="gray.6">
              {currentRole}
            </Text>
          </Box>

          <Divider my="xs" />

          <Grid gutter="xs">
            <Grid.Col span={6}>
              <Group gap="xs">
                <IconIdBadge2 size={16} />
                <Text size="sm" c="gray.7">
                  <strong>Emp ID:</strong> {empId}
                </Text>
              </Group>
            </Grid.Col>
            <Grid.Col span={6}>
              <Group gap="xs">
                <IconPhone size={16} />
                <Text size="sm" c="gray.7">
                  <strong>Mobile:</strong> {mobile}
                </Text>
              </Group>
            </Grid.Col>
            <Grid.Col span={6}>
              <Group gap="xs">
                <IconMail size={16} />
                <Text size="sm" c="gray.7">
                  <strong>Email:</strong> {email}
                </Text>
              </Group>
            </Grid.Col>
            <Grid.Col span={6}>
              <Group gap="xs">
                <IconMapPin size={16} />
                <Text size="sm" c="gray.7">
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
