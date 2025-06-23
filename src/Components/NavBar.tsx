import {
  Group,
  Button,
  Container,
  Box,
  rem,
  Text,
  Avatar,
  Flex,
} from '@mantine/core';
import {
  IconBell,
  IconMenu2,
} from '@tabler/icons-react';
import '@fontsource/baloo-2';

export default function NavBar() {
  return (
    <Box
      component="header"
      bg="indigo.7"
      c="white"
      py={rem(12)} // Increased padding for taller navbar
      px="sm"
      style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
    >
      <Container size="lg">
        <Flex justify="space-between" align="center" wrap="nowrap">
          {/* Left - App Title */}
          <Text
            fw={700}
            size="xl"
            style={{
              fontFamily: '"Baloo 2", cursive',
              letterSpacing: rem(-0.5),
            }}
          >
            Consul App
          </Text>

          {/* Right - Everything else */}
          <Group gap="sm">
            {/* Nav Links aligned to right edge */}
            <Group visibleFrom="sm" gap="sm" ml="auto">
              {['Dashboard', 'Profile', 'Training', 'Opportunities'].map((link) => (
                <Button
                  key={link}
                  variant="subtle"
                  color="gray.2"
                  fw={500}
                  size="xs"
                >
                  {link}
                </Button>
              ))}
            </Group>

            {/* Notification + Avatar */}
            <Button variant="subtle" color="white" size="xs">
              <IconBell size={18} />
            </Button>

            <Avatar
              size={26}
              radius="xl"
              src="https://api.dicebear.com/7.x/initials/svg?seed=SG"
              alt="Profile"
              styles={{ root: { backgroundColor: 'white' } }}
            />

            <Button variant="subtle" color="white" size="xs" hiddenFrom="sm">
              <IconMenu2 size={18} />
            </Button>
          </Group>
        </Flex>
      </Container>
    </Box>
  );
}
