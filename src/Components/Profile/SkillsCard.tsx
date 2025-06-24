import {
    Card,
    Text,
    Badge,
    Group,
} from '@mantine/core';
const skills = ['React', 'TypeScript', 'GraphQL', 'TailwindCSS'];
export default function SkillsCard() {
    return (
        <Card withBorder shadow="sm" radius="md">
            <Text fw={600}
                mb="sm">Skills</Text>
            <Group gap="xs" wrap="wrap">
                {
                skills.map((skill) => (
                    <Badge key={skill}
                        color="indigo"
                        variant="light"
                        size="sm">
                        {skill} </Badge>
                ))
            } </Group>
        </Card>
    );
}
