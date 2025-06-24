import {
  Box,
  Tabs,
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Stack,
  Divider,
  Text,
} from '@mantine/core';
import { IconAt, IconLock } from '@tabler/icons-react';

export default function AuthPage() {
  return (
    <Box
      style={{
        width: '100%',
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #4f46e5, #3b82f6)',
        overflowX: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      <Paper
        bg="white"
        p="lg"
        w={{ base: 340, sm: 400 }}
        shadow="lg"
        style={{ borderRadius: '8px' }}
      >
        <Tabs defaultValue="signin" variant="outline" radius="xs">
          <Tabs.List grow mb="md">
            <Tabs.Tab value="signin">Sign In</Tabs.Tab>
            <Tabs.Tab value="signup">Sign Up</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="signin">
            <Stack>
              <TextInput
                label="Email"
                placeholder="you@example.com"
                leftSection={<IconAt size={16} />}
                required
              />
              <PasswordInput
                label="Password"
                placeholder="Your password"
                leftSection={<IconLock size={16} />}
                required
              />
              <Checkbox label="Remember me" />
              <Button fullWidth color="indigo">
                Sign In
              </Button>
              <Text size="xs" ta="center" c="dimmed">
                Don’t have an account? <Text span c="blue" component="a" href="#">Sign up here</Text>
              </Text>
              <Divider label="or" labelPosition="center" />
              <Button fullWidth variant="outline">Continue with Google</Button>
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="signup">
            <Stack>
              <TextInput
                label="Email"
                placeholder="you@example.com"
                leftSection={<IconAt size={16} />}
                required
              />
              <PasswordInput
                label="Password"
                placeholder="Create a password"
                leftSection={<IconLock size={16} />}
                required
              />
              <PasswordInput
                label="Confirm Password"
                placeholder="Re-enter your password"
                leftSection={<IconLock size={16} />}
                required
              />
              <Button fullWidth color="indigo">
                Sign Up
              </Button>
            </Stack>
          </Tabs.Panel>
        </Tabs>
      </Paper>
    </Box>
  );
}
