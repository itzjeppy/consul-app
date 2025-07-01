import {
  Box,
  TextInput,
  Textarea,
  Button,
  Stack,
  Title,
  Group,
  ActionIcon,
  Loader,
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
import { useState, useEffect } from 'react';
import { showNotification } from '@mantine/notifications';
import { getConsultantByEmpId, editConsultant } from '../../api/consultant';

export default function ProfileEditPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    mobile_no: '',
    email: '',
    address: '',
    current_role: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [consultantId, setConsultantId] = useState<number | null>(null);

  // Assume emp_id is stored in localStorage/sessionStorage
  const emp_id =
    localStorage.getItem('employeeId') || sessionStorage.getItem('employeeId');

  useEffect(() => {
    async function fetchConsultant() {
      setLoading(true);
      try {
        console.log('[ProfileEditPage] Fetching consultant for emp_id:', emp_id);
        if (!emp_id) throw new Error('Employee ID not found');
        const consultantData = await getConsultantByEmpId(Number(emp_id));
        // Use direct fields from your Consultant model
        const c =
          (consultantData && consultantData.consultant) || consultantData || {};
        console.log('[ProfileEditPage] Consultant data fetched:', c);
        setConsultantId(c.id); // Store consultant_id for editing
        setForm({
          name: c.name || '',
          mobile_no: c.mobile_no || '',
          email: c.email || '',
          address: c.address || '',
          current_role: c.current_role || '',
        });
      } catch (e: any) {
        console.error('[ProfileEditPage] Error while fetching consultant:', e);
        showNotification({
          title: 'Error',
          message: e?.message || 'Failed to load profile data.',
          color: 'red',
        });
      }
      setLoading(false);
    }
    fetchConsultant();
  }, [emp_id]);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultantId) {
      showNotification({
        title: 'Error',
        message: 'Consultant ID not found. Cannot update profile.',
        color: 'red',
      });
      return;
    }
    setSaving(true);
    try {
      console.log('[ProfileEditPage] Submitting profile edit for consultantId:', consultantId);
      console.log('[ProfileEditPage] Form data:', form);
      // Await editConsultant and only navigate after the request is complete
      const result = await editConsultant(Number(consultantId), {
        name: form.name,
        mobile_no: form.mobile_no,
        email: form.email,
        address: form.address,
        current_role: form.current_role,
      });
      console.log('[ProfileEditPage] editConsultant response:', result);
      showNotification({
        title: 'Profile Updated',
        message: 'Your profile has been successfully updated.',
        color: 'green',
      });
      setSaving(false); // Ensure loading state is cleared before navigation
      navigate('/dashboard');
    } catch (e: any) {
      console.error('[ProfileEditPage] Error while editing consultant:', e);
      showNotification({
        title: 'Error',
        message: e?.message || 'Failed to update profile.',
        color: 'red',
      });
      setSaving(false);
    }
  };

  return (
    <Box p="lg" maw={600} mx="auto">
      <Group justify="flex-start" mb="md">
        <ActionIcon variant="subtle" onClick={() => navigate(-1)}>
          <IconArrowLeft />
        </ActionIcon>
        <Title order={3}>Edit Your Profile</Title>
      </Group>

      {loading ? (
        <Stack align="center">
          <Loader />
        </Stack>
      ) : (
        <form onSubmit={handleSubmit}>
          <Stack gap="md">
            <TextInput
              label="Full Name"
              placeholder="John Doe"
              leftSection={<IconUser size={16} />}
              value={form.name}
              onChange={(e) => handleChange('name', e.currentTarget.value)}
              required
            />
            <TextInput
              label="Contact Number"
              placeholder="+91 9876543210"
              leftSection={<IconPhone size={16} />}
              value={form.mobile_no}
              onChange={(e) => handleChange('mobile_no', e.currentTarget.value)}
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
              value={form.current_role}
              onChange={(e) => handleChange('current_role', e.currentTarget.value)}
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
            <Button type="submit" color="indigo" fullWidth loading={saving}>
              Save & Continue
            </Button>
          </Stack>
        </form>
      )}
    </Box>
  );
}