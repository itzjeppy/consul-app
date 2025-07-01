import React from "react";
import { Card, Stack, Group, Title, Badge, Text, Button, useMantineColorScheme } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";

export interface Training {
  title: string;
  description: string;
  level: string;
  tags?: string[]; // tags can be undefined or empty
  duration?: string;
  technologies_learnt?: string; // comma-separated string or array
}

interface TrainingCardProps {
  training: Training;
  priority?: boolean;
  actionButton?: React.ReactNode; // <-- Add this line
}

export default function TrainingCard({ training, priority = false, actionButton }: TrainingCardProps) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const cardBg = priority
    ? 'linear-gradient(135deg, #8931b2 0%, #4f23c0 100%)'
    : isDark
      ? '#2d3142'
      : '#f8fafc';
  const titleColor = priority ? 'white' : isDark ? 'gray.0' : 'black';
  const descColor = priority ? 'gray.2' : isDark ? 'gray.3' : 'dimmed';
  const badgeColor = priority ? 'grape.1' : isDark ? 'grape.4' : 'grape.7';
  const techTagVariant = priority ? 'gradient' : isDark ? 'filled' : 'outline';
  const techTagColor = priority ? 'grape.8' : isDark ? 'grape.6' : 'grape.8';
  const btnColor = priority ? 'grape.0' : isDark ? 'grape.4' : 'grape.7';

  // Parse technologies_learnt into an array for display as badges
  let techs: string[] = [];
  if (Array.isArray(training.technologies_learnt)) {
    techs = training.technologies_learnt;
  } else if (typeof training.technologies_learnt === "string" && training.technologies_learnt.trim() !== "") {
    techs = training.technologies_learnt.split(',').map(t => t.trim()).filter(Boolean);
  }

  return (
    <Card
      withBorder
      radius="md"
      shadow="sm"
      p="lg"
      bg={cardBg}
      style={{
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: "200px",
        height: "100%"
      }}
    >
      <Stack gap="xs" style={{ flexGrow: 1 }}>
        <Group justify="space-between" align="flex-start">
          <Title order={3} c={titleColor} style={{ wordBreak: 'break-word' }}>
            {training.title}
          </Title>
          <Badge variant="light" color={badgeColor} size="md" style={{ fontWeight: 600, fontSize: 13 }}>
            {training.level}
          </Badge>
        </Group>
        <Text size="sm" c={descColor} style={{ wordBreak: 'break-word' }}>
          {training.description}
        </Text>
        {training.duration && (
          <Text size="xs" c={priority ? 'gray.2' : isDark ? 'gray.4' : 'grape.8'}>
            Duration: {training.duration}
          </Text>
        )}
        {/* Technologies as badges */}
        <Group gap="xs" wrap="wrap" mb={techs.length ? 0 : "xs"}>
          {techs.length > 0
            ? techs.map((tech, i) => (
                <Badge
                  key={tech + i}
                  variant={techTagVariant}
                  autoContrast
                  gradient={{ from: 'violet', to: 'grape', deg: 159 }}
                  color={techTagColor}
                >
                  {tech}
                </Badge>
              ))
            : null}
        </Group>
      </Stack>
      {actionButton ? (
        actionButton
      ) : (
        <Button
          rightSection={<IconArrowRight size={16} />}
          variant="light"
          color={btnColor}
          mt="xs"
          style={{ alignSelf: 'flex-end', marginTop: 'auto' }}
        >
          View Details
        </Button>
      )}
    </Card>
  );
}