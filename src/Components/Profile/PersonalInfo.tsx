import {
  Card,
  Group,
  Text,
  Avatar,
  Stack,
  Divider,
  Grid,
  Box,
} from '@mantine/core';
import {
  IconIdBadge2,
  IconPhone,
  IconMail,
  IconMapPin,
} from '@tabler/icons-react';

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
            <Text fw={700} size="lg">
              {name}
            </Text>
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
