import {
    Card,
    Text,
    Group,
    Stack,
    Badge,
    Divider,
    useMantineColorScheme
} from '@mantine/core';
import { IconCertificate, IconCalendarCheck, IconCalendarEvent } from '@tabler/icons-react';
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

function formatDate(date: string) {
    return new Date(date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

}

export default function CertificationsCard() {
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

                Certifications
            </Text>
            <Stack gap="md">

                {
                    certifications.map((cert, index) => (
                        <Stack key={
                            cert.name
                        }
                            gap="xs" p="sm" style={{
                                background: groupBg,

                                borderRadius: 10

                            }}>
                            <Group justify="space-between" align="center">
                                <Group gap={6} align="center">
                                    <IconCertificate size={20} color="#6366f1" />
                                    <Text fw={600} size="md" c={labelColor}>{cert.name}</Text>
                                </Group>
                                <Badge color="indigo" variant="light" size="md">

                                    Active
                                </Badge>
                            </Group>
                            <Group gap="md" c={labelColor} fz="sm">
                                <Group gap={4} align="center">
                                    <IconCalendarEvent size={16} style={{
                                        marginRight: 2

                                    }} />
                                    <Text>Issued: {
                                        formatDate(cert.issuedDate)
                                    }</Text>
                                </Group>
                                <Group gap={4} align="center">
                                    <IconCalendarCheck size={16} style={{
                                        marginRight: 2

                                    }} />
                                    <Text>Valid till: {
                                        formatDate(cert.validTill)
                                    }</Text>
                                </Group>
                            </Group>

                            {
                                index < certifications.length - 1 && <Divider mt="xs" />
                            } </Stack>

                    ))
                } </Stack>
        </Card>

    );

}
