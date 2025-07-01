import React, { useEffect, useState } from 'react';
import {
    Card,
    Text,
    Group,
    Stack,
    Rating,
    useMantineColorScheme,
    Loader,
} from '@mantine/core';
import { IconStar, IconCalendarEvent } from '@tabler/icons-react';
import { getSkillsByEmpId } from '../../api/skills';

interface Skill {
    id: number;
    consultant_id: number;
    technologies_known: string;
    years_of_experience: number;
    strength_of_skill: number; // 1 to 5
}

export default function SkillsCard() {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const cardBg = isDark
    ? 'linear-gradient(90deg, #232946 60%, #3b3b5b 100%)'
    : 'linear-gradient(90deg, #f8fafc 60%, #e0e7ff 100%)';
  const titleColor = isDark ? 'gray.0' : 'indigo.7';
  const groupBg = isDark ? '#232946' : '#f4f7ff';
  const labelColor = isDark ? 'gray.1' : 'gray.8';

  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchSkills() {
      setLoading(true);
      setError('');
      try {
        const empIdStr = localStorage.getItem('employeeId') || '';
        const empId = Number(empIdStr);
        const data = await getSkillsByEmpId(empId);
        setSkills(data);
      } catch (err: any) {
        setError('Failed to load skills');
      } finally {
        setLoading(false);
      }
    }
    fetchSkills();
  }, []);

  if (loading) {
    return (
      <Card withBorder shadow="md" radius="md" p="lg" style={{ background: cardBg }}>
        <Loader color="indigo" />
      </Card>
    );
  }

  if (error) {
    return (
      <Card withBorder shadow="md" radius="md" p="lg" style={{ background: cardBg }}>
        <Text c="red">{error}</Text>
      </Card>
    );
  }

  return (
    <Card withBorder shadow="md" radius="md" p="lg" style={{ background: cardBg }}>
      <Text fw={700} size="lg" mb="sm" c={titleColor} style={{ letterSpacing: 0.5 }}>
        Skills
      </Text>
      <Stack gap="md">
        {skills.length === 0 ? (
          <Text c="dimmed">No skills found.</Text>
        ) : (
          skills.map((skill) => (
            <Group key={skill.id} justify="space-between" align="center" p="sm" style={{ background: groupBg, borderRadius: 10 }}>
              <Stack gap={0} style={{ flexGrow: 1 }}>
                <Group gap={6} align="center">
                  <IconStar size={18} color="#f59e42" fill="#f59e42" />
                  <Text fw={600} size="md" c={labelColor}>{skill.technologies_known}</Text>
                </Group>
                <Group gap={4} align="center">
                  <IconCalendarEvent size={14} style={{ marginRight: 2 }} />
                  <Text size="xs" c={labelColor}>{skill.years_of_experience} year{skill.years_of_experience > 1 ? 's' : ''} experience</Text>
                </Group>
              </Stack>
              <Rating value={skill.strength_of_skill} count={5} readOnly size="md" color="yellow" />
            </Group>
          ))
        )}
      </Stack>
    </Card>
  );
}
