import {Paper, Stack} from '@mantine/core';
import {useEffect, useState} from 'react';
import { getConsultantByEmpId } from '../../api/consultant';
import ActionItems from './ActionItems';
import QuickActions from './QuickActions';
import StatsCards from './StatsCards';
import WelcomeBanner from './WelcomeBanner';
import WorkflowProgress from './WorkflowProgress';

export default function Dashboard() {
  const [consultantName, setConsultantName] = useState<string>('');

  useEffect(() => {
    // Get emp_id from localStorage/sessionStorage (depends on your auth storage)
    const empId = localStorage.getItem('employeeId') || sessionStorage.getItem('employeeId');
    if (empId) {
      getConsultantByEmpId(Number(empId))
        .then(res => {
          if (res && res.consultant && res.consultant.name) {
            setConsultantName(res.consultant.name);
          }
        })
        .catch(() => setConsultantName(''));
    }
  }, []);

    return (
<Paper mb="xl">
  <Stack gap="lg">
    <WelcomeBanner userName={consultantName} />
    <ActionItems />
    <StatsCards />
    <WorkflowProgress />
  </Stack>
</Paper>

    );

}
