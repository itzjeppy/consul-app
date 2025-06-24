import {

    Card,

    Text,

    Group,

    Stack,

    Badge,

    Divider

} from '@mantine/core';

interface Certification {

    name: string;

    issuedDate: string;

    validTill: string;

}

const certifications: Certification[] = [

    {

        name: 'Certified React Developer',

        issuedDate: '2023-01-15',

        validTill: '2025-01-15'

    }, {

        name: 'TypeScript Certification',

        issuedDate: '2022-06-10',

        validTill: '2024-06-10'

    },

];

// Optional: helper to format YYYY-MM-DD to readable format

function formatDate(date : string) {

    return new Date(date).toLocaleDateString(undefined, {

        year: 'numeric',

        month: 'short',

        day: 'numeric'

    });

}

export default function CertificationsCard() {

    return (
        <Card withBorder shadow="sm" radius="md">
            <Text fw={600}
                mb="sm">

                Certifications
            </Text>
            <Stack gap="sm">

                {
                certifications.map((cert, index) => (
                    <Stack key={
                            cert.name
                        }
                        gap="xs">
                        <Group justify="space-between">
                            <Text fw={500}>
                                {
                                cert.name
                            }</Text>
                            <Badge color="indigo" variant="light">

                                Active
                            </Badge>
                        </Group>
                        <Group gap="md" c="gray.6" fz="sm">
                            <Text>Issued: {
                                formatDate(cert.issuedDate)
                            }</Text>
                            <Text>Valid till: {
                                formatDate(cert.validTill)
                            }</Text>
                        </Group>

                        {
                        index < certifications.length - 1 && <Divider/>
                    } </Stack>

                ))
            } </Stack>
        </Card>

    );

}
