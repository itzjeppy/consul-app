import {Stack} from '@mantine/core';
import ActionItems from './ActionItems';
import QuickActions from './QuickActions';
import StatsCards from './StatsCards';
import WelcomeBanner from './WelcomeBanner';
import WorkflowProgress from './WorkflowProgress';

export default function Dashboard() {

    return (
        <Stack gap="xl">
            <WelcomeBanner userName="Sarah Johnson"/>
            <StatsCards/>
            <WorkflowProgress/>
            <ActionItems/>
            <QuickActions/>
        </Stack>

    );

}
