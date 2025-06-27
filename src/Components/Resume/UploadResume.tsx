import { useState } from 'react';
import {
  Card,
  Title,
  Text,
  Group,
  Button,
  Stack,
  Notification,
  Rating,
  useMantineTheme,
  useComputedColorScheme,
  Loader,
  Paper,
  Code,
} from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import {
  IconCheck,
  IconX,
  IconFile,
  IconFilePlus,
} from '@tabler/icons-react';

interface Skill {
  technologies_known: string;
  years_of_experience: number;
  strength_of_skill: number;
}

interface Certification {
  certification_name: string;
  issued_date: string;
  valid_till: string | null;
}

interface Professional {
  last_worked_organization: string | null;
  recent_role: string | null;
  recent_project: string | null;
  recent_start_date: string | null;
  recent_project_release_date: string | null;
}

export default function UploadResumePage() {
  const [file, setFile] = useState<File | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | false>(false);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [loading, setLoading] = useState(false);
  const [rawJson, setRawJson] = useState<any>(null);

  const theme = useMantineTheme();
  const computedColorScheme = useComputedColorScheme();

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a resume file.');
      setSuccess(false);
      return;
    }
    setLoading(true);
    setError(false);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append('resume', file);

      const response = await fetch('/api/upload-resume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const err = await response.json();
        setError(err?.error || 'Failed to process resume.');
        setLoading(false);
        return;
      }

      const data = await response.json();
      if (!data?.data?.skills) {
        setError('No skills found in resume.');
        setLoading(false);
        return;
      }

      setSkills(data.data.skills || []);
      setCertifications(data.data.certifications || []);
      setProfessional(data.data.professional || null);
      setRawJson(data.data); // Save the raw JSON for display
      setSuccess(true);
      setError(false);
    } catch (e: any) {
      setError('Error uploading resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card withBorder shadow="md" radius="md" p="lg" maw={800} mx="auto">
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
            setSkills([]);
            setCertifications([]);
            setProfessional(null);
            setRawJson(null);
          }}
          onReject={() => {
            setFile(null);
            setError('File type not supported or too large');
            setSuccess(false);
            setSkills([]);
            setCertifications([]);
            setProfessional(null);
            setRawJson(null);
          }}
          maxSize={5 * 1024 ** 2}
          accept={[MIME_TYPES.pdf, MIME_TYPES.doc, MIME_TYPES.docx]}
          radius="xl"
          p="xl"
          styles={{
            root: {
              borderColor: theme.colors.indigo[5],
              borderStyle: "groove",
              backgroundColor:
                computedColorScheme === 'dark'
                  ? theme.colors.dark[6]
                  : theme.colors.gray[0],
              transition: 'background-color 0.2s ease',
            },
          }}
        >

          <Dropzone.Accept>
            <Group justify="center" align="center" style={{ minHeight: 200, pointerEvents: 'none' }}>
              <IconCheck size={40} color="green" />
              <Text size="sm" ta="center" mt="sm" c="green">
                Drop your file to upload
              </Text>
            </Group>
          </Dropzone.Accept>

          <Dropzone.Reject>
            <Group justify="center" align="center" style={{ minHeight: 200, pointerEvents: 'none' }}>
              <IconX size={40} color="red" />
              <Text size="sm" ta="center" mt="sm" c="red">
                File type not supported or too large
              </Text>
            </Group>
          </Dropzone.Reject>

          <Dropzone.Idle>
            <Group justify="center" align="center" style={{ minHeight: 200, pointerEvents: 'none' }}>
              <IconFilePlus size={40} color={theme.colors.indigo[5]} />
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

        {loading && <Loader color="indigo" />}

        {success && !loading && (
          <Notification
            color="green"
            icon={<IconCheck size={18} />}
            onClose={() => setSuccess(false)}
          >
            Resume uploaded and processed successfully!
          </Notification>
        )}

        {error && (
          <Notification
            color="red"
            icon={<IconX size={18} />}
            onClose={() => setError(false)}
          >
            {error}
          </Notification>
        )}

        <Group justify="flex-end">
          <Button onClick={handleUpload} disabled={!file || loading} color="indigo">
            Upload Resume
          </Button>
        </Group>

        {/* RAW JSON OUTPUT */}
        {rawJson && (
          <Paper shadow="xs" p="sm" withBorder mt="md">
            <Title order={5} mb={5}>Extracted JSON</Title>
            <Code block style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontSize: 13, background: "inherit" }}>
              {JSON.stringify(rawJson, null, 2)}
            </Code>
          </Paper>
        )}

        {/* You can also keep your pretty display below if desired */}
        {/* ... */}
      </Stack>
    </Card>
  );
}