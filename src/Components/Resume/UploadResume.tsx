import { useState } from 'react';
import {
  Card,
  Title,
  Text,
  Group,
  Button,
  Stack,
  Notification,
  rem,
} from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import {
  IconUpload,
  IconCheck,
  IconX,
  IconFile,
  IconFilePlus,
} from '@tabler/icons-react';

export default function UploadResumePage() {
  const [file, setFile] = useState<File | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleUpload = () => {
    if (!file) {
      setError(true);
      setSuccess(false);
      return;
    }

    setTimeout(() => {
      console.log('Uploaded:', file.name);
      setSuccess(true);
      setError(false);
    }, 1000);
  };

  return (
    <Card withBorder shadow="md" radius="md" p="lg" maw={600} mx="auto">
      <Stack gap="md">
        <Title order={3}>Upload Your Resume</Title>
        <Text size="sm" c="dimmed">
          Drag and drop your resume here, or click to select a file. Accepted formats: PDF, DOCX (max 5MB).
        </Text>

        <Dropzone
          onDrop={(files) => {
            setFile(files[0]);
            setError(false);
            setSuccess(false);
          }}
          onReject={() => {
            setFile(null);
            setError(true);
            setSuccess(false);
          }}
          maxSize={5 * 1024 ** 2}
          accept={[MIME_TYPES.pdf, MIME_TYPES.doc, MIME_TYPES.docx]}
          radius="md"
          p="xl"
          styles={{
            root: {
              borderColor: '#805AD5',
              borderStyle: 'dashed',
              backgroundColor: '#f8f9fa',
              transition: 'background-color 0.2s ease',
            },
          }}
        >
          <Dropzone.Accept>
            <Group justify="center" align="center" style={{ minHeight: 120, pointerEvents: 'none' }}>
              <IconCheck size={40} color="green" />
              <Text size="sm" ta="center" mt="sm" c="green">
                Drop your file to upload
              </Text>
            </Group>
          </Dropzone.Accept>

          <Dropzone.Reject>
            <Group justify="center" align="center" style={{ minHeight: 120, pointerEvents: 'none' }}>
              <IconX size={40} color="red" />
              <Text size="sm" ta="center" mt="sm" c="red">
                File type not supported or too large
              </Text>
            </Group>
          </Dropzone.Reject>

          <Dropzone.Idle>
            <Group justify="center" align="center" style={{ minHeight: 120, pointerEvents: 'none' }}>
              <IconFilePlus size={40} color="#805AD5" />
              <Text size="sm" ta="center" mt="sm" c="gray.7">
                Drag & drop or click to select your resume
              </Text>
            </Group>
          </Dropzone.Idle>
        </Dropzone>

        {file && (
          <Group justify="space-between" mt="xs">
            <Group gap="xs">
              <IconFile size={20} />
              <Text size="sm">{file.name}</Text>
            </Group>
            <Text size="xs" c="dimmed">
              {(file.size / 1024).toFixed(1)} KB
            </Text>
          </Group>
        )}

        {success && (
          <Notification
            color="green"
            icon={<IconCheck size={18} />}
            onClose={() => setSuccess(false)}
          >
            Resume uploaded successfully!
          </Notification>
        )}

        {error && (
          <Notification
            color="red"
            icon={<IconX size={18} />}
            onClose={() => setError(false)}
          >
            Please select a valid file (PDF or DOCX, max 5MB)
          </Notification>
        )}

        <Group justify="flex-end">
          <Button onClick={handleUpload} disabled={!file} color="indigo">
            Upload Resume
          </Button>
        </Group>
      </Stack>
    </Card>
  );
}
