import { Card, Stack, Group, Title, Badge, Text, Button } from "@mantine/core";
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
  return (
    <Card withBorder radius="md" shadow="sm" p="lg" bg={ priority===true ? 'linear-gradient(135deg, #8931b2   0%, #4f23c0 100%)' : "white"} style={{display:"flex", flexDirection:'column', justifyContent:'space-between', height: "200px" }}>
      <Stack gap="xs">
        <Group justify="space-between">
          <Title order={5} c={ priority===true ? "white" : "black"}>{training.title}</Title>
          <Badge variant="light" color={ priority===true ? "grape.1" : "grape.7"}>
            {training.level}
          </Badge>
        </Group>
        <Text size="sm"  c={ priority===true ? "gray.3 " : "dimmed"}>
          {training.description}
        </Text>
        <Group gap="xs">
          {training.tags.map((tag) => (
            <Badge key={tag} variant={ priority===true ? "gradient" : "outline"} autoContrast gradient={{ from: 'violet', to: 'grape', deg: 159 }}  color="grape.8">
              {tag}
            </Badge>
          ))}
        </Group>
        </Stack>
        <Button
          rightSection={<IconArrowRight size={16} />}
          variant="light"
          color={ priority===true ? "grape.0" : "grape.7"}
          mt="xs"
        >
          View Details
        </Button>
    </Card>
  );
}
