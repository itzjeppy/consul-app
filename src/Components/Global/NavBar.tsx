import {
  Box,
  Group,
  Text,
  Button,
  Container,
  Avatar,
  rem,
  Flex,
} from '@mantine/core';
import { IconBell, IconSun, IconMoon } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useMantineColorScheme } from '@mantine/core';

export default function NavBar() {
  const navigate = useNavigate();
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const navLinks = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Profile', path: '/profile' },
    { label: 'Training', path: '/trainings' },
    { label: 'Opportunities', path: '/opportunities' },
  ];

  const toggleTheme = () => {
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Box
      component="header"
      bg="indigo.6"
      c="white"
      py={rem(10)}
      px="lg"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
        <Group justify="space-between" align="center" wrap="nowrap">
          <Text
            fw={700}
            size="xl"
            style={{ fontFamily: '"Baloo 2", cursive', letterSpacing: rem(-0.5) }}
          >
            Consul App
          </Text>

          {/* Spacer to push links to right */}
          <Flex gap="sm" align="center" justify="flex-end">
            {/* Nav Links */}
            {navLinks.map((link) => (
              <Button
                key={link.label}
                variant="subtle"
                color="gray.2"
                size="sm"
                onClick={() => navigate(link.path)}
              >
                {link.label}
              </Button>
            ))}

            {/* Notification Icon */}
            <Button variant="subtle" color="white" size="xs">
              <IconBell size={18} />
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="subtle"
              color="white"
              size="xs"
              onClick={toggleTheme}
              title={`Switch to ${colorScheme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {colorScheme === 'dark' ? <IconMoon size={18} /> : <IconSun size={18} />}
            </Button>

            {/* Avatar */}
            <Avatar
              size={24}
              radius="xl"
              src="https://api.dicebear.com/7.x/initials/svg?seed=SJ"
              alt="Profile"
              styles={{ root: { backgroundColor: 'white' } }}
            />

            {/* Auth Button */}
            <Button
              variant="subtle"
              color="white"
              size="xs"
              onClick={() => navigate('/auth')}
            >
              Login
            </Button>
          </Flex>
        </Group>
    </Box>
  );
}
