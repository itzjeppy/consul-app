import {
    Box,
    TextInput,
    Textarea,
    Button,
    Stack,
    Title,
    Group,
    ActionIcon,
  } from '@mantine/core';
  import {
    IconArrowLeft,
    IconUser,
    IconAt,
    IconPhone,
    IconBriefcase,
    IconMapPin,
  } from '@tabler/icons-react';
  import { useNavigate } from 'react-router-dom';
  import { useState } from 'react';
  
  export default function ProfileEditPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
      fullName: '',
      contact: '',
      email: '',
      address: '',
      role: '',
    });
  
    const handleChange = (field: string, value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // TODO: send form data to backend
      navigate('/dashboard'); // redirect after saving
    };
  
    return (
      <Box p="lg" maw={600} mx="auto">
        <Group justify="flex-start" mb="md">
          <ActionIcon variant="subtle" onClick={() => navigate(-1)}>
            <IconArrowLeft />
          </ActionIcon>
          <Title order={3}>Complete Your Profile</Title>
        </Group>
  
        <form onSubmit={handleSubmit}>
          <Stack gap="md">
            <TextInput
              label="Full Name"
              placeholder="John Doe"
              leftSection={<IconUser size={16} />}
              value={form.fullName}
              onChange={(e) => handleChange('fullName', e.currentTarget.value)}
              required
            />
            <TextInput
              label="Contact Number"
              placeholder="+91 9876543210"
              leftSection={<IconPhone size={16} />}
              value={form.contact}
              onChange={(e) => handleChange('contact', e.currentTarget.value)}
              required
            />
            <TextInput
              label="Email"
              placeholder="you@example.com"
              leftSection={<IconAt size={16} />}
              value={form.email}
              onChange={(e) => handleChange('email', e.currentTarget.value)}
              required
            />
            <TextInput
              label="Current Role"
              placeholder="Software Engineer"
              leftSection={<IconBriefcase size={16} />}
              value={form.role}
              onChange={(e) => handleChange('role', e.currentTarget.value)}
              required
            />
            <Textarea
              label="Address (Optional)"
              placeholder="123 Main Street, City, ZIP"
              autosize
              minRows={2}
              leftSection={<IconMapPin size={16} />}
              value={form.address}
              onChange={(e) => handleChange('address', e.currentTarget.value)}
            />
            <Button type="submit" color="indigo" fullWidth>
              Save & Continue
            </Button>
          </Stack>
        </form>
      </Box>
    );
  }