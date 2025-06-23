import { MantineProvider, Container, Stack } from '@mantine/core';
import ActionItems from './Components/ActionItems';
import NavBar from './Components/NavBar';
import QuickActions from './Components/QuickActions';
import StatsCards from './Components/StatsCards';
import WelcomeBanner from './Components/WelcomeBanner';
import WorkflowProgress from './Components/WorkflowProgress';


export default function App() {
  return (
    <MantineProvider defaultColorScheme="light">
      <NavBar />
      <Container size="lg" py="xl">
        <Stack gap="xl">
          <WelcomeBanner userName="Sarah Johnson" />
          <StatsCards />
          <WorkflowProgress />
          <ActionItems />
          <QuickActions />
        </Stack>
      </Container>
    </MantineProvider>
  );
}
