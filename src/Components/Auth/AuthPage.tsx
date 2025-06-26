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
  useComputedColorScheme,
  useMantineTheme,
} from '@mantine/core';
import {
  IconAt,
  IconLock,
  IconId,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const computedColorScheme = useComputedColorScheme();
  const theme = useMantineTheme();
  const isDark = computedColorScheme === 'dark';
  const navigate = useNavigate();

  return (
    <div style={{ margin: 0, padding: 0, width: "100vw", height: '100vh', background: "red", position: 'fixed', top: 0, left: 0 }}>
      <Box
        style={{
          width: '100vw',
          minHeight: '100vh',
          background: isDark
            ? theme.colors.dark[7]
            : 'linear-gradient(to bottom right, #4f46e5, #3b82f6)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'auto',
        }}
      >
        <Paper
          bg={isDark ? theme.colors.dark[6] : 'white'}
          p="lg"
          w={{ base: '100%', sm: 500, md: 700 }}
          shadow="lg"
          style={{
            borderRadius: '8px',
            color: isDark ? theme.colors.gray[2] : theme.black,
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          <Tabs defaultValue="signin" variant="outline" radius="xs">
            <Tabs.List grow mb="md">
              <Tabs.Tab value="signin">Sign In</Tabs.Tab>
              <Tabs.Tab value="signup">Sign Up</Tabs.Tab>
            </Tabs.List>

            {/* Sign In Panel */}
            <Tabs.Panel value="signin">
              <Stack gap="md">
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
                  Don’t have an account?{' '}
                  <Text span c="blue" component="a" href="#">
                    Sign up here
                  </Text>
                </Text>
                <Divider label="or" labelPosition="center" />
                <Button fullWidth variant="outline">Continue with Google</Button>
              </Stack>
            </Tabs.Panel>

            {/* Sign Up Panel */}
            <Tabs.Panel value="signup" mt="md">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // after successful registration, redirect to profile edit page
                  navigate('/profile/edit');
                }}
              >
                <Stack gap="md">
                  <TextInput
                    label="Employee ID"
                    placeholder="EMP12345"
                    leftSection={<IconId size={16} />}
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
                </Stack>
                <Stack mt="lg">
                  <Button fullWidth color="indigo" type="submit">
                    Sign Up
                  </Button>
                </Stack>
              </form>
            </Tabs.Panel>
          </Tabs>
        </Paper>
      </Box>
    </div>
  );
}