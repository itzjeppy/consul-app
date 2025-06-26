import {
    Card,
    Title,
    Text,
    Badge,
    Stack,
    SimpleGrid,
    Group,
    Box,
    ActionIcon
} from '@mantine/core';
import {IconArrowLeft, IconBriefcase} from '@tabler/icons-react';
import {useNavigate} from 'react-router-dom';

const dummyApplications = [
    {
        title: 'Frontend Developer',
        company: 'TechCorp',
        status: 'Under Review'
    }, {
        title: 'Backend Developer',
        company: 'ServerBase',
        status: 'Interview Scheduled'
    }, {
        title: 'AI Research Intern',
        company: 'MindLabs',
        status: 'Applied'
    },
];

export default function ApplicationsPage() {

    const navigate = useNavigate();
    return (
        <Box p="lg">
            <Group justify="flex-start" mb="lg">
                <ActionIcon variant="subtle" color="yellow.7"
                    onClick={
                        () => navigate(-1)
                }>
                    <IconArrowLeft/>
                </ActionIcon>
                <Title order={2}
                    mb="lg">
                    My Applications
                </Title>
            </Group>
            <SimpleGrid cols={
                    {
                        base: 1,
                        sm: 2,
                        md: 3
                    }
                }
                spacing="lg">
                {
                dummyApplications.map((app, index) => (
                    <Card key={index}
                        withBorder
                        radius="md"
                        shadow="sm">
                        <Stack>
                            <Group justify="space-between">
                                <Title order={5}>
                                    {
                                    app.title
                                }</Title>
                                <Badge color="yellow" variant="light">
                                    {
                                    app.status
                                } </Badge>
                            </Group>
                            <Text size="sm" c="dimmed">
                                {
                                app.company
                            } </Text>
                            <Text size="xs" mt="sm">
                                Your application is currently:
                                <strong>{
                                    app.status
                                }</strong>
                            </Text>
                        </Stack>
                    </Card>
                ))
            } </SimpleGrid>
        </Box>
    );
}
