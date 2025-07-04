import React, { useState, useEffect } from 'react';
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
  Group,
  Title,
  Grid,
  Center,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconLock, IconId } from '@tabler/icons-react';
import { addUser, ValidateUser } from '../../api/users';
import { addConsultant, getConsultantByEmpId } from '../../api/consultant';

// Prevent unwanted body scroll
function useNoBodyScroll() {
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, []);
}

function isConsultantComplete(consultant: any) {
  if (!consultant) return false;
  return !!(consultant.name && consultant.email && consultant.mobile_no);
}

export default function AuthPage() {
  useNoBodyScroll();
  const computedColorScheme = useComputedColorScheme();
  const theme = useMantineTheme();
  const isDark = computedColorScheme === 'dark';
  const HEADER_HEIGHT = 52; // px, adjust if your header is a different height

  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signinLoading, setSigninLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [signinError, setSigninError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [signinId, setSigninId] = useState('');
  const [signinPassword, setSigninPassword] = useState('');
  const [signupId, setSignupId] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirm, setSignupConfirm] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupMobile, setSignupMobile] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupAddress, setSignupAddress] = useState('');
  const [signupRole, setSignupRole] = useState('');

  // Responsive Paper width for sign up
  const paperMaxWidth = activeTab === 'signup' ? 740 : 540;
  const gridColSpan = activeTab === 'signup' ? { base: 12, sm: 6, md: 4 } : { base: 12, sm: 6 };

  // Helper for toast notifications
  function showToast({ message, color = 'red', title = '', autoClose = 3500 }: {
    message: string; color?: string; title?: string; autoClose?: number
  }) {
    notifications.show({
      color,
      title,
      message,
      autoClose,
      withCloseButton: true,
    });
  }

  // Modified handleConsultantPostLogin for sign-in: checks and creates consultant if missing
  async function handleConsultantPostLogin(emp_id: number, user_id: number) {
    try {
      let consultantData = null;
      try {
        consultantData = await getConsultantByEmpId(emp_id);
      } catch (e: any) {
        // Consultant not found: create a minimal one and ask user to complete details
        await addConsultant({
          name: "",
          emp_id: emp_id.toString(),
          mobile_no: "",
          email: "",
          address: "",
          current_role: "",
          user_id: user_id,
        });
        showToast({
          message: "Please finish adding your details.",
          color: "yellow",
          title: "Complete Profile Required",
        });
        window.location.replace('/profile/edit');
        return;
      }

      if (consultantData && consultantData.consultant) {
        if (isConsultantComplete(consultantData.consultant)) {
          window.location.replace('/dashboard');
        } else {
          showToast({
            message: "Please finish adding your details.",
            color: "yellow",
            title: "Complete Profile Required",
          });
          window.location.replace('/profile/edit');
        }
      } else {
        await addConsultant({
          name: "",
          emp_id: emp_id.toString(),
          mobile_no: "",
          email: "",
          address: "",
          current_role: "",
          user_id: user_id,
        });
        showToast({
          message: "Please finish adding your details.",
          color: "yellow",
          title: "Complete Profile Required",
        });
        window.location.replace('/profile/edit');
      }
    } catch (e) {
      window.location.replace('/dashboard');
    }
  }

  return (
    <Box
      style={{
        position: 'absolute',
        width: '100vw',
        height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        top: HEADER_HEIGHT,
        left: 0,
        background: isDark
          ? theme.colors.dark[7]
          : 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <Paper
        radius="md"
        shadow="xl"
        p={40}
        style={{
          minWidth: 320,
          maxWidth: paperMaxWidth,
          width: '100%',
          marginTop: 30,
          position: 'relative',
          height: 'calc(100vh - ' + (HEADER_HEIGHT + 60) + 'px)',
          maxHeight: '100%',
          overflowY: 'auto',
          background: isDark ? theme.colors.dark[6] : theme.white,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Center mb="lg">
          <Title order={2} c={isDark ? theme.colors.indigo[4] : theme.colors.indigo[7]}>
            Welcome to Consultant Portal
          </Title>
        </Center>
        <Tabs
          value={activeTab}
          onChange={(v) => setActiveTab(v as 'signin' | 'signup')}
          variant="default"
          radius="md"
          keepMounted={false}
        >
          <Tabs.List grow mb="md" style={{ marginBottom: 30 }}>
            <Tabs.Tab value="signin">Sign In</Tabs.Tab>
            <Tabs.Tab value="signup">Sign Up</Tabs.Tab>
          </Tabs.List>

          {/* Sign In Panel */}
          <Tabs.Panel value="signin">
            <Stack gap="sm">
              {signupSuccess && (
                <Text c="green" ta="center" fw={500}>
                  Registration successful! Please sign in.
                </Text>
              )}
              {signinError && (
                <Text c="red" ta="center" fw={500}>{signinError}</Text>
              )}
              <Text fw={600} size="lg" mb={8}>Sign In to your account</Text>
              <Group grow>
                <TextInput
                  label="Employee ID"
                  placeholder="2000..."
                  type="number"
                  leftSection={<IconId size={16} />}
                  value={signinId}
                  onChange={e => setSigninId(e.target.value)}
                  required
                />
                <PasswordInput
                  label="Password"
                  placeholder="Your password"
                  leftSection={<IconLock size={16} />}
                  value={signinPassword}
                  onChange={e => setSigninPassword(e.target.value)}
                  required
                />
              </Group>
              <Checkbox
                label="Remember me"
                checked={rememberMe}
                onChange={e => setRememberMe(e.currentTarget.checked)}
                mt="xs"
              />
              <Button
                fullWidth
                color="indigo"
                loading={signinLoading}
                mt="md"
                onClick={async () => {
                  setSigninError('');
                  setSigninLoading(true);
                  try {
                    const res = await ValidateUser({ emp_id: Number(signinId), password: signinPassword });
                    if (res && (res.success || res.user)) {
                      const storage = rememberMe ? localStorage : sessionStorage;
                      storage.setItem('isLoggedIn', 'true');
                      storage.setItem('employeeId', signinId);

                      // NOTE: Use returned user id for linking consultant
                      const user_id = res.user?.id;
                      if (!user_id) {
                        showToast({ message: 'User information is incomplete. Please contact support.', color: 'red', title: 'Sign In Failed' });
                        setSigninLoading(false);
                        return;
                      }

                      await handleConsultantPostLogin(Number(signinId), user_id);
                    } else {
                      setSigninError(res?.message || 'Invalid credentials');
                      showToast({ message: res?.message || 'Invalid credentials', color: 'red', title: 'Sign In Failed' });
                    }
                  } catch (err) {
                    setSigninError('Sign in failed. Please try again.');
                    showToast({ message: 'Sign in failed. Please try again.', color: 'red', title: 'Sign In Failed' });
                  }
                  setSigninLoading(false);
                }}
              >
                Sign In
              </Button>
              <Text size="xs" ta="center" c="dimmed">
                Don’t have an account?{' '}
                <Text span c="blue" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('signup')}>
                  Sign up here
                </Text>
              </Text>
              <Divider label="or" labelPosition="center" my="sm" />
              <Button fullWidth variant="outline" color="gray">Continue with Google</Button>
            </Stack>
          </Tabs.Panel>

          {/* Sign Up Panel */}
          <Tabs.Panel value="signup">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setSignupLoading(true);
                if (signupPassword !== signupConfirm) {
                  showToast({ message: 'Passwords do not match', color: 'red', title: 'Sign Up Failed' });
                  setSignupLoading(false);
                  return;
                }
                if (!signupId || !signupName || !signupMobile || !signupEmail) {
                  showToast({ message: 'Please fill in all required fields', color: 'red', title: 'Sign Up Failed' });
                  setSignupLoading(false);
                  return;
                }
                try {
                  const userPayload = {
                    emp_id: Number(signupId),
                    password: signupPassword,
                    role: 'Consultant'
                  };
                  const res = await addUser(userPayload);

                  if (res && (res.success || res.user)) {
                    const consultantPayload = {
                      name: signupName,
                      emp_id: signupId.toString(),
                      mobile_no: signupMobile,
                      email: signupEmail,
                      address: signupAddress || "",
                      current_role: signupRole || "",
                      user_id: res.user.id
                    };

                    await addConsultant(consultantPayload)
                      .catch(e => {
                        showToast({ message: 'Consultant creation failed: ' + (e?.response?.data?.message || e.message), color: 'red', title: 'Sign Up Failed' });
                        throw e;
                      });
                    setActiveTab('signin');
                    setSignupSuccess(true);
                    showToast({ message: 'Registration successful! Please sign in.', color: 'green', title: 'Sign Up Success' });
                  } else {
                    showToast({ message: res?.message || 'Sign up failed', color: 'red', title: 'Sign Up Failed' });
                  }
                } catch (err: any) {
                  showToast({ message: err?.response?.data?.message || 'Sign up failed. Please try again.', color: 'red', title: 'Sign Up Failed' });
                }
                setSignupLoading(false);
              }}
            >
              <Stack gap="sm">
                <Text fw={600} size="lg">Create your account</Text>
                <Box
                  mb={6}
                  p={{ base: 10, sm: 14 }}
                  style={{
                    borderRadius: 8,
                    background: isDark ? theme.colors.dark[5] : theme.colors.gray[0],
                  }}
                >
                  <Text size="sm" fw={500} mb={8}>User Credentials</Text>
                  <Group grow wrap="wrap">
                    <TextInput
                      label="Employee ID"
                      placeholder="2000..."
                      type="number"
                      leftSection={<IconId size={16} />}
                      value={signupId}
                      onChange={e => setSignupId(e.target.value)}
                      required
                    />
                  </Group>
                  <Group grow wrap="wrap" mt={8}>
                    <PasswordInput
                      label="Password"
                      placeholder="Create a password"
                      leftSection={<IconLock size={16} />}
                      value={signupPassword}
                      onChange={e => setSignupPassword(e.target.value)}
                      required
                    />
                    <PasswordInput
                      label="Confirm Password"
                      placeholder="Re-enter your password"
                      leftSection={<IconLock size={16} />}
                      value={signupConfirm}
                      onChange={e => setSignupConfirm(e.target.value)}
                      required
                    />
                  </Group>
                </Box>
                <Box
                  p={{ base: 10, sm: 14 }}
                  style={{
                    borderRadius: 8,
                    background: isDark ? theme.colors.dark[5] : theme.colors.gray[0],
                  }}
                >
                  <Text size="sm" fw={500} mb={8}>Consultant Details</Text>
                  <Grid gutter={{ base: 8, sm: 16 }}>
                    <Grid.Col span={gridColSpan}>
                      <TextInput
                        label="Name"
                        placeholder="Your name"
                        value={signupName}
                        onChange={e => setSignupName(e.target.value)}
                        required
                      />
                    </Grid.Col>
                    <Grid.Col span={gridColSpan}>
                      <TextInput
                        label="Mobile Number"
                        placeholder="Your mobile number"
                        value={signupMobile}
                        onChange={e => setSignupMobile(e.target.value)}
                        required
                      />
                    </Grid.Col>
                    <Grid.Col span={gridColSpan}>
                      <TextInput
                        label="Email"
                        placeholder="Your email"
                        value={signupEmail}
                        onChange={e => setSignupEmail(e.target.value)}
                        required
                      />
                    </Grid.Col>
                  </Grid>
                  <Grid gutter={{ base: 8, sm: 16 }} mt={0}>
                    <Grid.Col span={gridColSpan}>
                      <TextInput
                        label="Current Role"
                        placeholder="Your role"
                        value={signupRole}
                        onChange={e => setSignupRole(e.target.value)}
                      />
                    </Grid.Col>
                    <Grid.Col span={gridColSpan}>
                      <TextInput
                        label="Address"
                        placeholder="Your address"
                        value={signupAddress}
                        onChange={e => setSignupAddress(e.target.value)}
                        mt={0}
                      />
                    </Grid.Col>
                  </Grid>
                </Box>
                <Button
                  fullWidth
                  color="indigo"
                  type="submit"
                  loading={signupLoading}
                  mt="md"
                >
                  Sign Up
                </Button>
              </Stack>
            </form>
          </Tabs.Panel>
        </Tabs>
      </Paper>
    </Box>
  );
}