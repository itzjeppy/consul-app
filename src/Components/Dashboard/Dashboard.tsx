import {Paper, Stack} from '@mantine/core';
import ActionItems from './ActionItems';
import QuickActions from './QuickActions';
import StatsCards from './StatsCards';
import WelcomeBanner from './WelcomeBanner';
import WorkflowProgress from './WorkflowProgress';

export default function Dashboard() {

    return (
<Paper pb="lg">
  <Stack gap="xl">
    <WelcomeBanner userName="Mike Rophone" />
    <StatsCards />
    <WorkflowProgress />
    <ActionItems />
    <QuickActions />
  </Stack>
</Paper>

    );

}
