import { Card, Title, Text, Table, Group, Badge, Stack, Button, useMantineColorScheme, Paper } from '@mantine/core';
import { IconCalendarCheck } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { BarChart, PieChart } from '@mantine/charts';

const attendanceData = [
  { date: '2025-06-24', status: 'Present' },
  { date: '2025-06-25', status: 'Present' },
  { date: '2025-06-26', status: 'Absent' },
  { date: '2025-06-27', status: 'Present' },
  { date: '2025-06-28', status: 'On Leave' },
];

const statusColor = (status: string) => {
  switch (status) {
    case 'Present': return 'green';
    case 'Absent': return 'red';
    case 'On Leave': return 'yellow';
    default: return 'gray';
  }
};

const presentCount = attendanceData.filter((a) => a.status === 'Present').length;
const absentCount = attendanceData.filter((a) => a.status === 'Absent').length;
const leaveCount = attendanceData.filter((a) => a.status === 'On Leave').length;
const total = attendanceData.length;
const presentPercent = Math.round((presentCount / total) * 100);
const absentPercent = Math.round((absentCount / total) * 100);
const leavePercent = Math.round((leaveCount / total) * 100);

export default function AttendanceReport() {
  const navigate = useNavigate();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const cardBg = isDark
    ? 'linear-gradient(90deg,rgb(35, 61, 70) 60%,rgb(59, 76, 91) 100%)'
    : 'linear-gradient(90deg, #f8fafc 60%,rgb(224, 255, 249) 100%)';

  return (
        <Paper withBorder shadow="md" radius="md" p="lg" w="100%" style={{ background: cardBg, minHeight: '100vh' }}>
      <Group justify="space-between" align="center" mb="md">
        <Group gap="xs">
          <IconCalendarCheck size={28} color="#22c55e" />
          <Title order={2}>Attendance Report</Title>
        </Group>
        <Button variant="light" color="indigo" onClick={() => navigate(-1)}>
          Back
        </Button>
      </Group>
      <Text size="sm" c="dimmed" mb="md">
        Here is your attendance record for the past week:
      </Text>
      <Group align="flex-start" gap="xl" mb="lg">
        <Stack gap={4} style={{ minWidth: 180 }}>
          <Text fw={600} size="md">Summary</Text>
          <Group gap="xs">
            <Badge color="green">Present: {presentCount}</Badge>
            <Badge color="red">Absent: {absentCount}</Badge>
            <Badge color="yellow">On Leave: {leaveCount}</Badge>
          </Group>
          <Text size="xs" c="dimmed">Total Days: {total}</Text>
        </Stack>
        <PieChart
          h={160}
          w={180}
          withLabels
          data={[
            { name: 'Present', value: presentCount, color: 'green' },
            { name: 'Absent', value: absentCount, color: 'red' },
            { name: 'On Leave', value: leaveCount, color: 'yellow' },
          ]}
        />
      </Group>
      <BarChart
        h={180}
        w="100%"
        data={attendanceData.map((a) => ({
          date: a.date,
          Present: a.status === 'Present' ? 1 : 0,
          Absent: a.status === 'Absent' ? 1 : 0,
          'On Leave': a.status === 'On Leave' ? 1 : 0,
        }))}
        dataKey="date"
        series={[
          { name: 'Present', color: 'green' },
          { name: 'Absent', color: 'red' },
          { name: 'On Leave', color: 'yellow' },
        ]}
        withLegend
        withTooltip
        mb="lg"
      />
      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Date</Table.Th>
            <Table.Th>Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {attendanceData.map((row) => (
            <Table.Tr key={row.date}>
              <Table.Td>{row.date}</Table.Td>
              <Table.Td>
                <Badge color={statusColor(row.status)} variant="filled">
                  {row.status}
                </Badge>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Paper>
  );
}
