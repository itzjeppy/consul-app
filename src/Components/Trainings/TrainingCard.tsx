import { Card, Stack, Group, Title, Badge, Text, Button, useMantineColorScheme } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";

export interface Training {
  title: string;
  description: string;
  level: string;
  tags: string[];
}

interface TrainingCardProps {
  training: Training;
  priority?: Boolean;
}

export default function TrainingCard({ training, priority=false }: TrainingCardProps) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const cardBg = priority
    ? 'linear-gradient(135deg, #8931b2 0%, #4f23c0 100%)' // Gradient for priority, always
    : isDark
      ? '#2d3142' // slightly lighter than Mantine dark background
      : '#f8fafc'; // slightly lighter than Mantine light background
  const titleColor = priority ? 'white' : isDark ? 'gray.0' : 'black';
  const descColor = priority ? 'gray.2' : isDark ? 'gray.3' : 'dimmed';
  const badgeColor = priority ? 'grape.1' : isDark ? 'gr  ape.4' : 'grape.7';
  const tagVariant = priority ? 'gradient' : isDark ? 'filled' : 'outline';
  const tagColor = priority ? 'grape.8' : isDark ? 'grape.6' : 'grape.8';
  const btnColor = priority ? 'grape.0' : isDark ? 'grape.4' : 'grape.7';

  return (
    <Card withBorder radius="md" shadow="sm" p="lg" bg={cardBg} style={{display:"flex", flexDirection:'column', justifyContent:'space-between', height: "200px" }}>
      <Stack gap="xs">
        <Group justify="space-between">
          <Title order={3} c={titleColor}>{training.title}</Title>
          <Badge variant="light" color={badgeColor}>
            {training.level}
          </Badge>
        </Group>
        <Text size="sm" c={descColor}>
          {training.description}
        </Text>
        <Group gap="xs">
          {training.tags.map((tag) => (
            <Badge key={tag} variant={tagVariant} autoContrast gradient={{ from: 'violet', to: 'grape', deg: 159 }} color={tagColor}>
              {tag}
            </Badge>
          ))}
        </Group>
      </Stack>
      <Button
        rightSection={<IconArrowRight size={16} />}
        variant="light"
        color={btnColor}
        mt="xs"
      >
        View Details
      </Button>
    </Card>
  );
}
