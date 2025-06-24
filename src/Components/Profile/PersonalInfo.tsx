import {
    Card,
    Group,
    Text,
    Avatar,
    Stack
} from '@mantine/core';
export default function PersonalInfo() {
    return (
        <Card withBorder shadow="sm" radius="md">
            <Group align="center">
                <Avatar size={64}
                    radius="xl"
                    src="https://api.dicebear.com/7.x/initials/svg?seed=SJ"
                    alt="Profile"/>
                <Stack gap={0}>
                    <Text fw={600}
                        size="lg">Sarah Johnson</Text>
                    <Text size="sm" c="gray.6">Frontend Consultant</Text>
                </Stack>
            </Group>
        </Card>
    );
}
