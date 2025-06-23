import { SimpleGrid } from '@mantine/core';
import ResumeCard from './cards/ResumeCard';
import AttendanceCard from './cards/AttendanceCard';
import OpportunitiesCard from './cards/OpportunitiesCard';
import TrainingCard from './cards/TrainingCard';


export default function StatsCards() {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md" >
      <ResumeCard />
      <AttendanceCard />
      <OpportunitiesCard />
      <TrainingCard />
    </SimpleGrid>
  );
}
