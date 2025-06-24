import {

    Card,

    Title,

    Group,

    Progress,

    Text,

    Stack,

    Box

} from '@mantine/core';

import {IconFile, IconCalendarCheck, IconBriefcase, IconSchool} from '@tabler/icons-react';

export default function WorkflowProgress() {

    const steps = [

        {

            label: 'Resume Updated',

            icon: IconFile,

            color: 'blue',

            value: 40

        }, {

            label: 'Attendance Reported',

            icon: IconCalendarCheck,

            color: 'green',

            value: 60

        }, {

            label: 'Opportunities',

            icon: IconBriefcase,

            color: 'yellow',

            value: 50

        }, {

            label: 'Training',

            icon: IconSchool,

            color: 'purple',

            value: 65

        },

    ];

    return (
        <Card withBorder radius="md" shadow="sm" p="md">
            <Title order={4}
                mb="sm">

                Your Workflow Progress
            </Title>
            <Stack gap="md">

                {
                steps.map(({label, icon: Icon, color, value}) => (
                    <Group key={label}
                        align="center"
                        gap="sm"
                        wrap="nowrap">
                        <Box w={32}>
                            <Icon size={24}
                                color={
                                    `var(--mantine-color-${color}-6)`
                                }/>
                        </Box>
                        <Stack gap={2}
                            style={
                                {flex: 1}
                        }>
                            <Group justify="space-between">
                                <Text size="sm"
                                    fw={500}>

                                    {label} </Text>
                                <Text size="xs" c="dimmed">

                                    {value}%
                                </Text>
                            </Group>
                            <Progress value={value}
                                size="sm"
                                radius="md"
                                color={color}/>
                        </Stack>
                    </Group>

                ))
            } </Stack>
        </Card>

    );

}
