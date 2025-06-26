import {Paper, Stack} from '@mantine/core';
import ActionItems from './ActionItems';
import QuickActions from './QuickActions';
import StatsCards from './StatsCards';
import WelcomeBanner from './WelcomeBanner';
import WorkflowProgress from './WorkflowProgress';

export default function Dashboard() {

    return (
<Paper mb="xl">
  <Stack gap="lg">
    <WelcomeBanner userName="Mike Rophone" />
    <ActionItems />
    <StatsCards />
    <WorkflowProgress />
    <QuickActions />
  </Stack>
</Paper>

    );

}
