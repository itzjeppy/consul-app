import {
    Card,
    Text,
    Group,
    Stack,
    Rating,
    Progress,
    rem
} from '@mantine/core';

interface Skill {
    name: string;
    years: number;
    strength: number; // 1 to 5 stars
}

const skills: Skill[] = [
    {
        name: 'React',
        years: 3,
        strength: 5
    }, {
        name: 'TypeScript',
        years: 2,
        strength: 4
    }, {
        name: 'GraphQL',
        years: 1,
        strength: 3
    }, {
        name: 'TailwindCSS',
        years: 2,
        strength: 4
    },

];

export default function SkillsCard() {
    return (
        <Card withBorder shadow="sm" radius="md">
            <Text fw={600}
                mb="sm">

                Skills
            </Text>
            <Stack gap="sm">
                {
                skills.map((skill) => (
                    <Group key={
                            skill.name
                        }
                        justify="space-between"
                        align="center">
                        <Stack gap={0}
                            style={
                                {flexGrow: 1}
                        }>
                            <Text fw={500}>
                                {
                                skill.name
                            }</Text>
                            <Text size="xs" c="gray.6">
                                {
                                skill.years
                            }
                                year{
                                skill.years > 1 ? 's' : ''
                            }
                                experience
                            </Text>
                        </Stack>
                        <Rating value={
                                skill.strength
                            }
                            readOnly
                            size="sm"/>
                    </Group>
                ))
            } </Stack>
        </Card>
    );
}
