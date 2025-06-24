import {Stack, Title} from '@mantine/core';
import PersonalInfo from './PersonalInfo';
import SkillsCard from './SkillsCard';

export default function ProfilePage() {
    return (
        <Stack gap="xl">
            <Title order={2}>Consultant Profile</Title>
            <PersonalInfo/>
            <SkillsCard/>
        </Stack>
    );
}
