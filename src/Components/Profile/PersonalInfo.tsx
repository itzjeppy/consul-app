import {

    Card,

    Group,

    Text,

    Avatar,

    Stack,

    Divider

} from '@mantine/core';

interface PersonalInfoProps {

    name: string;

    empId: string;

    mobile: string;

    email: string;

    address: string;

    currentRole: string;

}

export default function PersonalInfo({

    name,

    empId,

    mobile,

    email,

    address,

    currentRole

} : PersonalInfoProps) {

    return (
        <Card withBorder shadow="sm" radius="md" p="md">
            <Group align="flex-start" gap="md" wrap="nowrap">

                {/* Avatar */}
                <Avatar size={72}

                    radius="xl"

                    src="https://api.dicebear.com/7.x/initials/svg?seed=SJ"

                    alt="Profile"/> {/* Info Stack */}
                <Stack gap={4}
                    style={
                        {flex: 1}
                }>
                    <Text fw={700}
                        size="lg">

                        {name} </Text>
                    <Text size="sm" c="gray.6">

                        {currentRole} </Text>
                    <Divider my="xs"/>
                    <Group gap="xs" wrap="wrap">
                        <Text size="sm" c="gray.7">
                            <strong>Emp ID   </strong>
                            {empId} </Text>
                        <Text size="sm" c="gray.7">
                            <strong>Mobile   </strong>
                            {mobile} </Text>
                        <Text size="sm" c="gray.7">
                            <strong>Email   </strong>
                            {email} </Text>
                        <Text size="sm" c="gray.7">
                            <strong>Address   </strong>
                            {address} </Text>
                    </Group>
                </Stack>
            </Group>
        </Card>

    );

}
