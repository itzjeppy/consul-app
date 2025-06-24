import {
    Card,
    Title,
    Group,
    Progress,
    Text,
    Stack,
  } from '@mantine/core';
  import {
    IconFile,
    IconCalendarCheck,
    IconBriefcase,
    IconSchool,
  } from '@tabler/icons-react';
  
  export default function WorkflowProgress() {
    const icons = [IconFile, IconCalendarCheck, IconBriefcase, IconSchool];
    const steps = ['Resume Updated', 'Attendance Reported', 'Opportunities', 'Training'];
    const colors: ('blue' | 'green' | 'yellow' | 'purple')[] = ['blue', 'green', 'yellow', 'purple'];
  
    return (
      <Card withBorder radius="md" shadow='sm'>
        <Title order={3} mb="sm">
          Your Workflow Progress
        </Title>
  
        <Group grow>
          {colors.map((color, i) => (
            <Progress value={50} size="sm" radius="md" color={color} key={i} />
          ))}
        </Group>
  
        <Group justify="space-between" mt="lg">
          {icons.map((Icon, i) => (
            <Stack gap={2} align="center" key={i}>
              <Icon size={24} />
              <Text size="xs">{steps[i]}</Text>
            </Stack>
          ))}
        </Group>
      </Card>
    );
  }
  