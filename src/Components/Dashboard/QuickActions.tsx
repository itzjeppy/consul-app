import { SimpleGrid, Button } from '@mantine/core';
import {
  IconUpload,
  IconCalendarPlus,
  IconSearch,
  IconBook,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

interface Action {
  name: string;
  icon: React.FC<any>;
  color: string;
}

const actions: Action[] = [
  { name: 'Upload Resume', icon: IconUpload, color: 'blue' },
  { name: 'Report Attendance', icon: IconCalendarPlus, color: 'green' },
  { name: 'Find Opportunities', icon: IconSearch, color: 'yellow' },
  { name: 'Start Training', icon: IconBook, color: 'grape' },
];

export default function QuickActions() {
  const navigate = useNavigate();
  return (
    <SimpleGrid cols={{ base: 2, md: 4 }} spacing="md">
      {actions.map(({ name, icon: Icon, color }) => (
        <Button
          key={name}
          variant="light"
          color={color}
          leftSection={<Icon size={18} />}
          radius="md"
          onClick={() => {
            if (name === 'Report Attendance') navigate('/attendance-report');
          }}
        >
          {name}
        </Button>
      ))}
    </SimpleGrid>
  );
}
