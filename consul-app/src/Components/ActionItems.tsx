import { SimpleGrid, Alert, Text } from '@mantine/core';
import { IconAlertCircle, IconBulb } from '@tabler/icons-react';

export default function ActionItems() {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
      <Alert icon={<IconAlertCircle />} color="blue" title="Resume Update Required">
        <Text size="sm">
          Your resume hasn't been updated in the last 30 days. Please review and update.
        </Text>
      </Alert>
      <Alert icon={<IconBulb />} color="yellow" title="New Opportunities Available">
        <Text size="sm">3 new projects match your skills. Apply now to increase your chances.</Text>
      </Alert>
    </SimpleGrid>
  );
}
