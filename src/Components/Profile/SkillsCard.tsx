import {
    Card,
    Text,
    Group,
    Stack,
    Rating,
    useMantineColorScheme,
} from '@mantine/core';
import { IconStar, IconCalendarEvent } from '@tabler/icons-react';

interface Skill {
    name: string;
    years: number;
    strength: number; // 1 to 5 stars
}

// Try to load updated skills from localStorage if available
let loadedSkills: Skill[] | null = null;
try {
  const stored = localStorage.getItem('profileSkills');
  if (stored) {
    loadedSkills = JSON.parse(stored).map((s: any) => ({
      name: s.name,
      years: s.years ?? 1,
      strength: s.rating ?? s.strength ?? 3,
    }));
  }
} catch {}

const skills: Skill[] = loadedSkills || [
  { name: 'React', years: 3, strength: 5 },
  { name: 'TypeScript', years: 2, strength: 4 },
  { name: 'GraphQL', years: 1, strength: 3 },
  { name: 'TailwindCSS', years: 2, strength: 4 },
];

export default function SkillsCard() {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const cardBg = isDark
    ? 'linear-gradient(90deg, #232946 60%, #3b3b5b 100%)'
    : 'linear-gradient(90deg, #f8fafc 60%, #e0e7ff 100%)';
  const titleColor = isDark ? 'gray.0' : 'indigo.7';
  const groupBg = isDark ? '#232946' : '#f4f7ff';
  const labelColor = isDark ? 'gray.1' : 'gray.8';

  return (
    <Card withBorder shadow="md" radius="md" p="lg" style={{ background: cardBg }}>
      <Text fw={700} size="lg" mb="sm" c={titleColor} style={{ letterSpacing: 0.5 }}>
        Skills
      </Text>
      <Stack gap="md">
        {skills.map((skill) => (
          <Group key={skill.name} justify="space-between" align="center" p="sm" style={{ background: groupBg, borderRadius: 10 }}>
            <Stack gap={0} style={{ flexGrow: 1 }}>
              <Group gap={6} align="center">
                <IconStar size={18} color="#f59e42" fill="#f59e42" />
                <Text fw={600} size="md" c={labelColor}>{skill.name}</Text>
              </Group>
              <Group gap={4} align="center">
                <IconCalendarEvent size={14} style={{ marginRight: 2 }} />
                <Text size="xs" c={labelColor}>{skill.years} year{skill.years > 1 ? 's' : ''} experience</Text>
              </Group>
            </Stack>
            <Rating value={skill.strength} readOnly size="md" color="yellow" />
          </Group>
        ))}
      </Stack>
    </Card>
  );
}
