import {
    Group,
    Button,
    Container,
    Box,
    rem,
  } from '@mantine/core';
  import {
    IconUser,
    IconBell,
    IconMenu2,
  } from '@tabler/icons-react';
  
  export default function NavBar() {
    return (
      <Box
        component="header"
        bg="indigo.7"
        c="white"
        py="sm"
        px="md"
        style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
      >
        <Container size="lg">
          <Group justify="space-between">
            <Group>
              <IconUser size={rem(24)} />
              <strong>Consultant Portal</strong>
            </Group>
  
            <Group visibleFrom="sm">
              {['Dashboard', 'Profile', 'Training', 'Opportunities'].map((link) => (
                <Button
                  key={link}
                  variant="subtle"
                  color="gray.2"
                  fw={500}
                  size="compact-sm"
                >
                  {link}
                </Button>
              ))}
            </Group>
  
            <Group gap="xs">
              <Button variant="subtle" color="white">
                <IconBell />
              </Button>
              <Button variant="subtle" color="white">
                <IconUser />
              </Button>
              <Button variant="subtle" color="white" hiddenFrom="sm">
                <IconMenu2 />
              </Button>
            </Group>
          </Group>
        </Container>
      </Box>
    );
  }
  